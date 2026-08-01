import React from "react";

interface AISuggestionsProps {
  title: string;
  suggestion: string;
  onApply: () => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ title, suggestion, onApply }) => {
  if (!suggestion) return null;

  return (
    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 mt-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Suggested {title}</span>
        <button
          onClick={onApply}
          className="text-xs font-semibold px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors"
        >
          Apply Suggestion
        </button>
      </div>
      <p className="text-sm text-slate-300 whitespace-pre-wrap">{suggestion}</p>
    </div>
  );
};
