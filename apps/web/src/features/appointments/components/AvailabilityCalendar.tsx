import React, { useEffect, useState } from "react";
import { appointmentApi } from "../api/appointment-api";
import type { AvailabilitySlot } from "@/types/appointment";
import { Clock } from "lucide-react";

interface CalendarProps {
  professionalId: string;
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectSlot: (slotTime: string) => void;
}

export const AvailabilityCalendar: React.FC<CalendarProps> = ({
  professionalId,
  selectedDate,
  selectedTimeSlot,
  onSelectSlot,
}) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!professionalId || !selectedDate) return;

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const data = await appointmentApi.getAvailability(
          professionalId,
          selectedDate
        );
        setSlots(data);
      } catch {
        // Fallback slots handled in API
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [professionalId, selectedDate]);

  if (loading) {
    return (
      <div className="p-4 text-center text-xs text-slate-400">
        Loading availability slots...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        Available Time Slots ({selectedDate})
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.startTime;
          return (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.isAvailable}
              onClick={() => onSelectSlot(slot.startTime)}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 transition ${
                isSelected
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-400 font-bold"
                  : slot.isAvailable
                  ? "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                  : "bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed line-through"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{slot.startTime}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
