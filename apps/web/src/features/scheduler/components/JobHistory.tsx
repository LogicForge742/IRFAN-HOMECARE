import React from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { TaskExecutionHistory } from "@/types/scheduler";

interface JobHistoryProps {
  history: TaskExecutionHistory[];
}

export const JobHistory: React.FC<JobHistoryProps> = ({ history }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white flex items-center space-x-2">
        <Clock className="w-5 h-5 text-emerald-400" />
        <span>Recent Task Execution Logs</span>
      </h3>

      <div className="divide-y divide-slate-800/60">
        {history.map((log) => (
          <div key={log.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {log.status === "SUCCESS" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              )}
              <div>
                <p className="text-xs font-semibold text-white font-mono">{log.job_id}</p>
                <p className="text-[10px] text-slate-400 truncate max-w-sm">{log.task}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400">
                {new Date(log.executed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <p className="text-[10px] font-semibold text-emerald-400">{log.duration_ms} ms</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
