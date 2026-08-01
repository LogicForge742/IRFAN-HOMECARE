export interface Prescription {
  id: number;
  medicine: string;
  dosage: string;
  instructions: string;
}

export interface MedicalDocument {
  id: number;
  filename: string;
  file_url: string;
  category: string;
}

export interface MedicalRecord {
  id: number;
  appointment_id: number;
  patient_id: number;
  professional_id: number;
  diagnosis: string;
  notes: string;
  prescriptions: Prescription[];
  documents: MedicalDocument[];
  created_at: string;
}
