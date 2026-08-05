import React, { useState } from "react";
import { Building2, Globe, Hash, Palette, Loader2 } from "lucide-react";
import type { CreateTenantPayload } from "@/types/tenant";

interface TenantFormProps {
  onSubmit: (payload: CreateTenantPayload) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const TenantForm: React.FC<TenantFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#10b981");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      slug: slug.trim() || undefined,
      domain: domain.trim() || undefined,
      primary_color: primaryColor,
      is_active: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Tenant Name *
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Coast General Teaching Hospital"
            required
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Subdomain Slug (Optional)
        </label>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="e.g. coast-general"
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Custom Host Domain (Optional)
        </label>
        <div className="relative">
          <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. coastgeneral.ke"
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Theme Accent Color
        </label>
        <div className="flex items-center space-x-3">
          <Palette className="w-4 h-4 text-slate-500" />
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-300">{primaryColor}</span>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="flex items-center space-x-2 px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition shadow-lg shadow-emerald-500/10"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>Deploy Tenant</span>
        </button>
      </div>
    </form>
  );
};
