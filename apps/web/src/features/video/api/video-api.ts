import { apiClient } from "@/infrastructure/http/api-client";

export interface VideoSessionData {
  id: string;
  appointment_id: string;
  room_id: string;
  patient_id: string;
  professional_id: string;
  status: "scheduled" | "active" | "completed";
  started_at?: string;
  ended_at?: string;
  duration?: number;
  created_at: string;
}

export async function createVideoRoom(appointmentId: string): Promise<VideoSessionData> {
  const response = await apiClient.post<{ data: VideoSessionData }>("/video/create-room", {
    appointment_id: appointmentId,
  });
  return response.data.data;
}

export async function getVideoRoom(roomId: string): Promise<VideoSessionData> {
  const response = await apiClient.get<{ data: VideoSessionData }>(`/video/${roomId}`);
  return response.data.data;
}

export async function joinVideoRoom(roomId: string): Promise<VideoSessionData> {
  const response = await apiClient.post<{ data: VideoSessionData }>("/video/join", {
    room_id: roomId,
  });
  return response.data.data;
}

export async function endVideoRoom(roomId: string): Promise<VideoSessionData> {
  const response = await apiClient.post<{ data: VideoSessionData }>("/video/end", {
    room_id: roomId,
  });
  return response.data.data;
}
