import React from "react";
import { Building2, ShieldCheck, Globe } from "lucide-react";
import type { Tenant } from "@/types/tenant";


interface TenantStatsProps {
  tenants: Tenant[];
}

export const TenantStats: React.FC<TenantStatsProps> = ({ tenants }) => {
  const total = tenants.length;
  const active = tenants.filter((t) => t.is_active).length;
  const customDomains = tenants.filter((t) => t.domain).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Total Deployed Tenants</p>
          <h4 className="text-2xl font-extrabold text-white tracking-tight">{total}</h4>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Active Tenant Contexts</p>
          <h4 className="text-2xl font-extrabold text-white tracking-tight">{active}</h4>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Custom Domains Configured</p>
          <h4 className="text-2xl font-extrabold text-white tracking-tight">{customDomains}</h4>
        </div>
      </div>
    </div>
  );
};
