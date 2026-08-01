import React from "react";
import { Search, Filter } from "lucide-react";
import type { ProfessionalFilterParams } from "@/types/professional";

interface Props {
  filters: ProfessionalFilterParams;
  onChange: (filters: ProfessionalFilterParams) => void;
}

export const ProfessionalFilters: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 items-center">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <input
          type="text"
          value={filters.query || ""}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search by professional name or location..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Specialization Filter */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Filter className="w-4 h-4 text-emerald-400 hidden sm:block" />
        <select
          value={filters.specialization || "ALL"}
          onChange={(e) =>
            onChange({ ...filters, specialization: e.target.value })
          }
          className="w-full md:w-56 px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <option value="ALL">All Specializations</option>
          <option value="General Nursing">General Nursing</option>
          <option value="Physiotherapy">Physiotherapy</option>
          <option value="Wound Care">Post-Op Wound Care</option>
        </select>
      </div>
    </div>
  );
};
