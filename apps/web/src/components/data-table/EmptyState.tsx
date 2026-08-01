import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Found",
  description = "There are no records matching your query or selected filters.",
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-805 bg-slate-900/10 rounded-2xl space-y-4">
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-500">
        <FolderOpen className="w-8 h-8" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
export default EmptyState;
