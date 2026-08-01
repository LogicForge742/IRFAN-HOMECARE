import React from "react";

interface AuditFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  resource: string;
  onResourceChange: (val: string) => void;
  onExport: () => void;
  onArchive: () => void;
}

export const AuditFilters: React.FC<AuditFiltersProps> = ({
  search,
  onSearchChange,
  resource,
  onResourceChange,
  onExport,
  onArchive,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl mb-6">
      <div className="flex flex-1 flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by action or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <span className="absolute left-3 top-2.5 text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        <select
          value={resource}
          onChange={(e) => onResourceChange(e.target.value)}
          className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Resources</option>
          <option value="user">User</option>
          <option value="appointment">Appointment</option>
          <option value="payment">Payment</option>
          <option value="medical_record">Medical Record</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-sm transition-colors border border-slate-700"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
        <button
          onClick={onArchive}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-950/40 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-lg text-sm transition-colors border border-red-500/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Archive logs
        </button>
      </div>
    </div>
  );
};
