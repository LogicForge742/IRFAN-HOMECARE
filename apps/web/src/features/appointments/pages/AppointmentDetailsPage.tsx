import React from "react";
import { useParams, Link } from "react-router-dom";
import { AppointmentStatusBadge } from "../components/AppointmentStatusBadge";
import { Calendar, User, ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export const AppointmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock appointment detail
  const appointment = {
    id: id || "apt-101",
    patientName: "John Doe",
    professionalName: "Dr. Sarah Kimani",
    serviceType: "General Nursing Checkup",
    scheduledAt: "2026-08-02 10:00 AM",
    durationMinutes: 60,
    amount: 3500,
    status: "SCHEDULED" as const,
    paymentStatus: "PAID",
    notes: "Routine checkup and blood pressure monitoring",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        to="/appointments"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Appointments</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Appointment #{appointment.id}
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">
              {appointment.serviceType}
            </h1>
          </div>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase">
              Healthcare Provider
            </span>
            <p className="font-bold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>{appointment.professionalName}</span>
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase">
              Scheduled Time
            </span>
            <p className="font-bold text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{appointment.scheduledAt}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Consultation Instructions & Notes</span>
          </h3>
          <p className="text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed">
            {appointment.notes}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Payment Status</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>M-PESA CONFIRMED ({appointment.amount.toLocaleString()} KES)</span>
            </p>
          </div>

          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition">
            Download Receipt PDF
          </button>
        </div>
      </div>
    </div>
  );
};
