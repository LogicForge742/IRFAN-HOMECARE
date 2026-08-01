import React from "react";
import type { AuditLog } from "../api/audit-api";

interface AuditTableProps {
  logs: AuditLog[];
  loading: boolean;
  onSelectLog: (log: AuditLog) => void;
}

export const AuditTable: React.FC<AuditTableProps> = ({ logs, loading, onSelectLog }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-500">
        No audit logs found matching criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-900/40 border border-slate-800 rounded-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-900/60">
            <th className="p-4">Timestamp</th>
            <th className="p-4">Action</th>
            <th className="p-4">Resource</th>
            <th className="p-4">Resource ID</th>
            <th className="p-4">IP Address</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
              <td className="p-4 whitespace-nowrap text-slate-400">
                {new Date(log.created_at).toLocaleString()}
              </td>
              <td className="p-4 whitespace-nowrap">
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  {log.action}
                </span>
              </td>
              <td className="p-4 whitespace-nowrap font-medium text-slate-200">
                {log.resource}
              </td>
              <td className="p-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                {log.resource_id || "-"}
              </td>
              <td className="p-4 whitespace-nowrap text-slate-400 font-mono">
                {log.ip_address || "-"}
              </td>
              <td className="p-4 whitespace-nowrap text-right">
                <button
                  onClick={() => onSelectLog(log)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
