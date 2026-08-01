import React, { useState } from "react";
import { useProfessionals } from "../hooks/useProfessionals";
import { ProfessionalFilters } from "../components/ProfessionalFilters";
import { ProfessionalCard } from "../components/ProfessionalCard";
import type { ProfessionalFilterParams } from "@/types/professional";
import { Stethoscope } from "lucide-react";

export const ProfessionalsPage: React.FC = () => {
  const [filters, setFilters] = useState<ProfessionalFilterParams>({
    query: "",
    specialization: "ALL",
  });

  const { data: professionals, isLoading } = useProfessionals(filters);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Stethoscope className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Find Healthcare Professionals
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Search and book top-rated doctors, registered nurses, and home care specialists
        </p>
      </div>

      {/* Filter Bar */}
      <ProfessionalFilters filters={filters} onChange={setFilters} />

      {/* Professionals Grid */}
      {isLoading ? (
        <div className="p-8 text-center text-sm text-slate-400">
          Searching professionals...
        </div>
      ) : !professionals || professionals.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Stethoscope className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Professionals Found</h3>
          <p className="text-sm text-slate-400">
            No healthcare providers match your search parameters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((prof) => (
            <ProfessionalCard key={prof.id} professional={prof} />
          ))}
        </div>
      )}
    </div>
  );
};
