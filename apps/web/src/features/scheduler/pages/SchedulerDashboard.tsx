import React from "react";
import { Clock, RefreshCw, Cpu } from "lucide-react";
import { useSchedulerJobs, useSchedulerHistory, useSchedulerHealth } from "../hooks/useScheduler";
import { SystemHealth } from "../components/SystemHealth";
import { JobCard } from "../components/JobCard";
import { JobHistory } from "../components/JobHistory";
import { RunningTasks } from "../components/RunningTasks";

export const SchedulerDashboard: React.FC = () => {
  const { data: jobs, isLoading: isJobsLoading, refetch: refetchJobs } = useSchedulerJobs();
  const { data: history } = useSchedulerHistory();
  const { data: health } = useSchedulerHealth();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Scheduler & Celery Automation</h1>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">
            Real-time monitor and manager for background jobs, periodic crons, SMS/Email automation, database cleanups, and Celery task queues.
          </p>
        </div>

        <button
          onClick={() => refetchJobs()}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* System Health Telemetry */}
      <SystemHealth health={health} />

      {/* Cron Job Registry Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>Scheduled Cron Jobs ({jobs?.length || 0})</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Celery Beat Configured</span>
        </div>

        {isJobsLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading job registry...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Live Pipeline & Execution History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RunningTasks />
        <JobHistory history={history || []} />
      </div>
    </div>
  );
};

export default SchedulerDashboard;
