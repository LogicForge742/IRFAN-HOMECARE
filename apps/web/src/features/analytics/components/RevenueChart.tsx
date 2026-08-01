import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/utils/charts/chart-colors";
import { CHART_FORMATTERS } from "@/utils/charts/chart-formatters";
import type { RevenueTrend } from "../types/analytics";

interface RevenueChartProps {
  data: RevenueTrend[];
  loading?: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-80 animate-pulse flex flex-col justify-between">
        <div className="w-24 h-4 bg-slate-800 rounded" />
        <div className="w-full h-48 bg-slate-800/40 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Revenue Trend</h3>
        <p className="text-xs text-slate-400">Monthly payment collection history</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={CHART_FORMATTERS.number} />
            <Tooltip
              contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px" }}
              labelClassName="text-slate-400 text-xs font-semibold"
              formatter={(val: any) => [CHART_FORMATTERS.currency(Number(val || 0)), "Revenue"]}
            />
            <Area type="monotone" dataKey="amount" stroke={CHART_COLORS.primary} strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default RevenueChart;
