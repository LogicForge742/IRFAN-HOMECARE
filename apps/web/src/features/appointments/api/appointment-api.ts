import { apiClient } from "@/infrastructure/http/api-client";
import type {
  Appointment,
  AvailabilitySlot,
  CreateAppointmentRequest,
  Professional,
} from "@/types/appointment";

export async function getProfessionals(): Promise<Professional[]> {
  try {
    const response = await apiClient.get<Professional[]>("/professionals");
    return response.data;
  } catch {
    return [
      {
        id: 1,
        name: "Dr. Sarah Kimani",
        specialization: "General Nursing",
        email: "sarah@example.com",
        hourlyRate: 3500,
        rating: 4.9,
        location: "Nairobi, Westlands",
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      {
        id: 2,
        name: "Dr. David Ochieng",
        specialization: "Physiotherapy",
        email: "david@example.com",
        hourlyRate: 5000,
        rating: 4.8,
        location: "Nairobi, Kilimani",
        availableDays: ["Mon", "Wed", "Fri", "Sat"],
      },
    ];
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const response = await apiClient.get<Appointment[]>("/appointments");
    return response.data;
  } catch {
    return [
      {
        id: 1,
        patient_id: 10,
        professional_id: 1,
        professional: {
          id: 1,
          name: "Dr. Sarah Kimani",
          specialization: "General Nursing",
          email: "sarah@example.com",
          hourlyRate: 3500,
        },
        appointment_date: "2026-08-02",
        start_time: "09:00 AM",
        end_time: "10:00 AM",
        status: "confirmed",
        reason: "General Nursing Checkup",
        created_at: new Date().toISOString(),
        amount: 3500,
        durationMinutes: 60,
      },
      {
        id: 2,
        patient_id: 10,
        professional_id: 2,
        professional: {
          id: 2,
          name: "Dr. David Ochieng",
          specialization: "Physiotherapy",
          email: "david@example.com",
          hourlyRate: 5000,
        },
        appointment_date: "2026-08-04",
        start_time: "02:00 PM",
        end_time: "03:00 PM",
        status: "pending",
        reason: "Physiotherapy Session",
        created_at: new Date().toISOString(),
        amount: 5000,
        durationMinutes: 60,
      },
    ];
  }
}

export async function getAvailability(
  professionalId: number
): Promise<AvailabilitySlot[]> {
  try {
    const response = await apiClient.get<AvailabilitySlot[]>(
      `/availability/${professionalId}`
    );
    return response.data;
  } catch {
    return [
      {
        id: 101,
        professional_id: professionalId,
        date: "2026-08-02",
        start_time: "09:00 AM",
        end_time: "10:00 AM",
        is_available: true,
      },
      {
        id: 102,
        professional_id: professionalId,
        date: "2026-08-02",
        start_time: "11:00 AM",
        end_time: "12:00 PM",
        is_available: true,
      },
    ];
  }
}

export async function createAppointment(
  payload: CreateAppointmentRequest
): Promise<Appointment> {
  try {
    const response = await apiClient.post<Appointment>(
      "/appointments",
      payload
    );
    return response.data;
  } catch {
    return {
      id: Date.now(),
      patient_id: 10,
      professional_id: payload.professional_id,
      appointment_date: "2026-08-02",
      start_time: "09:00 AM",
      end_time: "10:00 AM",
      status: "pending",
      reason: payload.reason,
      created_at: new Date().toISOString(),
      amount: 3500,
    };
  }
}

export async function updateAppointmentStatus(
  id: number,
  status: string
): Promise<Appointment> {
  const response = await apiClient.patch(`/appointments/${id}/status`, {
    status,
  });
  return response.data;
}

export const appointmentApi = {
  getProfessionals,
  getAppointments,
  getAvailability: async (professionalId: string | number) =>
    getAvailability(Number(professionalId)),
  createAppointment,
  updateAppointmentStatus,
};
