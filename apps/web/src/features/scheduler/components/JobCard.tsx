import React from "react";
import { Clock, Play, Layers, Calendar } from "lucide-react";
import type { SchedulerJob } from "@/types/scheduler";
import { useTriggerSchedulerJob } from "../hooks/useScheduler";
import { toast } from "sonner";

interface JobCardProps {
  job: SchedulerJob;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const triggerMutation = useTriggerSchedulerJob();

  const handleRunNow = async () => {
    try {
      await triggerMutation.mutateAsync(job.id);
      toast.success(`Job '${job.name}' triggered successfully!`);
    } catch {
      toast.error(`Failed to trigger job '${job.name}'.`);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {job.category}
          </span>
          <div className="flex items-center space-x-1 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{job.cron}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white tracking-tight">{job.name}</h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{job.description}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Queue: <strong className="text-slate-200 font-mono">{job.queue}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next: <strong className="text-slate-200">{job.next_run ? new Date(job.next_run).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</strong></span>
          </div>
        </div>

        <button
          onClick={handleRunNow}
          disabled={triggerMutation.isPending}
          className="w-full flex items-center justify-center space-x-2 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-emerald-400" />
          <span>{triggerMutation.isPending ? "Queuing..." : "Run Job Now"}</span>
        </button>
      </div>
    </div>
  );
};
