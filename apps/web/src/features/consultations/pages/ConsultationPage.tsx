import ConsultationForm from "../components/ConsultationForm";
import CompleteVisitButton from "../components/CompleteVisitButton";
import { Stethoscope } from "lucide-react";

export default function ConsultationPage() {
  const appointmentId =
    Number(new URLSearchParams(window.location.search).get("appointment")) || 101;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Stethoscope className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Home Care Consultation
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Record clinical findings, prescribe medications, and finalize home visit for Appointment #{appointmentId}
        </p>
      </div>

      <ConsultationForm appointmentId={appointmentId} />

      <CompleteVisitButton appointmentId={appointmentId} />
    </div>
  );
}
