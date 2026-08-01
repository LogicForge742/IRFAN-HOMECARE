import React, { useState } from "react";
import { useFHIRPatient, useFHIRAppointment, useFHIRObservation } from "../hooks/useFHIR";
import { FHIRResourceCard } from "../components/FHIRResourceCard";
import { FHIRExportModal } from "../components/FHIRExportModal";
import { FHIRImportModal } from "../components/FHIRImportModal";

type ResourceType = "Patient" | "Appointment" | "Observation";

export const FHIRPage: React.FC = () => {
  const [resourceType, setResourceType] = useState<ResourceType>("Patient");
  const [resourceId, setResourceId] = useState("");
  const [lookupId, setLookupId] = useState(0);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const patientQuery = useFHIRPatient(resourceType === "Patient" ? lookupId : 0);
  const appointmentQuery = useFHIRAppointment(resourceType === "Appointment" ? lookupId : 0);
  const observationQuery = useFHIRObservation(resourceType === "Observation" ? lookupId : 0);

  const activeQuery = resourceType === "Patient" ? patientQuery : resourceType === "Appointment" ? appointmentQuery : observationQuery;

  const handleLookup = () => {
    const id = parseInt(resourceId);
    if (!id || id <= 0) return;
    setLookupId(id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">FHIR Interoperability</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse, validate, import, and export HL7 FHIR R4 clinical resources.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Import Resource
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Export Bundle
          </button>
        </div>
      </div>

      {/* Resource Lookup */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Lookup FHIR Resource</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={resourceType}
            onChange={(e) => { setResourceType(e.target.value as ResourceType); setLookupId(0); }}
            className="px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="Patient">Patient</option>
            <option value="Appointment">Appointment</option>
            <option value="Observation">Observation</option>
          </select>
          <input
            type="number"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            placeholder="Resource ID"
            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleLookup}
            disabled={!resourceId}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Fetch
          </button>
        </div>
      </div>

      {/* Results */}
      {activeQuery.isLoading && lookupId > 0 && (
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse space-y-3">
          <div className="h-4 bg-slate-800 rounded w-1/4"></div>
          <div className="h-3 bg-slate-800 rounded w-full"></div>
          <div className="h-3 bg-slate-800 rounded w-5/6"></div>
        </div>
      )}

      {activeQuery.isError && lookupId > 0 && (
        <div className="p-4 bg-red-950/30 border border-red-500/20 rounded-xl text-xs text-red-400 font-semibold">
          Resource not found or request failed.
        </div>
      )}

      {activeQuery.data && lookupId > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Retrieved Resource</h3>
          <FHIRResourceCard resource={activeQuery.data} />
        </div>
      )}

      {/* Reference */}
      <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-300">Supported FHIR R4 Resources</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Patient", "Practitioner", "Appointment", "Observation", "MedicationRequest", "Condition"].map((type) => (
            <div key={type} className="px-3 py-2 bg-slate-950/50 border border-slate-800/50 rounded-lg text-xs text-slate-400 font-mono">
              {type}
            </div>
          ))}
        </div>
      </div>

      <FHIRExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
      <FHIRImportModal isOpen={showImport} onClose={() => setShowImport(false)} />
    </div>
  );
};
