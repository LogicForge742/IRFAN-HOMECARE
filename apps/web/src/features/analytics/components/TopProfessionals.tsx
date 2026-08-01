import React from "react";
import { User, Award } from "lucide-react";
import type { ProfessionalAnalytic } from "../types/analytics";

interface TopProfessionalsProps {
  data: ProfessionalAnalytic[];
  loading?: boolean;
}

export const TopProfessionals: React.FC<TopProfessionalsProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl animate-pulse h-60" />
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Top Professionals</h3>
          <p className="text-xs text-slate-400">Most active healthcare specialists</p>
        </div>
        <Award className="w-5 h-5 text-emerald-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="pb-3 pr-4">Professional</th>
              <th className="pb-3 px-4">Specialization</th>
              <th className="pb-3 pl-4 text-right">Consultations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((prof) => (
              <tr key={prof.id} className="hover:bg-slate-800/10 transition-colors">
                <td className="py-3 pr-4 flex items-center space-x-3">
                  <div className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white">{prof.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-400">{prof.specialization}</td>
                <td className="py-3 pl-4 text-right font-bold text-emerald-400">{prof.appointments_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TopProfessionals;
