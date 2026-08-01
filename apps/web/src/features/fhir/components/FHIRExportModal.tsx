import React, { useState } from "react";
import { useExportFHIR } from "../hooks/useFHIR";
import { FHIRResourceCard } from "./FHIRResourceCard";
import { toast } from "sonner";

interface FHIRExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FHIRExportModal: React.FC<FHIRExportModalProps> = ({ isOpen, onClose }) => {
  const [patientId, setPatientId] = useState("");
  const exportMutation = useExportFHIR();

  if (!isOpen) return null;

  const handleExport = () => {
    const id = parseInt(patientId);
    if (!id || id <= 0) {
      toast.error("Please enter a valid Patient ID.");
      return;
    }
    exportMutation.mutate(id, {
      onError: () => toast.error("Failed to export FHIR bundle."),
    });
  };

  const handleDownload = () => {
    if (!exportMutation.data) return;
    const blob = new Blob([JSON.stringify(exportMutation.data, null, 2)], { type: "application/fhir+json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fhir_bundle_patient_${patientId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Bundle downloaded successfully.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl space-y-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Export FHIR Bundle</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-sm transition-colors">✕</button>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-slate-400 block">Patient ID</label>
          <div className="flex gap-3">
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleExport}
              disabled={exportMutation.isPending}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              {exportMutation.isPending ? "Exporting..." : "Export"}
            </button>
          </div>
        </div>

        {exportMutation.data && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Bundle — {exportMutation.data.entry?.length || 0} Resources
              </span>
              <button
                onClick={handleDownload}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                Download JSON
              </button>
            </div>
            <div className="grid gap-3">
              {exportMutation.data.entry?.map((e, idx) => (
                <FHIRResourceCard key={idx} resource={e.resource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
