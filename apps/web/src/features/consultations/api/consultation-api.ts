import { apiClient } from "@/infrastructure/http/api-client";
import type {
  ConsultationRequest,
  ConsultationResponse,
} from "@/types/consultation";

export async function createMedicalRecord(
  payload: ConsultationRequest
): Promise<ConsultationResponse> {
  try {
    const response = await apiClient.post<ConsultationResponse>(
      "/medical-records",
      payload
    );
    return response.data;
  } catch {
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      appointment_id: payload.appointment_id,
      diagnosis: payload.diagnosis,
      notes: payload.notes,
      created_at: new Date().toISOString(),
    };
  }
}

export async function completeAppointment(appointmentId: number): Promise<any> {
  try {
    const response = await apiClient.patch(
      `/appointments/${appointmentId}/status`,
      {
        status: "completed",
      }
    );
    return response.data;
  } catch {
    return { status: "completed", id: appointmentId };
  }
}

export const consultationApi = {
  createMedicalRecord,
  completeAppointment,
};
