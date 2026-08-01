import type { Prescription } from "@/types/medical-record";
import { Pill } from "lucide-react";

export default function PrescriptionCard({
  medicine,
  dosage,
  instructions,
}: Prescription) {
  return (
    <div className="border border-slate-800 rounded-xl p-4 bg-slate-950 space-y-2">
      <h4 className="font-bold text-white text-sm flex items-center space-x-2">
        <Pill className="w-4 h-4 text-emerald-400" />
        <span>{medicine}</span>
      </h4>

      <div className="text-xs space-y-1 text-slate-300">
        <p>
          <span className="text-slate-400 font-medium">Dosage:</span> {dosage}
        </p>
        <p>
          <span className="text-slate-400 font-medium">Instructions:</span> {instructions}
        </p>
      </div>
    </div>
  );
}
