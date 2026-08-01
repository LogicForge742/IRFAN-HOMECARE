import React from "react";
import type { SSOProviderInfo } from "../api/sso-api";

interface IdentityProviderCardProps {
  providerKey: string;
  provider: SSOProviderInfo;
  linked: boolean;
  onLink: () => void;
  onUnlink: () => void;
}

const PROTOCOL_BADGES: Record<string, { label: string; color: string }> = {
  oidc: { label: "OpenID Connect", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  oauth2: { label: "OAuth 2.0", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  saml: { label: "SAML 2.0", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export const IdentityProviderCard: React.FC<IdentityProviderCardProps> = ({
  providerKey,
  provider,
  linked,
  onLink,
  onUnlink,
}) => {
  const badge = PROTOCOL_BADGES[provider.protocol] || { label: provider.protocol, color: "bg-slate-500/10 text-slate-400 border-slate-500/20" };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 uppercase">
          {providerKey.slice(0, 2)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{provider.name}</h4>
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mt-1 ${badge.color}`}>
            {badge.label}
          </span>
        </div>
      </div>
      <div>
        {linked ? (
          <button
            onClick={onUnlink}
            className="text-xs font-semibold px-3 py-1.5 bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 rounded-lg transition-colors"
          >
            Unlink
          </button>
        ) : (
          <button
            onClick={onLink}
            className="text-xs font-semibold px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/40 rounded-lg transition-colors"
          >
            Link Account
          </button>
        )}
      </div>
    </div>
  );
};
