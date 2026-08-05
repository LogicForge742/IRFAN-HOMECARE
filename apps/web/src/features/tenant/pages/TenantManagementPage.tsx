import React, { useState } from "react";
import { Sliders, ShieldCheck, Paintbrush, Video, Cpu, Activity } from "lucide-react";
import { useTenant, useUpdateTenant } from "../hooks/useTenant";

import { TenantBranding } from "../components/TenantBranding";
import { toast } from "sonner";

export const TenantManagementPage: React.FC = () => {
  const { data: tenant, isLoading } = useTenant();
  const updateMutation = useUpdateTenant(tenant?.id || "");

  const [primaryColor, setPrimaryColor] = useState(tenant?.primary_color || "#10b981");
  const [logoUrl, setLogoUrl] = useState(tenant?.logo_url || "");

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant?.id) return;
    try {
      await updateMutation.mutateAsync({
        primary_color: primaryColor,
        logo_url: logoUrl || undefined,
      });
      toast.success("Tenant branding updated!");
    } catch {
      toast.error("Failed to update tenant branding.");
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-sm text-slate-400">Loading tenant profile...</div>;
  }

  const features = tenant?.settings?.features || {
    telehealth_video: true,
    ai_triage_assistant: true,
    fhir_interoperability: true,
    mpesa_payments: true,
    sso_integration: true,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <TenantBranding />
          <p className="text-sm text-slate-400 max-w-xl">
            Organization tenant portal and custom deployment settings for {tenant?.name}.
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold self-start md:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>Tenant Isolated Deployment</span>
        </div>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branding Configuration */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Paintbrush className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Custom Tenant Branding</h3>
          </div>

          <form onSubmit={handleSaveBranding} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Accent Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Logo Asset URL
              </label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="/assets/branding/default-logo.svg"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/10"
            >
              {updateMutation.isPending ? "Saving..." : "Save Branding Changes"}
            </button>
          </form>
        </div>

        {/* Enabled Features */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Active Tenant Features</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">Telehealth Video Consults</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {features.telehealth_video ? "Enabled" : "Disabled"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-white">AI Triage & Clinical Co-Pilot</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {features.ai_triage_assistant ? "Enabled" : "Disabled"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">FHIR R4 Interoperability</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {features.fhir_interoperability ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManagementPage;
