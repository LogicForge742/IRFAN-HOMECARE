import { useMedicalRecords } from "../hooks/useMedicalRecords";
import MedicalRecordCard from "../components/MedicalRecordCard";
import { FileSpreadsheet } from "lucide-react";

export default function MedicalRecordsPage() {
  const { data, isLoading } = useMedicalRecords();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading records...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
          <span>Patient Medical Records</span>
        </h1>
        <p className="text-sm text-slate-400">
          Access clinical consultation summaries, diagnoses, prescriptions, and lab attachments
        </p>
      </div>

      <div className="grid gap-4">
        {data?.map((record) => (
          <MedicalRecordCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}
