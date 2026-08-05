import React from "react";
import { Building2, Shield } from "lucide-react";
import { useTenant } from "../hooks/useTenant";

interface TenantBrandingProps {
  showBadge?: boolean;
}

export const TenantBranding: React.FC<TenantBrandingProps> = ({ showBadge = true }) => {
  const { data: tenant } = useTenant();

  const primaryColor = tenant?.primary_color || "#10b981";

  return (
    <div className="flex items-center space-x-3">
      {tenant?.logo_url ? (
        <img
          src={tenant.logo_url}
          alt={tenant.name}
          className="h-8 w-auto object-contain rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/branding/default-logo.svg";
          }}
        />
      ) : (
        <div
          className="p-2 rounded-xl text-slate-950 font-bold"
          style={{ backgroundColor: primaryColor }}
        >
          <Building2 className="w-5 h-5 text-white" />
        </div>
      )}

      <div>
        <h2 className="text-sm font-bold text-white tracking-tight">
          {tenant?.name || "Irfan HomeCare"}
        </h2>
        {showBadge && (
          <div className="flex items-center space-x-1 text-[10px] text-slate-400">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="font-mono">{tenant?.slug || "default-tenant"}</span>
          </div>
        )}
      </div>
    </div>
  );
};
