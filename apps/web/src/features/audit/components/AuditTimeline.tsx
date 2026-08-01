import React from "react";
import type { AuditLog } from "../api/audit-api";

interface AuditTimelineProps {
  logs: AuditLog[];
  loading: boolean;
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ logs, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500 bg-slate-900/40 border border-slate-800 rounded-xl">
        No recent activity detected.
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l border-slate-800 space-y-6">
      {logs.map((log) => (
        <div key={log.id} className="relative group">
          <div className="absolute -left-[31px] top-1 bg-slate-950 border border-slate-700 w-4.5 h-4.5 rounded-full flex items-center justify-center group-hover:border-emerald-500 transition-colors">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl hover:border-slate-700/80 transition-all">
            <span className="text-xs text-slate-500">
              {new Date(log.created_at).toLocaleString()}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-slate-200">
                {log.action}
              </span>
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {log.resource}
              </span>
            </div>
            {log.details && (
              <pre className="mt-2 p-2 bg-slate-950/60 rounded text-xs text-slate-400 overflow-x-auto font-mono">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
