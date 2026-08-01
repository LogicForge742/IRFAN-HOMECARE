import React from "react";
import { useProfessionals } from "../hooks/useProfessionals";
import { useFilters } from "@/hooks/query/useFilters";
import { ProfessionalCard } from "../components/ProfessionalCard";
import { ProfessionalSearch } from "../components/filters/ProfessionalSearch";
import { SpecializationFilter } from "../components/filters/SpecializationFilter";
import { LocationFilter } from "../components/filters/LocationFilter";
import { RatingFilter } from "../components/filters/RatingFilter";
import { AvailabilityFilter } from "../components/filters/AvailabilityFilter";
import { Pagination } from "@/components/data-table/Pagination";
import { EmptyState } from "@/components/data-table/EmptyState";
import { LoadingSkeleton } from "@/components/data-table/LoadingSkeleton";
import { PageSizeSelector } from "@/components/data-table/PageSizeSelector";
import { Stethoscope, RotateCcw } from "lucide-react";

export const ProfessionalsPage: React.FC = () => {
  const {
    page,
    perPage,
    setPage,
    setPerPage,
    search,
    setSearch,
    filters,
    setFilter,
    clearFilters,
    queryParams,
  } = useFilters({
    defaultPerPage: 6,
  });

  const { data, isLoading } = useProfessionals(queryParams);

  const professionals = data?.data || [];
  const metadata = data?.metadata;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Stethoscope className="w-7 h-7" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Find Healthcare Professionals
            </h1>
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
        <p className="text-sm text-slate-400">
          Search and book top-rated doctors, registered nurses, and home care specialists
        </p>
      </div>

      {/* Filter Bar Grid */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-1">
          <ProfessionalSearch value={search} onChange={setSearch} />
        </div>
        <div>
          <SpecializationFilter
            value={(filters.specialization as string) || "ALL"}
            onChange={(val) => setFilter("specialization", val)}
          />
        </div>
        <div>
          <LocationFilter
            value={(filters.location as string) || "ALL"}
            onChange={(val) => setFilter("location", val)}
          />
        </div>
        <div>
          <RatingFilter
            value={(filters.rating as string) || "ALL"}
            onChange={(val) => setFilter("rating", val)}
          />
        </div>
        <div>
          <AvailabilityFilter
            value={(filters.availability as string) || "ALL"}
            onChange={(val) => setFilter("availability", val)}
          />
        </div>
      </div>

      {/* Page Size Selector */}
      <div className="flex justify-end px-2">
        <PageSizeSelector value={perPage} onChange={setPerPage} options={[6, 12, 24, 48]} />
      </div>

      {/* Professionals Grid */}
      {isLoading ? (
        <LoadingSkeleton rows={2} columns={3} />
      ) : professionals.length === 0 ? (
        <EmptyState
          title="No Professionals Found"
          description="We couldn't find any healthcare providers matching your search parameters. Try adjusting or clearing your filters."
          onClearFilters={clearFilters}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>

          {/* Pagination */}
          {metadata && (
            <Pagination
              page={page}
              totalPages={metadata.pages}
              totalItems={metadata.total}
              perPage={perPage}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default ProfessionalsPage;
