import React from "react";
import type { Appointment } from "@/types/appointment";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { Calendar, Clock, CreditCard, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-lg">
            {appointment.serviceType}
          </h4>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <User className="w-4 h-4 text-emerald-400" />
            <span>{appointment.professionalName}</span>
          </div>
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800/80">
        <div className="flex items-center space-x-2 text-slate-300">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{appointment.scheduledAt}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{appointment.durationMinutes} Mins</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 text-sm font-semibold text-emerald-400">
          <CreditCard className="w-4 h-4" />
          <span>{appointment.amount.toLocaleString()} KES</span>
        </div>
        <Link
          to={`/appointments/${appointment.id}`}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-300 hover:text-white transition"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
