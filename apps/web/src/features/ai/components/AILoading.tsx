import React from "react";

export const AILoading: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl animate-pulse">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>
      <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
        AI Assistant is thinking...
      </span>
    </div>
  );
};
