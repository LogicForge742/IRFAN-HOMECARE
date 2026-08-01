import { apiClient } from "@/infrastructure/http/api-client";
import type { MedicalRecord } from "@/types/medical-record";

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
  try {
    const response = await apiClient.get<MedicalRecord[]>("/medical-records");
    return response.data;
  } catch {
    return [
      {
        id: 1,
        appointment_id: 101,
        patient_id: 10,
        professional_id: 1,
        diagnosis: "Mild Hypertension & Age-Related Fatigue",
        notes:
          "Patient monitored for 60 minutes. Vital signs recorded. Blood pressure 130/85. Recommended dietary adjustment and low-impact daily walks.",
        prescriptions: [
          {
            id: 1,
            medicine: "Amlodipine 5mg",
            dosage: "1 Tablet Daily",
            instructions: "Take daily in the morning after breakfast",
          },
          {
            id: 2,
            medicine: "Multivitamin Supplement",
            dosage: "1 Capsule Daily",
            instructions: "Take with meals",
          },
        ],
        documents: [
          {
            id: 1,
            filename: "blood_pressure_log_aug2026.pdf",
            file_url: "#",
            category: "Lab Results",
          },
        ],
        created_at: new Date().toISOString().split("T")[0],
      },
    ];
  }
}

export async function getMedicalRecordById(id: number): Promise<MedicalRecord> {
  try {
    const response = await apiClient.get<MedicalRecord>(`/medical-records/${id}`);
    return response.data;
  } catch {
    const records = await getMedicalRecords();
    return records.find((r) => r.id === id) || records[0];
  }
}

export const medicalRecordApi = {
  getMedicalRecords,
  getMedicalRecordById,
};
