import React from "react";
import { Link } from "react-router-dom";
import { Building2, Globe, Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { Organization } from "@/types/organization";

interface OrganizationCardProps {
  organization: Organization;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg transition-all group flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-emerald-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                {organization.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">slug: {organization.slug}</p>
            </div>
          </div>

          <span
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
              organization.is_active
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {organization.is_active ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                <span>Active</span>
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3" />
                <span>Inactive</span>
              </>
            )}
          </span>
        </div>

        {organization.domain && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-800/40">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">{organization.domain}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>{organization.member_count ?? 0} Members</span>
        </div>

        <Link
          to={`/admin/organizations/${organization.id}`}
          className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold transition"
        >
          <span>Manage</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
