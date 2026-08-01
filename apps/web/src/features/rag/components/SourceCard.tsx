import React from "react";
import type { RAGSource } from "../api/rag-api";

interface SourceCardProps {
  source: RAGSource;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  return (
    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-300">{source.metadata.title || "Untitled Source"}</span>
        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">
          {(source.score * 100).toFixed(0)}% Match
        </span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed italic">"...{source.text}..."</p>
    </div>
  );
};
