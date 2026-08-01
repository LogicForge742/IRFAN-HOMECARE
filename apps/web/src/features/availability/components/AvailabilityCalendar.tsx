import TimeSlotCard from "./TimeSlotCard";
import type { AvailabilitySlot } from "@/types/availability";
import { CalendarRange } from "lucide-react";

export default function AvailabilityCalendar({
  slots,
}: {
  slots: AvailabilitySlot[];
}) {
  if (!slots || slots.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
        <CalendarRange className="w-8 h-8 text-slate-600 mx-auto" />
        <p className="text-sm font-medium">No working hours or slots configured.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Active Schedule Slots ({slots.length})
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => (
          <TimeSlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
