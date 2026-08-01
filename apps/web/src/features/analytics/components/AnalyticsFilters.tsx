import React from "react";
import { Download } from "lucide-react";
import { DateRangePicker } from "./DateRangePicker";

interface AnalyticsFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onExport?: (format: "csv" | "pdf") => void;
}

export const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  dateRange,
  onDateRangeChange,
  onExport,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-slate-400">Date Filter:</span>
        <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
      </div>

      {onExport && (
        <div className="flex space-x-2">
          <button
            onClick={() => onExport("csv")}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => onExport("pdf")}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default AnalyticsFilters;
