import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { SortOrder } from "@/types/common/sorting";

interface SortButtonProps {
  column: string;
  label: string;
  sortBy: string;
  sortOrder: SortOrder;
  onSort: (column: string) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({
  column,
  label,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const isSorted = sortBy === column;

  return (
    <button
      onClick={() => onSort(column)}
      className="inline-flex items-center space-x-1.5 hover:text-white font-medium transition-colors focus:outline-none"
    >
      <span>{label}</span>
      {isSorted ? (
        sortOrder === "asc" ? (
          <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
        )
      ) : (
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 opacity-65 hover:opacity-100" />
      )}
    </button>
  );
};
export default SortButton;
