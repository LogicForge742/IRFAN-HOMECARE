import React from "react";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface AppointmentSummaryProps {
  data: Record<string, number>;
  loading?: boolean;
}

export const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl animate-pulse h-48" />
    );
  }

  const items = [
    { label: "Completed", value: data.completed || 0, icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
    { label: "Pending Approval", value: data.pending || 0, icon: <AlertCircle className="w-5 h-5 text-amber-500" /> },
    { label: "Cancelled", value: data.cancelled || 0, icon: <XCircle className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Appointment Status</h3>
        <p className="text-xs text-slate-400">Total consultations breakdown</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <div className="flex items-center space-x-2.5">
              {item.icon}
              <span className="text-sm font-semibold text-slate-300">{item.label}</span>
            </div>
            <span className="text-base font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AppointmentSummary;
