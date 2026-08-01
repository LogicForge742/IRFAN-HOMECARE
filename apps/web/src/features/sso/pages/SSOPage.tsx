import React, { useState } from "react";
import { useSSOProviders, useSSOLogin, useUnlinkAccount } from "../hooks/useSSO";
import { SSOLoginButton } from "../components/SSOLoginButton";
import { IdentityProviderCard } from "../components/IdentityProviderCard";
import { OrganizationSelector } from "../components/OrganizationSelector";
import { toast } from "sonner";

export const SSOPage: React.FC = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [showOrgSelector, setShowOrgSelector] = useState(false);

  const providersQuery = useSSOProviders();
  const loginMutation = useSSOLogin();
  const unlinkMutation = useUnlinkAccount();

  const providers = providersQuery.data?.providers || {};

  const handleSSOLogin = (providerKey: string) => {
    setActiveProvider(providerKey);
    loginMutation.mutate(
      { provider: providerKey },
      {
        onSuccess: (data) => {
          if (data.data?.url) {
            toast.success(`Redirecting to ${providers[providerKey]?.name || providerKey}...`);
            window.location.href = data.data.url;
          }
        },
        onError: () => {
          toast.error("Failed to initiate SSO login.");
          setActiveProvider(null);
        },
      }
    );
  };

  const handleUnlink = (providerKey: string) => {
    unlinkMutation.mutate(undefined, {
      onSuccess: () => toast.success(`Unlinked ${providers[providerKey]?.name || providerKey} account.`),
      onError: () => toast.error("Failed to unlink account."),
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Single Sign-On</h1>
        <p className="text-sm text-slate-400 mt-1">
          Sign in with your organization's identity provider or link social accounts.
        </p>
      </div>

      {/* Quick SSO Login */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Quick Login</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(providers).map(([key, prov]) => (
            <SSOLoginButton
              key={key}
              providerKey={key}
              providerName={prov.name}
              onClick={() => handleSSOLogin(key)}
              loading={activeProvider === key && loginMutation.isPending}
            />
          ))}
        </div>
        {providersQuery.isLoading && (
          <div className="text-center py-4">
            <span className="text-xs text-slate-500">Loading identity providers...</span>
          </div>
        )}
      </div>

      {/* Enterprise Organization Selection */}
      <div className="space-y-2">
        <button
          onClick={() => setShowOrgSelector(!showOrgSelector)}
          className="text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
        >
          {showOrgSelector ? "Hide Organization Selector" : "Sign in with your Organization →"}
        </button>
        {showOrgSelector && (
          <OrganizationSelector
            onSelect={(orgId) => {
              toast.info(`Organization ${orgId} selected. Redirecting to enterprise SSO...`);
              setShowOrgSelector(false);
            }}
          />
        )}
      </div>

      {/* Linked Identity Providers */}
      <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Linked Identity Providers</h3>
        <div className="space-y-3">
          {Object.entries(providers).map(([key, prov]) => (
            <IdentityProviderCard
              key={key}
              providerKey={key}
              provider={prov}
              linked={false}
              onLink={() => handleSSOLogin(key)}
              onUnlink={() => handleUnlink(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
