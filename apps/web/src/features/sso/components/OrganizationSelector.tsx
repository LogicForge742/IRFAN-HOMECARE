import React, { useState } from "react";
import { useOrganizations } from "@/features/organizations/hooks/useOrganizations";

interface OrganizationSelectorProps {
  onSelect: (orgId: string) => void;
}

export const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ onSelect }) => {
  const { data: orgs, isLoading } = useOrganizations();
  const [search, setSearch] = useState("");

  const organizations = orgs || [
    { id: "org-hospital-a", name: "Nairobi General Hospital", domain: "nairobi-general.ke", slug: "nairobi-general" },
    { id: "org-clinic-b", name: "Irfan HomeCare Clinic", domain: "irfan-homecare.ke", slug: "irfan-homecare" },
    { id: "org-health-c", name: "County Health Services", domain: "county-health.ke", slug: "county-health" },
  ];


  const filtered = organizations.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      (o.domain && o.domain.toLowerCase().includes(search.toLowerCase())) ||
      (o.slug && o.slug.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-white">Select Your Organization</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or domain..."
        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
      />
      {isLoading ? (
        <p className="text-xs text-slate-500 text-center py-4">Loading organizations...</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filtered.map((org) => (
            <button
              key={org.id}
              onClick={() => onSelect(org.id)}
              className="w-full flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl hover:border-emerald-500/40 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-semibold text-white">{org.name}</p>
                <p className="text-xs text-slate-500">{org.domain || org.slug}</p>
              </div>
              <span className="text-emerald-400 text-xs font-semibold">Select →</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">No organizations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

