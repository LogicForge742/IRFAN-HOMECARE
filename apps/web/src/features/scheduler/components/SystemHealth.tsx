import React from "react";
import { Cpu, Server, ShieldCheck, Zap } from "lucide-react";
import type { SystemHealthMetrics } from "@/types/scheduler";

interface SystemHealthProps {
  health?: SystemHealthMetrics;
}

export const SystemHealth: React.FC<SystemHealthProps> = ({ health }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Scheduler Status</p>
          <h4 className="text-lg font-extrabold text-emerald-400 tracking-tight">
            {health?.status || "HEALTHY"}
          </h4>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Celery Workers</p>
          <h4 className="text-lg font-extrabold text-white tracking-tight">
            {health?.worker_count || 4} Active
          </h4>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
          <Server className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Redis Broker</p>
          <h4 className="text-lg font-extrabold text-white tracking-tight">
            {health?.broker_connected ? "Connected" : "Disconnected"}
          </h4>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Active Queues</p>
          <h4 className="text-lg font-extrabold text-white tracking-tight">
            {health?.active_queues?.length || 6} Queues
          </h4>
        </div>
      </div>
    </div>
  );
};
