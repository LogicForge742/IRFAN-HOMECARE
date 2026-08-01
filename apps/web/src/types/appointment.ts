export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Professional {
  id: number;
  name: string;
  specialization: string;
  email: string;
  hourlyRate?: number;
  rating?: number;
  location?: string;
  availableDays?: string[];
}

export type HealthcareProfessional = Professional;

export interface AvailabilitySlot {
  id: number;
  professional_id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Appointment {
  id: number;
  patient_id: number;
  professional_id: number;
  professional?: Professional;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  reason?: string;
  created_at: string;
  amount?: number;
  durationMinutes?: number;
  notes?: string;
}

export interface CreateAppointmentRequest {
  professional_id: number;
  availability_id: number;
  reason: string;
  phoneNumber?: string;
}
