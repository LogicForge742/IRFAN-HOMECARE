import React from "react";
import { Loader2, Activity } from "lucide-react";

export const RunningTasks: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <span>Active Celery Worker Pipeline</span>
        </h3>
        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase">
          Workers Idle
        </span>
      </div>

      <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl space-y-2">
        <Loader2 className="w-6 h-6 text-slate-500 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Listening to Celery background task queue...</p>
      </div>
    </div>
  );
};
