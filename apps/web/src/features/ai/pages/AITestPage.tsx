import React, { useState } from "react";
import { AIAssistant } from "../components/AIAssistant";

export const AITestPage: React.FC = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [observations, setObservations] = useState("");

  const [appliedSummary, setAppliedSummary] = useState("");
  const [appliedDiagnosis, setAppliedDiagnosis] = useState("");
  const [appliedFollowup, setAppliedFollowup] = useState("");
  const [appliedInstructions, setAppliedInstructions] = useState("");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Assistant Test Bench</h1>
        <p className="text-sm text-slate-400 mt-1">
          Experiment with live prompts, symptoms analysis, and automatic record drafts.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200">1. Input Patient Information</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Symptoms</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Cough, fever, sore throat"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Primary Diagnosis</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute bronchitis"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Clinical Observations</label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="e.g. Lungs clear to percussion, mild throat inflammation"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 h-20 resize-none"
            />
          </div>
        </div>
      </div>

      <AIAssistant
        observations={observations}
        symptoms={symptoms}
        diagnosis={diagnosis}
        onApplySummary={setAppliedSummary}
        onApplyDiagnosis={setAppliedDiagnosis}
        onApplyFollowup={setAppliedFollowup}
        onApplyInstructions={setAppliedInstructions}
      />

      <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200">2. Consultation Draft Preview</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <span className="text-xs text-slate-500 block mb-1">Summary</span>
            <p className="min-h-[2rem]">{appliedSummary || "No summary drafted yet."}</p>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <span className="text-xs text-slate-500 block mb-1">Differential Diagnoses</span>
            <p className="min-h-[2rem]">{appliedDiagnosis || "No differential diagnosis applied."}</p>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <span className="text-xs text-slate-500 block mb-1">Follow-up Plan</span>
            <p className="min-h-[2rem]">{appliedFollowup || "No follow-up plan drafted."}</p>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <span className="text-xs text-slate-500 block mb-1">Patient Home Care Guides</span>
            <p className="min-h-[2rem]">{appliedInstructions || "No home care guides applied."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
