import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream: MediaStream | null;
  isLocal: boolean;
  muted?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, isLocal, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center min-h-[260px]">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal || muted}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto animate-pulse">
            <span className="text-xs font-bold text-slate-400">
              {isLocal ? "Local" : "Remote"}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isLocal ? "Accessing camera..." : "Waiting for participant to join..."}
          </p>
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-white">
        {isLocal ? "You (Local)" : "Remote Participant"}
      </div>
    </div>
  );
};

export default VideoPlayer;
