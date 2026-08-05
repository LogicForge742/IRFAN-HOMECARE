import React, { useState } from "react";
import { Building2, Plus, Search, Layers, ShieldCheck } from "lucide-react";
import { useOrganizations, useCreateOrganization } from "../hooks/useOrganizations";
import { OrganizationCard } from "../components/OrganizationCard";
import { OrganizationForm } from "../components/OrganizationForm";
import { toast } from "sonner";
import type { CreateOrganizationPayload } from "@/types/organization";

export const OrganizationsPage: React.FC = () => {
  const { data: organizations, isLoading } = useOrganizations();
  const createMutation = useCreateOrganization();

  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredOrgs = (organizations || []).filter(
    (org) =>
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.slug.toLowerCase().includes(search.toLowerCase()) ||
      (org.domain && org.domain.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = async (payload: CreateOrganizationPayload) => {
    try {
      await createMutation.mutateAsync(payload);
      toast.success(`Organization "${payload.name}" created successfully!`);
      setShowCreateModal(false);
    } catch {
      toast.error("Failed to create organization.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-emerald-400">
            <div className="p-2 bg-emerald-500/10 rounded-xl ring-1 ring-emerald-500/20">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Healthcare Organizations
            </h1>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">
            Manage multi-tenant clinics, hospital networks, and health partner organizations with full data isolation and role access controls.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition shadow-lg shadow-emerald-500/10 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Organization</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Tenants</p>
            <p className="text-xl font-bold text-white">{organizations?.length || 0}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Active Isolation</p>
            <p className="text-xl font-bold text-white">100%</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Enrolled Clinics</p>
            <p className="text-xl font-bold text-white">{organizations?.filter(o => o.is_active).length || 0}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by organization name, slug, or domain..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Organizations Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-sm text-slate-400">
          Loading healthcare organizations...
        </div>
      ) : filteredOrgs.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800/60 rounded-2xl">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-300">No Organizations Found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {search
              ? "No organization matches your search criteria."
              : "Get started by creating your first multi-tenant healthcare organization."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrgs.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Create Healthcare Organization</h2>
            </div>

            <OrganizationForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreateModal(false)}
              isLoading={createMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
