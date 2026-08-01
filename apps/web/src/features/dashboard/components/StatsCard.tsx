import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "emerald" | "blue" | "amber" | "rose";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "emerald",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "blue":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "rose":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "emerald":
      default:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start justify-between">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="text-2xl font-bold text-white tracking-tight">
          {value}
        </div>
        {description && (
          <p className="text-xs text-slate-400">{description}</p>
        )}
        {trend && (
          <span className="inline-block text-[11px] font-semibold text-emerald-400">
            {trend}
          </span>
        )}
      </div>

      <div className={`p-3 rounded-xl border ${getVariantStyles()}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
