import React, { useState } from "react";
import { Building, ChevronDown, Check } from "lucide-react";
import { useTenants, useTenantSwitcher } from "../hooks/useTenant";

export const TenantSwitcher: React.FC = () => {
  const { data: tenants, isLoading } = useTenants();
  const { activeTenantId, switchTenant } = useTenantSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const activeTenant = tenants?.find((t) => t.id === activeTenantId) || tenants?.[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition text-left"
      >
        <div
          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: activeTenant?.primary_color || "#10b981" }}
        />
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold text-white truncate">
            {isLoading ? "Loading..." : activeTenant?.name || "Select Tenant"}
          </p>
          <p className="text-[10px] text-slate-400 font-mono truncate">
            {activeTenant?.slug || "tenant"}
          </p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 py-2 divide-y divide-slate-800/60">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Building className="w-3 h-3" />
            <span>Active Tenant Context</span>
          </div>

          <div className="py-1 max-h-56 overflow-y-auto">
            {tenants?.map((tenant) => {
              const isSelected = tenant.id === activeTenantId;
              return (
                <button
                  key={tenant.id}
                  onClick={() => {
                    switchTenant(tenant.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 flex items-center justify-between hover:bg-slate-800/60 text-left transition"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tenant.primary_color }}
                    />
                    <div className="truncate">
                      <p className="text-xs font-medium text-white truncate">{tenant.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        {tenant.slug}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
