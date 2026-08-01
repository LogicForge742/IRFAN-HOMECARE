import React from "react";

const PROVIDER_ICONS: Record<string, { bg: string; text: string; label: string }> = {
  google: { bg: "bg-white hover:bg-slate-100", text: "text-slate-900", label: "G" },
  microsoft: { bg: "bg-blue-600 hover:bg-blue-500", text: "text-white", label: "M" },
  github: { bg: "bg-slate-800 hover:bg-slate-700", text: "text-white", label: "GH" },
  facebook: { bg: "bg-blue-700 hover:bg-blue-600", text: "text-white", label: "f" },
  okta: { bg: "bg-indigo-600 hover:bg-indigo-500", text: "text-white", label: "O" },
  hospital: { bg: "bg-emerald-700 hover:bg-emerald-600", text: "text-white", label: "H" },
};

interface SSOLoginButtonProps {
  providerKey: string;
  providerName: string;
  onClick: () => void;
  loading?: boolean;
}

export const SSOLoginButton: React.FC<SSOLoginButtonProps> = ({
  providerKey,
  providerName,
  onClick,
  loading,
}) => {
  const style = PROVIDER_ICONS[providerKey] || { bg: "bg-slate-700 hover:bg-slate-600", text: "text-white", label: "?" };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 ${style.bg} ${style.text}`}
    >
      <span className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center text-xs font-bold shrink-0">
        {style.label}
      </span>
      <span>{loading ? "Redirecting..." : `Continue with ${providerName}`}</span>
    </button>
  );
};
