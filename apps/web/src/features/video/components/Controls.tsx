import React from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface ControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isMuted,
  isVideoOff,
  onToggleMute,
  onToggleVideo,
  onEndCall,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
      <button
        onClick={onToggleMute}
        className={`p-3.5 rounded-xl border transition flex items-center justify-center ${
          isMuted
            ? "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30"
            : "bg-slate-800 text-slate-350 border-slate-700 hover:bg-slate-700 hover:text-white"
        }`}
        title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <button
        onClick={onToggleVideo}
        className={`p-3.5 rounded-xl border transition flex items-center justify-center ${
          isVideoOff
            ? "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30"
            : "bg-slate-800 text-slate-350 border-slate-700 hover:bg-slate-700 hover:text-white"
        }`}
        title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
      >
        {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
      </button>

      <div className="w-px h-8 bg-slate-800" />

      <button
        onClick={onEndCall}
        className="p-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition flex items-center justify-center shadow-lg shadow-rose-950/40"
        title="End Call"
      >
        <PhoneOff className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Controls;
