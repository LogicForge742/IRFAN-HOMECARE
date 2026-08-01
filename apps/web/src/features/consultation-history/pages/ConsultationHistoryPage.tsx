import { useMedicalRecords } from "@/features/medical-records/hooks/useMedicalRecords";
import { Link } from "react-router-dom";
import { ClipboardList, FileText, Calendar, ArrowRight } from "lucide-react";

export default function ConsultationHistoryPage() {
  const { data, isLoading } = useMedicalRecords();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading consultation records...
      </div>
    );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <ClipboardList className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Consultation Records
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Complete history of all patient consultations, clinical notes, and prescribed treatments
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>ID</span>
          <span>Diagnosis</span>
          <span>Date</span>
          <span>Details</span>
        </div>

        {data && data.length > 0 ? (
          data.map((record) => (
            <div
              key={record.id}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition items-center"
            >
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
                <FileText className="w-4 h-4" />
                <span>#{record.id}</span>
              </span>

              <div>
                <p className="text-sm text-white font-medium truncate">
                  {record.diagnosis}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {record.prescriptions.length} prescriptions • {record.documents.length} attachments
                </p>
              </div>

              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{record.created_at}</span>
              </span>

              <Link
                to={`/medical-records/${record.id}`}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-slate-400">
            No consultation records found.
          </div>
        )}
      </div>
    </div>
  );
}
