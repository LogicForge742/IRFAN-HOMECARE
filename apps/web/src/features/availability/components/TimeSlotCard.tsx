import type { AvailabilitySlot } from "@/types/availability";
import BlockTimeModal from "./BlockTimeModal";
import { Clock, Calendar } from "lucide-react";

export default function TimeSlotCard({ slot }: { slot: AvailabilitySlot }) {
  const getBadgeStyle = () => {
    switch (slot.status) {
      case "available":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "booked":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "blocked":
      default:
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    }
  };

  return (
    <div className="border border-slate-800 rounded-2xl p-4 bg-slate-900 shadow-xl space-y-3 flex items-center justify-between">
      <div className="space-y-1">
        <p className="font-bold text-white text-base flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>
            {slot.start_time} - {slot.end_time}
          </span>
        </p>
        <p className="text-xs text-slate-400 flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Date: {slot.date}</span>
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getBadgeStyle()}`}
        >
          {slot.status}
        </span>

        {slot.status === "available" && <BlockTimeModal slotId={slot.id} />}
      </div>
    </div>
  );
}
