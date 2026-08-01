import { useState } from "react";
import { useCreateAvailability } from "../hooks/useAvailability";
import { PlusCircle, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export default function AvailabilityForm() {
  const mutation = useCreateAvailability();

  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function submit() {
    if (!date || !start || !end) {
      toast.error("Please enter date, start time, and end time");
      return;
    }
    mutation.mutate(
      {
        date,
        start_time: start,
        end_time: end,
      },
      {
        onSuccess() {
          toast.success("Availability slot created!");
          setDate("");
          setStart("");
          setEnd("");
        },
        onError() {
          toast.error("Failed to create availability slot");
        },
      }
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
        <PlusCircle className="w-5 h-5 text-emerald-400" />
        <span>Create New Working Slot</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <input
            type="date"
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500"
            placeholder="Start time (e.g. 09:00 AM)"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <Clock className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
        </div>

        <div className="relative">
          <input
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500"
            placeholder="End time (e.g. 10:00 AM)"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <Clock className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
        </div>
      </div>

      <button
        className="w-full sm:w-auto inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
        onClick={submit}
        disabled={mutation.isPending}
      >
        <Calendar className="w-4 h-4" />
        <span>{mutation.isPending ? "Creating Slot..." : "Create Slot"}</span>
      </button>
    </div>
  );
}
