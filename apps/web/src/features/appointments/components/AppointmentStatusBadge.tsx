import React from "react";
import type { AppointmentStatus } from "@/types/appointment";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

interface BadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge: React.FC<BadgeProps> = ({ status }) => {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed</span>
        </span>
      );
    case "SCHEDULED":
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>Scheduled</span>
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3.5 h-3.5" />
          <span>Cancelled</span>
        </span>
      );
    case "PENDING":
    default:
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Pending</span>
        </span>
      );
  }
};
