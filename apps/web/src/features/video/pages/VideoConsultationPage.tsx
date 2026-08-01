import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVideoRoom } from "../hooks/useVideoRoom";
import { useWebRTC } from "../hooks/useWebRTC";
import VideoPlayer from "../components/VideoPlayer";
import Controls from "../components/Controls";
import Participants from "../components/Participants";
import { Video, Home, ArrowLeft } from "lucide-react";

export default function VideoConsultationPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [callFinished, setCallFinished] = useState(false);

  const { room, isLoading, joinRoom, endRoom } = useVideoRoom(roomId || "");
  const {
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    connectionState,
    endCall,
  } = useWebRTC(roomId || "");

  // Join the backend session when the room loads
  useEffect(() => {
    if (roomId) {
      joinRoom();
    }
  }, [roomId, joinRoom]);

  const handleLeaveCall = async () => {
    endCall();
    if (roomId) {
      try {
        await endRoom();
      } catch (err) {
        console.error("Failed to end room session on backend:", err);
      }
    }
    setCallFinished(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-lg font-bold">Connecting to Video Consultation...</h2>
          <p className="text-sm text-slate-400">Please wait while we establish a secure connection</p>
        </div>
      </div>
    );
  }

  if (callFinished || room?.status === "completed") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto">
            <Video className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Consultation Ended</h1>
            <p className="text-sm text-slate-400">
              The video session has been completed successfully. Your medical practitioner will upload any prescriptions or notes shortly.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-slate-900/50 border-b border-slate-900 px-6 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Live Video Consultation</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">Room: {roomId}</p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        {/* Videos Area */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <VideoPlayer stream={localStream} isLocal={true} />
            <VideoPlayer stream={remoteStream} isLocal={false} />
          </div>
          <div className="flex justify-center pt-2">
            <Controls
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              onToggleMute={toggleMute}
              onToggleVideo={toggleVideo}
              onEndCall={handleLeaveCall}
            />
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-6">
          <Participants
            connectionState={connectionState}
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            hasRemoteStream={!!remoteStream}
          />
        </div>
      </main>
    </div>
  );
}
