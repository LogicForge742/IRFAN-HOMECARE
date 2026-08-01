import { useParams, Link } from "react-router-dom";
import { useMedicalRecord } from "../hooks/useMedicalRecords";
import PrescriptionCard from "../components/PrescriptionCard";
import DocumentViewer from "../components/DocumentViewer";
import { ArrowLeft, Calendar, UserCheck, ShieldCheck } from "lucide-react";

export default function MedicalRecordDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: record, isLoading } = useMedicalRecord(Number(id) || 1);

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading record details...
      </div>
    );

  if (!record)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Medical record not found.
      </div>
    );

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        to="/medical-records"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Medical Records</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Record #{record.id}
            </span>
            <h1 className="text-xl font-bold text-white mt-1">
              Diagnosis: {record.diagnosis}
            </h1>
          </div>
          <span className="inline-flex items-center space-x-1 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{record.created_at}</span>
          </span>
        </div>

        {/* Clinical Notes */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Clinical Notes & Observations
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {record.notes}
          </p>
        </div>

        {/* Prescriptions */}
        {record.prescriptions.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Prescribed Medications ({record.prescriptions.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {record.prescriptions.map((p) => (
                <PrescriptionCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {record.documents.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Attached Medical Files ({record.documents.length})
            </h3>
            <DocumentViewer documents={record.documents} />
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted Health Record — HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Attending Professional ID #{record.professional_id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
