import React from "react";
import { CircleDollarSign, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { CHART_FORMATTERS } from "@/utils/charts/chart-formatters";
import type { PaymentTransaction } from "../types/analytics";

interface RecentPaymentsProps {
  data: PaymentTransaction[];
  loading?: boolean;
}

export const RecentPayments: React.FC<RecentPaymentsProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl animate-pulse h-60" />
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "pending":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <XCircle className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Recent Payments</h3>
          <p className="text-xs text-slate-400">Latest financial activities</p>
        </div>
        <CircleDollarSign className="w-5 h-5 text-blue-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="pb-3 pr-4">Reference</th>
              <th className="pb-3 px-4">Patient</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-800/10 transition-colors">
                <td className="py-3 pr-4 font-semibold text-slate-200">{tx.reference}</td>
                <td className="py-3 px-4 text-slate-300">{tx.patient_name}</td>
                <td className="py-3 px-4 flex items-center space-x-1.5 mt-0.5">
                  {getStatusIcon(tx.status)}
                  <span className="text-xs capitalize">{tx.status}</span>
                </td>
                <td className="py-3 pl-4 text-right font-bold text-white">
                  {CHART_FORMATTERS.currency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentPayments;
