import { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "@/realtime/socket";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

export function useWebRTC(roomId: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [connectionState, setConnectionState] = useState<string>("new");

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const activePeerSidRef = useRef<string | null>(null);

  // Toggle audio
  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, []);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  }, []);

  // Clean up WebRTC session
  const cleanup = useCallback(() => {
    console.log("Cleaning up WebRTC session...");
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current = null;
      setRemoteStream(null);
    }

    activePeerSidRef.current = null;
    setConnectionState("closed");
  }, []);

  // Create Peer Connection
  const createPeerConnection = useCallback((targetSid: string) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnectionRef.current = pc;
    activePeerSidRef.current = targetSid;

    pc.oniceconnectionstatechange = () => {
      setConnectionState(pc.iceConnectionState);
    };

    pc.onconnectionstatechange = () => {
      setConnectionState(pc.connectionState);
    };

    // Add local tracks to peer connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    // Ice candidate callback
    pc.onicecandidate = (event) => {
      if (event.candidate && socket?.connected) {
        socket.emit("ice_candidate", {
          room_id: roomId,
          candidate: event.candidate,
          target_sid: targetSid,
        });
      }
    };

    // Remote stream track added
    pc.ontrack = (event) => {
      console.log("Remote track received:", event.streams[0]);
      if (event.streams && event.streams[0]) {
        remoteStreamRef.current = event.streams[0];
        setRemoteStream(event.streams[0]);
      } else {
        // Create fallback MediaStream if not provided
        if (!remoteStreamRef.current) {
          const newStream = new MediaStream();
          remoteStreamRef.current = newStream;
          setRemoteStream(newStream);
        }
        remoteStreamRef.current.addTrack(event.track);
      }
    };

    return pc;
  }, [roomId]);

  // Initialize WebRTC and Signaling
  useEffect(() => {
    const socketInstance = socket;
    if (!socketInstance) {
      console.warn("Socket not initialized for WebRTC");
      return;
    }

    const initMediaAndSignaling = async () => {
      try {
        console.log("Requesting user media...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        setLocalStream(stream);

        // Notify signaling room that we have joined
        socketInstance.emit("join_room", { room_id: roomId });
      } catch (err) {
        console.error("Error accessing user media:", err);
      }
    };

    // Listeners
    socketInstance.on("peer_joined", async ({ sid }: { sid: string }) => {
      console.log("Peer joined, sid:", sid);
      const pc = createPeerConnection(sid);

      // Create offer as caller
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socketInstance.emit("offer", {
          room_id: roomId,
          sdp: offer,
          target_sid: sid,
        });
      } catch (err) {
        console.error("Error creating WebRTC offer:", err);
      }
    });

    socketInstance.on("offer", async ({ sdp, sender_sid }: { sdp: RTCSessionDescriptionInit; sender_sid: string }) => {
      console.log("Offer received from:", sender_sid);
      const pc = createPeerConnection(sender_sid);

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socketInstance.emit("answer", {
          room_id: roomId,
          sdp: answer,
          target_sid: sender_sid,
        });
      } catch (err) {
        console.error("Error creating WebRTC answer:", err);
      }
    });

    socketInstance.on("answer", async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      console.log("Answer received");
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        } catch (err) {
          console.error("Error setting remote description:", err);
        }
      }
    });

    socketInstance.on("ice_candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding remote ICE candidate:", err);
        }
      }
    });

    socketInstance.on("peer_left", () => {
      console.log("Peer left call");
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      setRemoteStream(null);
      remoteStreamRef.current = null;
      activePeerSidRef.current = null;
    });

    socketInstance.on("call_ended", () => {
      cleanup();
    });

    initMediaAndSignaling();

    return () => {
      socketInstance.off("peer_joined");
      socketInstance.off("offer");
      socketInstance.off("answer");
      socketInstance.off("ice_candidate");
      socketInstance.off("peer_left");
      socketInstance.off("call_ended");
      
      socketInstance.emit("leave_room", { room_id: roomId });
      cleanup();
    };
  }, [roomId, createPeerConnection, cleanup]);

  // Manual call termination
  const endCall = useCallback(() => {
    if (socket && socket.connected) {
      socket.emit("end_call", { room_id: roomId });
    }
    cleanup();
  }, [roomId, cleanup]);

  return {
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    connectionState,
    endCall,
  };
}
