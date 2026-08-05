import React from "react";
import { Building2, Globe, CheckCircle2, XCircle, Settings } from "lucide-react";
import type { Tenant } from "@/types/tenant";

interface TenantTableProps {
  tenants: Tenant[];
  onSelectTenant?: (tenant: Tenant) => void;
}

export const TenantTable: React.FC<TenantTableProps> = ({ tenants, onSelectTenant }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-[2fr_1.5fr_1fr_auto] gap-4 px-6 py-3 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
        <span>Tenant Organization</span>
        <span>Domain / Subdomain</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      <div className="divide-y divide-slate-800/50">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="grid grid-cols-[2fr_1.5fr_1fr_auto] gap-4 px-6 py-4 hover:bg-slate-800/30 transition items-center"
          >
            <div className="flex items-center space-x-3 truncate">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-950 font-bold text-xs"
                style={{ backgroundColor: tenant.primary_color || "#10b981" }}
              >
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">{tenant.name}</p>
                <p className="text-xs text-slate-400 font-mono truncate">slug: {tenant.slug}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-300 truncate">
              <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="truncate">{tenant.domain || `${tenant.slug}.irfanhomecare.ke`}</span>
            </div>

            <div>
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                  tenant.is_active
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                }`}
              >
                {tenant.is_active ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" />
                    <span>Suspended</span>
                  </>
                )}
              </span>
            </div>

            <div>
              {onSelectTenant && (
                <button
                  onClick={() => onSelectTenant(tenant)}
                  className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
                  title="Configure Tenant"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
