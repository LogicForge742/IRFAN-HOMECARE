import React from "react";
import { SourceCard } from "./SourceCard";
import type { RAGSource } from "../api/rag-api";

interface AnswerPanelProps {
  answer: string;
  sources: RAGSource[];
  loading: boolean;
}

export const AnswerPanel: React.FC<AnswerPanelProps> = ({ answer, sources, loading }) => {
  if (loading) {
    return (
      <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse space-y-3">
        <div className="h-4 bg-slate-800 rounded w-1/3"></div>
        <div className="h-3 bg-slate-800 rounded w-full"></div>
        <div className="h-3 bg-slate-800 rounded w-5/6"></div>
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Generated Answer</h3>
        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
      </div>

      {sources.length > 0 && (
        <div className="space-y-3 border-t border-slate-800/80 pt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Retrieved References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sources.map((src) => (
              <SourceCard key={src.id} source={src} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
