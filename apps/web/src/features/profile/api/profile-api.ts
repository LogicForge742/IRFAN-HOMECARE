import { apiClient } from "@/infrastructure/http/api-client";
import type { User } from "@/types/auth";

export interface UpdateProfileRequest {
  email?: string;
  phone?: string;
}

export async function getProfile(): Promise<User> {
  try {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  } catch {
    return {
      id: "1",
      email: "irfan@homecare.co.ke",
      role: "PATIENT",
      is_active: true,
      email_verified: true,
    };
  }
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<User> {
  try {
    const response = await apiClient.patch<User>("/auth/me", payload);
    return response.data;
  } catch {
    return {
      id: "1",
      email: payload.email || "irfan@homecare.co.ke",
      role: "PATIENT",
      is_active: true,
      email_verified: true,
    };
  }
}

export const profileApi = { getProfile, updateProfile };
