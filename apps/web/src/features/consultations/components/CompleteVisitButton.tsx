import { useCompleteAppointment } from "../hooks/useConsultation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  appointmentId: number;
}

export default function CompleteVisitButton({ appointmentId }: Props) {
  const mutation = useCompleteAppointment();

  const handleComplete = () => {
    mutation.mutate(appointmentId, {
      onSuccess() {
        toast.success("Visit marked as completed!");
      },
      onError() {
        toast.error("Failed to mark visit as completed");
      },
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-white">Finalize Consultation</h3>
        <p className="text-xs text-slate-400">
          Mark home care visit as finished to update patient status and notify care team
        </p>
      </div>

      <button
        className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-semibold px-5 py-2.5 rounded-xl transition text-xs disabled:opacity-50"
        onClick={handleComplete}
        disabled={mutation.isPending}
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>{mutation.isPending ? "Updating..." : "Complete Visit"}</span>
      </button>
    </div>
  );
}
