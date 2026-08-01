import React from "react";
import {
  useConsultationSummary,
  useDifferentialDiagnosis,
  useFollowup,
  usePatientInstructions,
} from "../hooks/useAI";
import { AILoading } from "./AILoading";
import { AISuggestions } from "./AISuggestions";

interface AIAssistantProps {
  observations: string;
  symptoms: string;
  diagnosis: string;
  onApplySummary: (val: string) => void;
  onApplyDiagnosis: (val: string) => void;
  onApplyFollowup: (val: string) => void;
  onApplyInstructions: (val: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  observations,
  symptoms,
  diagnosis,
  onApplySummary,
  onApplyDiagnosis,
  onApplyFollowup,
  onApplyInstructions,
}) => {
  const summaryMutation = useConsultationSummary();
  const diffMutation = useDifferentialDiagnosis();
  const followupMutation = useFollowup();
  const instructionsMutation = usePatientInstructions();

  const handleGenerateSummary = () => {
    summaryMutation.mutate({ observations, symptoms, diagnosis });
  };

  const handleGenerateDiff = () => {
    diffMutation.mutate({ symptoms, diagnosis });
  };

  const handleGenerateFollowup = () => {
    followupMutation.mutate(diagnosis);
  };

  const handleGenerateInstructions = () => {
    instructionsMutation.mutate(diagnosis);
  };

  const isPending =
    summaryMutation.isPending ||
    diffMutation.isPending ||
    followupMutation.isPending ||
    instructionsMutation.isPending;

  return (
    <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-base font-bold text-white">AI Consultation Assist</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={handleGenerateSummary}
          disabled={!diagnosis || isPending}
          className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors"
        >
          Draft Summary
        </button>
        <button
          onClick={handleGenerateDiff}
          disabled={!symptoms || isPending}
          className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors"
        >
          Diff Diagnoses
        </button>
        <button
          onClick={handleGenerateFollowup}
          disabled={!diagnosis || isPending}
          className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors"
        >
          Follow-up Info
        </button>
        <button
          onClick={handleGenerateInstructions}
          disabled={!diagnosis || isPending}
          className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors"
        >
          Patient Guides
        </button>
      </div>

      {isPending && <AILoading />}

      <AISuggestions
        title="Summary"
        suggestion={summaryMutation.data?.suggestion || ""}
        onApply={() => onApplySummary(summaryMutation.data?.suggestion || "")}
      />
      <AISuggestions
        title="Differential Diagnoses"
        suggestion={diffMutation.data?.suggestion || ""}
        onApply={() => onApplyDiagnosis(diffMutation.data?.suggestion || "")}
      />
      <AISuggestions
        title="Follow-up"
        suggestion={followupMutation.data?.suggestion || ""}
        onApply={() => onApplyFollowup(followupMutation.data?.suggestion || "")}
      />
      <AISuggestions
        title="Instructions"
        suggestion={instructionsMutation.data?.suggestion || ""}
        onApply={() => onApplyInstructions(instructionsMutation.data?.suggestion || "")}
      />
    </div>
  );
};
