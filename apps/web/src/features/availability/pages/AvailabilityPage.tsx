import { useAvailability } from "../hooks/useAvailability";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import AvailabilityForm from "../components/AvailabilityForm";
import { CalendarDays } from "lucide-react";

export default function AvailabilityPage() {
  const { data, isLoading } = useAvailability();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading availability schedule...
      </div>
    );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <CalendarDays className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            My Working Hours & Availability
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Configure available visit slots, set working hours, and block out personal time
        </p>
      </div>

      <AvailabilityForm />

      <AvailabilityCalendar slots={data ?? []} />
    </div>
  );
}
