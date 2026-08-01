
import type { Appointment } from "@/types/appointment";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import { Calendar, Clock, User } from "lucide-react";

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: Props) {
  return (
    <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900 shadow-lg space-y-3 hover:border-slate-700 transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>
              {appointment.professional?.name ?? "Healthcare Professional"}
            </span>
          </h3>
          {appointment.reason && (
            <p className="text-xs text-slate-400 mt-1">{appointment.reason}</p>
          )}
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="flex items-center space-x-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{appointment.appointment_date}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {appointment.start_time} - {appointment.end_time}
          </span>
        </div>
      </div>
    </div>
  );
}
