import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startRange = (page - 1) * perPage + 1;
  const endRange = Math.min(page * perPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 border-t border-slate-800 bg-slate-950/20 rounded-b-2xl">
      <div className="text-sm text-slate-400">
        Showing <span className="font-semibold text-white">{startRange}</span> to{" "}
        <span className="font-semibold text-white">{endRange}</span> of{" "}
        <span className="font-semibold text-white">{totalItems}</span> results
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
