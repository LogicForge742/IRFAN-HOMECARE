import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/utils/charts/chart-colors";

interface PaymentChartProps {
  data: Record<string, number>;
  loading?: boolean;
}

export const PaymentChart: React.FC<PaymentChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-80 animate-pulse flex flex-col justify-between">
        <div className="w-24 h-4 bg-slate-800 rounded" />
        <div className="w-full h-48 bg-slate-800/40 rounded" />
      </div>
    );
  }

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const COLORS: Record<string, string> = {
    Completed: CHART_COLORS.payment.completed,
    Pending: CHART_COLORS.payment.pending,
    Failed: CHART_COLORS.payment.failed,
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Payment Status</h3>
        <p className="text-xs text-slate-400">Distribution of billing transactions</p>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || CHART_COLORS.info} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px" }}
              labelClassName="text-slate-400 text-xs font-semibold"
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PaymentChart;
