import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import {
  dashboardApi,
  type DashboardStats,
  type AppointmentSummary,
} from "../api/dashboard-api";
import { StatsCard } from "../components/StatsCard";
import { RecentAppointments } from "../components/RecentAppointments";
import { Calendar, CheckCircle2, Clock, CreditCard, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, appointmentsData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentAppointments(),
        ]);
        setStats(statsData);
        setAppointments(appointmentsData);
      } catch {
        // Handled via fallback
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header section with quick action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400">
            Role:{" "}
            <span className="font-semibold text-emerald-400 capitalize">
              {user?.role?.toLowerCase().replace("_", " ")}
            </span>{" "}
            • Portal Status Active
          </p>
        </div>

        {user?.role === "PATIENT" && (
          <Link
            to="/appointments/book"
            className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Visit</span>
          </Link>
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Appointments"
          value={loading ? "..." : (stats?.totalAppointments ?? 0)}
          description="Lifetime bookings"
          icon={Calendar}
          variant="blue"
        />
        <StatsCard
          title="Completed Visits"
          value={loading ? "..." : (stats?.completedVisits ?? 0)}
          description="Successful consultations"
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatsCard
          title="Upcoming Visits"
          value={loading ? "..." : (stats?.upcomingVisits ?? 0)}
          description="Scheduled checkups"
          icon={Clock}
          variant="amber"
        />
        <StatsCard
          title="Pending Payments"
          value={loading ? "..." : (stats?.pendingPayments ?? 0)}
          description="Awaiting M-Pesa push"
          icon={CreditCard}
          variant="rose"
        />
      </div>

      {/* Appointments List Component */}
      <RecentAppointments appointments={appointments} />
    </div>
  );
};
