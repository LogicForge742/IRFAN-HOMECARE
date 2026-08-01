import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/utils/charts/chart-colors";
import type { ProfessionalAnalytic } from "../types/analytics";

interface ProfessionalChartProps {
  data: ProfessionalAnalytic[];
  loading?: boolean;
}

export const ProfessionalChart: React.FC<ProfessionalChartProps> = ({ data, loading = false }) => {
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
        <h3 className="text-lg font-bold text-white">Top Professionals Activity</h3>
        <p className="text-xs text-slate-400">Consultations completed by specialist</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px" }}
              labelClassName="text-slate-400 text-xs font-semibold"
            />
            <Bar dataKey="appointments_count" name="Appointments" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default ProfessionalChart;
