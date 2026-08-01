import { useMetrics } from "../hooks/useAdmin";
import {
  BarChart3,
  Users,
  Stethoscope,
  HeartPulse,
  CalendarCheck,
  CheckCircle2,
  Banknote,
  Activity,
} from "lucide-react";

export default function AdminMetricsPage() {
  const { data, isLoading } = useMetrics();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading platform metrics...
      </div>
    );

  const cards = [
    {
      label: "Total Users",
      value: data?.total_users?.toLocaleString() || "0",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Professionals",
      value: data?.total_professionals?.toLocaleString() || "0",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Patients",
      value: data?.total_patients?.toLocaleString() || "0",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      label: "Total Appointments",
      value: data?.total_appointments?.toLocaleString() || "0",
      icon: <CalendarCheck className="w-6 h-6" />,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Completed Visits",
      value: data?.completed_appointments?.toLocaleString() || "0",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
    {
      label: "Total Revenue (KES)",
      value: `KES ${(data?.total_revenue || 0).toLocaleString()}`,
      icon: <Banknote className="w-6 h-6" />,
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
    },
    {
      label: "Active Today",
      value: data?.active_today?.toLocaleString() || "0",
      icon: <Activity className="w-6 h-6" />,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <BarChart3 className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Platform Metrics
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Real-time operational analytics and key performance indicators for Irfan HomeCare
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`border rounded-2xl p-5 bg-slate-900 shadow-xl space-y-3 ${card.bg}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={card.color}>{card.icon}</div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Completion Rate */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Appointment Completion Rate
        </h3>
        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-4 rounded-full transition-all duration-700"
            style={{
              width: `${
                data?.total_appointments
                  ? Math.round(
                      ((data.completed_appointments || 0) / data.total_appointments) * 100
                    )
                  : 0
              }%`,
            }}
          />
        </div>
        <p className="text-sm text-slate-300 font-medium">
          {data?.total_appointments
            ? Math.round(
                ((data.completed_appointments || 0) / data.total_appointments) * 100
              )
            : 0}
          % of all appointments completed successfully
        </p>
      </div>
    </div>
  );
}
