export interface PrescriptionInput {
  medicine: string;
  dosage: string;
  instructions: string;
}

export interface ConsultationRequest {
  appointment_id: number;
  diagnosis: string;
  notes: string;
  prescriptions: PrescriptionInput[];
}

export interface ConsultationResponse {
  id: number;
  appointment_id: number;
  diagnosis: string;
  notes: string;
  created_at: string;
}
