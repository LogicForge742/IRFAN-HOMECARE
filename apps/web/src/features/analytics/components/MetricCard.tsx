import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  loading = false,
}) => {
  const isPositive = change >= 0;

  if (loading) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl animate-pulse space-y-3">
        <div className="flex justify-between items-start">
          <div className="w-16 h-3 bg-slate-800 rounded" />
          <div className="w-8 h-8 bg-slate-800 rounded-full" />
        </div>
        <div className="w-24 h-6 bg-slate-800 rounded" />
        <div className="w-20 h-3 bg-slate-800 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
      <div className="flex justify-between items-start">
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-rose-500" />
          )}
          <span className={`text-xs font-bold ${isPositive ? "text-emerald-400" : "text-rose-500"}`}>
            {isPositive ? "+" : ""}{change.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-500">from last month</span>
        </div>
      </div>
    </div>
  );
};
export default MetricCard;
