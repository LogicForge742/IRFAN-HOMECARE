import React from "react";
import { User, Activity, MicOff, VideoOff } from "lucide-react";

interface ParticipantsProps {
  connectionState: string;
  isMuted: boolean;
  isVideoOff: boolean;
  hasRemoteStream: boolean;
}

export const Participants: React.FC<ParticipantsProps> = ({
  connectionState,
  isMuted,
  isVideoOff,
  hasRemoteStream,
}) => {
  return (
    <div className="bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Activity className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session Status</h3>
      </div>

      <div className="space-y-3">
        {/* Local Participant */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-850 flex items-center justify-center border border-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">You</span>
              <span className="text-[10px] text-emerald-400 font-medium">Connected</span>
            </div>
          </div>
          <div className="flex space-x-1.5">
            {isMuted && <MicOff className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
            {isVideoOff && <VideoOff className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
          </div>
        </div>

        {/* Remote Participant */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-850 flex items-center justify-center border border-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Other Participant</span>
              <span
                className={`text-[10px] font-medium block ${
                  hasRemoteStream
                    ? connectionState === "connected"
                      ? "text-emerald-400"
                      : "text-amber-400"
                    : "text-slate-500"
                }`}
              >
                {hasRemoteStream ? (connectionState === "connected" ? "Connected" : connectionState) : "Not Joined"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
