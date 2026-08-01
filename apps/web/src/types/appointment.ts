export type AppointmentStatus =
  | "PENDING"
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED";

export interface HealthcareProfessional {
  id: string;
  name: string;
  specialization: string;
  hourlyRate: number;
  rating: number;
  location: string;
  availableDays: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  serviceType: string;
  scheduledAt: string;
  durationMinutes: number;
  amount: number;
  status: AppointmentStatus;
  notes?: string;
  paymentStatus?: "UNPAID" | "PENDING_MPESA" | "PAID";
  createdAt?: string;
}

export interface CreateAppointmentRequest {
  professionalId: string;
  serviceType: string;
  scheduledAt: string;
  notes?: string;
  phoneNumber: string;
}

export interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
