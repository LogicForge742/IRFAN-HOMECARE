import type { PrescriptionInput } from "@/types/consultation";
import { Pill, Plus, Trash2 } from "lucide-react";

interface Props {
  prescriptions: PrescriptionInput[];
  setPrescriptions: React.Dispatch<React.SetStateAction<PrescriptionInput[]>>;
}

export default function PrescriptionBuilder({
  prescriptions,
  setPrescriptions,
}: Props) {
  function addPrescription() {
    setPrescriptions((prev) => [
      ...prev,
      {
        medicine: "",
        dosage: "",
        instructions: "",
      },
    ]);
  }

  function removePrescription(index: number) {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  }

  function updateField(
    index: number,
    field: keyof PrescriptionInput,
    val: string
  ) {
    setPrescriptions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
          <Pill className="w-4 h-4 text-emerald-400" />
          <span>Prescribed Medications ({prescriptions.length})</span>
        </label>

        <button
          type="button"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition"
          onClick={addPrescription}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Prescription</span>
        </button>
      </div>

      {prescriptions.length === 0 ? (
        <p className="text-xs text-slate-500 italic p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-center">
          No medications added yet. Click &quot;Add Prescription&quot; to prescribe medications for this visit.
        </p>
      ) : (
        <div className="space-y-3">
          {prescriptions.map((item, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">
                  Item #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removePrescription(index)}
                  className="text-slate-500 hover:text-rose-400 transition"
                  title="Remove Prescription"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Medicine Name (e.g. Paracetamol 500mg)"
                  value={item.medicine}
                  onChange={(e) => updateField(index, "medicine", e.target.value)}
                />
                <input
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Dosage (e.g. 1 Tab 3x Daily)"
                  value={item.dosage}
                  onChange={(e) => updateField(index, "dosage", e.target.value)}
                />
                <input
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Instructions (e.g. Take after meal)"
                  value={item.instructions}
                  onChange={(e) =>
                    updateField(index, "instructions", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
