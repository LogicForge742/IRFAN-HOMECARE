import React from "react";
import type { FHIRResource } from "../api/fhir-api";

interface FHIRResourceCardProps {
  resource: FHIRResource;
}

const TYPE_COLORS: Record<string, string> = {
  Patient: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Practitioner: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Appointment: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Observation: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  MedicationRequest: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Condition: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export const FHIRResourceCard: React.FC<FHIRResourceCardProps> = ({ resource }) => {
  const colorClass = TYPE_COLORS[resource.resourceType] || "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colorClass}`}>
          {resource.resourceType}
        </span>
        <span className="text-xs text-slate-500 font-mono">ID: {resource.id}</span>
      </div>

      <div className="bg-slate-950/70 rounded-lg p-3 overflow-x-auto max-h-48 scrollbar-thin">
        <pre className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-wrap font-mono">
          {JSON.stringify(resource, null, 2)}
        </pre>
      </div>
    </div>
  );
};
