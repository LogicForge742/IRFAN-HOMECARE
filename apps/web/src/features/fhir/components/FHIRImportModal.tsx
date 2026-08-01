import React, { useState } from "react";
import { useImportFHIR, useValidateFHIR } from "../hooks/useFHIR";
import { toast } from "sonner";

interface FHIRImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FHIRImportModal: React.FC<FHIRImportModalProps> = ({ isOpen, onClose }) => {
  const [jsonText, setJsonText] = useState("");
  const [validationResult, setValidationResult] = useState<{ status: string; errors?: string[]; message?: string } | null>(null);

  const validateMutation = useValidateFHIR();
  const importMutation = useImportFHIR();

  if (!isOpen) return null;

  const parseResource = () => {
    try {
      return JSON.parse(jsonText);
    } catch {
      toast.error("Invalid JSON. Please check your input.");
      return null;
    }
  };

  const handleValidate = () => {
    const resource = parseResource();
    if (!resource) return;
    validateMutation.mutate(resource, {
      onSuccess: (data) => {
        setValidationResult(data);
        if (data.status === "valid") toast.success("Resource is valid FHIR.");
        else toast.warning("Validation failed. See errors below.");
      },
      onError: () => toast.error("Validation request failed."),
    });
  };

  const handleImport = () => {
    const resource = parseResource();
    if (!resource) return;
    importMutation.mutate(resource, {
      onSuccess: (data) => {
        toast.success(data.message || "Resource imported successfully.");
        setJsonText("");
        setValidationResult(null);
        onClose();
      },
      onError: () => toast.error("Import failed."),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl space-y-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Import FHIR Resource</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-sm transition-colors">✕</button>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400 block">Paste FHIR JSON Resource</label>
          <textarea
            value={jsonText}
            onChange={(e) => { setJsonText(e.target.value); setValidationResult(null); }}
            placeholder='{"resourceType": "Patient", "id": "1", "name": [{"text": "John"}]}'
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-emerald-500 h-40 resize-none"
          />
        </div>

        {validationResult && (
          <div className={`p-3 rounded-xl text-xs ${validationResult.status === "valid" ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400" : "bg-red-950/40 border border-red-500/20 text-red-400"}`}>
            {validationResult.status === "valid" ? (
              <span className="font-semibold">✓ Resource is valid FHIR R4.</span>
            ) : (
              <div className="space-y-1">
                <span className="font-semibold">✗ Validation Errors:</span>
                <ul className="list-disc list-inside">
                  {validationResult.errors?.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleValidate}
            disabled={!jsonText.trim() || validateMutation.isPending}
            className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
          >
            {validateMutation.isPending ? "Validating..." : "Validate First"}
          </button>
          <button
            onClick={handleImport}
            disabled={!jsonText.trim() || importMutation.isPending}
            className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {importMutation.isPending ? "Importing..." : "Import Resource"}
          </button>
        </div>
      </div>
    </div>
  );
};
