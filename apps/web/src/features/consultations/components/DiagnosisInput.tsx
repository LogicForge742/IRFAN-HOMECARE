import { Stethoscope } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DiagnosisInput({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
        <Stethoscope className="w-4 h-4 text-emerald-400" />
        <span>Clinical Diagnosis</span>
      </label>
      <textarea
        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500 min-h-[100px]"
        placeholder="Enter detailed clinical diagnosis (e.g. Mild Hypertension, Acute Post-Op Rehabilitation Status)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
