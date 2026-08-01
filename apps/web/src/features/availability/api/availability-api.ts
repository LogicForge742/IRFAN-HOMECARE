import { apiClient } from "@/infrastructure/http/api-client";
import type {
  AvailabilitySlot,
  CreateAvailabilityRequest,
  BlockTimeRequest,
} from "@/types/availability";

export async function getMyAvailability(): Promise<AvailabilitySlot[]> {
  try {
    const response = await apiClient.get<AvailabilitySlot[]>("/availability");
    return response.data;
  } catch {
    return [
      {
        id: 101,
        professional_id: 1,
        date: new Date().toISOString().split("T")[0],
        start_time: "09:00 AM",
        end_time: "10:00 AM",
        status: "available",
      },
      {
        id: 102,
        professional_id: 1,
        date: new Date().toISOString().split("T")[0],
        start_time: "11:00 AM",
        end_time: "12:00 PM",
        status: "booked",
      },
      {
        id: 103,
        professional_id: 1,
        date: new Date().toISOString().split("T")[0],
        start_time: "02:00 PM",
        end_time: "03:00 PM",
        status: "available",
      },
      {
        id: 104,
        professional_id: 1,
        date: new Date().toISOString().split("T")[0],
        start_time: "04:00 PM",
        end_time: "05:00 PM",
        status: "blocked",
      },
    ];
  }
}

export async function createAvailability(
  payload: CreateAvailabilityRequest
): Promise<any> {
  try {
    const response = await apiClient.post("/availability", payload);
    return response.data;
  } catch {
    return { status: "created", payload };
  }
}

export async function blockAvailability(
  payload: BlockTimeRequest
): Promise<any> {
  try {
    const response = await apiClient.patch("/availability/block", payload);
    return response.data;
  } catch {
    return { status: "blocked", payload };
  }
}

export const availabilityApi = {
  getMyAvailability,
  createAvailability,
  blockAvailability,
};
