import { useState } from "react";
import DiagnosisInput from "./DiagnosisInput";
import PrescriptionBuilder from "./PrescriptionBuilder";
import FileUpload from "./FileUpload";
import { useCreateMedicalRecord } from "../hooks/useConsultation";
import { AIAssistant } from "../../ai/components/AIAssistant";
import type { PrescriptionInput } from "@/types/consultation";
import { FileText, Save } from "lucide-react";
import { toast } from "sonner";

interface Props {
  appointmentId: number;
}

export default function ConsultationForm({ appointmentId }: Props) {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState<PrescriptionInput[]>([]);

  const mutation = useCreateMedicalRecord();

  function submit() {
    if (!diagnosis) {
      toast.error("Please enter a diagnosis for the record");
      return;
    }
    mutation.mutate(
      {
        appointment_id: appointmentId,
        diagnosis,
        notes,
        prescriptions,
      },
      {
        onSuccess() {
          toast.success("Medical record & prescriptions saved successfully!");
        },
        onError() {
          toast.error("Failed to save medical record");
        },
      }
    );
  }

  return (
    <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2 text-emerald-400 border-b border-slate-800 pb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-bold text-white">Clinical Consultation Entry</h2>
      </div>

      <DiagnosisInput value={diagnosis} onChange={setDiagnosis} />

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Consultation Notes & Observations
        </label>
        <textarea
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500 min-h-[120px]"
          placeholder="Record patient vitals, physical observations, treatment plan, and follow-up advice..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="border-t border-slate-800 pt-6">
        <AIAssistant
          observations={notes}
          symptoms={notes}
          diagnosis={diagnosis}
          onApplySummary={(val) => setNotes((n) => n ? `${n}\n\nClinical Summary:\n${val}` : `Clinical Summary:\n${val}`)}
          onApplyDiagnosis={(val) => setDiagnosis(val)}
          onApplyFollowup={(val) => setNotes((n) => n ? `${n}\n\nFollow-up Instructions:\n${val}` : `Follow-up Instructions:\n${val}`)}
          onApplyInstructions={(val) => setNotes((n) => n ? `${n}\n\nPatient Home Care:\n${val}` : `Patient Home Care:\n${val}`)}
        />
      </div>

      <PrescriptionBuilder
        prescriptions={prescriptions}
        setPrescriptions={setPrescriptions}
      />

      <FileUpload />

      <button
        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
        onClick={submit}
        disabled={mutation.isPending}
      >
        <Save className="w-4 h-4" />
        <span>
          {mutation.isPending ? "Saving Record..." : "Save Medical Record"}
        </span>
      </button>
    </div>
  );
}
