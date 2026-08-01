import React from "react";
import { Server, Zap, Activity, ShieldAlert, Cpu } from "lucide-react";
import type { SystemHealth } from "../types/analytics";

interface SystemHealthCardProps {
  data?: SystemHealth;
  loading?: boolean;
}

export const SystemHealthCard: React.FC<SystemHealthCardProps> = ({ data, loading = false }) => {
  if (loading || !data) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl animate-pulse h-60" />
    );
  }

  const services = data.services;
  const metrics = data.metrics;

  const getStatusColor = (status: string) => {
    return status === "healthy"
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">System Health & Observability</h3>
          <p className="text-xs text-slate-400">Live service statuses and API statistics</p>
        </div>
        <Server className="w-6 h-6 text-slate-500" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(services).map(([service, status]) => (
          <div
            key={service}
            className={`border rounded-xl px-4 py-3 flex flex-col items-center justify-center space-y-1.5 transition-all text-center ${getStatusColor(
              status
            )}`}
          >
            <span className="text-xs font-semibold capitalize tracking-wide">{service}</span>
            <span className="text-sm font-bold uppercase">{status}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Requests</span>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-lg font-bold text-white">{metrics.requests_total}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Failed Requests</span>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span className="text-lg font-bold text-white">{metrics.requests_failed}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Avg Latency</span>
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-lg font-bold text-white">{metrics.avg_response_time_ms} ms</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Celery Failures</span>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-lg font-bold text-white">{metrics.celery_task_failures}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SystemHealthCard;
