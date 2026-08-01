import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/utils/charts/chart-colors";
import type { PatientGrowth } from "../types/analytics";

interface PatientGrowthChartProps {
  data: PatientGrowth[];
  loading?: boolean;
}

export const PatientGrowthChart: React.FC<PatientGrowthChartProps> = ({ data, loading = false }) => {
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
        <h3 className="text-lg font-bold text-white">Patient Growth</h3>
        <p className="text-xs text-slate-400">Monthly patient registration counts</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.info} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.info} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px" }}
              labelClassName="text-slate-400 text-xs font-semibold"
            />
            <Area type="monotone" dataKey="count" name="New Patients" stroke={CHART_COLORS.info} strokeWidth={2.5} fillOpacity={1} fill="url(#growthGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PatientGrowthChart;
