import React, { useState } from "react";
import { Users, TrendingUp, Video, CreditCard } from "lucide-react";
import {
  useDashboardSummary,
  useRevenueAnalytics,
  usePaymentAnalytics,
  useAppointmentAnalytics,
  useProfessionalAnalytics,
  usePatientAnalytics,
  useSystemHealth,
} from "../hooks/useAnalytics";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import PatientGrowthChart from "../components/PatientGrowthChart";
import AppointmentChart from "../components/AppointmentChart";
import PaymentChart from "../components/PaymentChart";
import TopProfessionals from "../components/TopProfessionals";
import RecentPayments from "../components/RecentPayments";
import SystemHealthCard from "../components/SystemHealthCard";
import AnalyticsFilters from "../components/AnalyticsFilters";
import { CHART_FORMATTERS } from "@/utils/charts/chart-formatters";

export const AnalyticsDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("180d");

  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: revenue, isLoading: revenueLoading } = useRevenueAnalytics();
  const { data: payments, isLoading: paymentsLoading } = usePaymentAnalytics();
  const { data: appointments, isLoading: appointmentsLoading } = useAppointmentAnalytics();
  const { data: professionals, isLoading: professionalsLoading } = useProfessionalAnalytics();
  const { data: patients, isLoading: patientsLoading } = usePatientAnalytics();
  const { data: system, isLoading: systemLoading } = useSystemHealth();

  const handleExport = (format: "csv" | "pdf") => {
    alert(`Exporting dashboard metrics as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Real-time statistics, revenue, scheduling metrics, and server monitoring.</p>
        </div>
      </div>

      <AnalyticsFilters dateRange={dateRange} onDateRangeChange={setDateRange} onExport={handleExport} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={summary?.totals.total_users || 0}
          change={summary?.growth.users || 0}
          icon={<Users className="w-5 h-5" />}
          loading={summaryLoading}
        />
        <MetricCard
          title="Total Revenue"
          value={CHART_FORMATTERS.currency(summary?.totals.total_revenue || 0)}
          change={summary?.growth.revenue || 0}
          icon={<TrendingUp className="w-5 h-5" />}
          loading={summaryLoading}
        />
        <MetricCard
          title="Consultations"
          value={summary?.totals.total_appointments || 0}
          change={summary?.growth.appointments || 0}
          icon={<Video className="w-5 h-5" />}
          loading={summaryLoading}
        />
        <MetricCard
          title="Completed Transactions"
          value={summary?.totals.total_payments || 0}
          change={summary?.growth.payments || 0}
          icon={<CreditCard className="w-5 h-5" />}
          loading={summaryLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenue || []} loading={revenueLoading} />
        <PatientGrowthChart data={patients || []} loading={patientsLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentChart data={appointments?.trends || []} loading={appointmentsLoading} />
        <PaymentChart data={payments?.distribution || {}} loading={paymentsLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProfessionals data={professionals || []} loading={professionalsLoading} />
        <RecentPayments data={payments?.recent || []} loading={paymentsLoading} />
      </div>

      <SystemHealthCard data={system} loading={systemLoading} />
    </div>
  );
};
export default AnalyticsDashboardPage;
