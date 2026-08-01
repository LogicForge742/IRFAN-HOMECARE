import { useSchedule } from "../hooks/useSchedule";
import { CalendarClock, User, Clock, CheckCircle2, Play, Timer } from "lucide-react";
import { Link } from "react-router-dom";

export default function SchedulePage() {
  const { data, isLoading } = useSchedule();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading schedule...
      </div>
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold uppercase border border-blue-500/20">
            <Play className="w-3 h-3" />
            <span>In Progress</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold uppercase border border-amber-500/20">
            <Timer className="w-3 h-3" />
            <span>Upcoming</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <CalendarClock className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Today&apos;s Schedule
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Overview of all scheduled home care visits for the current day
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Time</span>
          <span>Patient</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {data?.map((entry) => (
          <div
            key={entry.id}
            className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition items-center"
          >
            <div className="flex items-center space-x-2 text-sm text-white font-medium">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>
                {entry.start_time} – {entry.end_time}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <User className="w-4 h-4 text-slate-500" />
              <span>{entry.patient_name}</span>
            </div>

            {getStatusBadge(entry.status)}

            {entry.status === "upcoming" || entry.status === "in_progress" ? (
              <Link
                to={`/consultation?appointment=${entry.id}`}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                Start Visit →
              </Link>
            ) : (
              <span className="text-xs text-slate-500">Done</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
