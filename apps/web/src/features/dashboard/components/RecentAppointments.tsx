import React from "react";
import type { AppointmentSummary } from "../api/dashboard-api";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

interface RecentAppointmentsProps {
  appointments: AppointmentSummary[];
}

export const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments,
}) => {
  const getStatusBadge = (status: AppointmentSummary["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case "SCHEDULED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled</span>
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>Recent Appointments</span>
        </h3>
        <button className="text-xs font-semibold text-emerald-400 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Professional</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Fee (KES)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3.5 font-medium text-white">
                  {apt.professionalName}
                </td>
                <td className="px-4 py-3.5 text-slate-300">{apt.serviceType}</td>
                <td className="px-4 py-3.5 text-slate-400">{apt.scheduledAt}</td>
                <td className="px-4 py-3.5">{getStatusBadge(apt.status)}</td>
                <td className="px-4 py-3.5 text-right font-semibold text-emerald-400">
                  {apt.amount.toLocaleString()} KES
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
