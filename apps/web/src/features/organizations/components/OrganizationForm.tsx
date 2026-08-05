import React, { useState } from "react";
import { Building2, Globe, Hash, Loader2 } from "lucide-react";
import type { CreateOrganizationPayload } from "@/types/organization";

interface OrganizationFormProps {
  onSubmit: (payload: CreateOrganizationPayload) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      slug: slug.trim() || undefined,
      domain: domain.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Organization Name *
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Nairobi General Hospital"
            required
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          URL Slug (Optional)
        </label>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="e.g. nairobi-general"
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Auto-generated if left blank
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Custom Domain (Optional)
        </label>
        <div className="relative">
          <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. nairobi-general.ke"
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
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
          <span>Create Organization</span>
        </button>
      </div>
    </form>
  );
};
