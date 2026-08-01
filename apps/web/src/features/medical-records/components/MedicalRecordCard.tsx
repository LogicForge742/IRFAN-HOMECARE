import type { MedicalRecord } from "@/types/medical-record";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  record: MedicalRecord;
}

export default function MedicalRecordCard({ record }: Props) {
  return (
    <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900 shadow-xl space-y-3 hover:border-slate-700 transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Medical Visit #{record.id}</span>
          </h3>
          <p className="text-sm font-semibold text-emerald-400 mt-1">
            Diagnosis: {record.diagnosis}
          </p>
        </div>
        <Link
          to={`/medical-records/${record.id}`}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-300 hover:text-white transition"
        >
          <span>View Full Summary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex items-center space-x-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Recorded: {record.created_at}</span>
        </span>
        <span>{record.prescriptions.length} Prescriptions</span>
        <span>{record.documents.length} Attachments</span>
      </div>
    </div>
  );
}
