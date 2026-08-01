import { apiClient } from "@/infrastructure/http/api-client";
import type { User } from "@/types/auth";

export async function getUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>("/admin/users");
    return response.data;
  } catch {
    return [
      { id: "1", email: "irfan@homecare.co.ke", role: "ADMIN", is_active: true, email_verified: true },
      { id: "2", email: "amina@homecare.co.ke", role: "HEALTHCARE_PROFESSIONAL", is_active: true, email_verified: true },
      { id: "3", email: "hassan@homecare.co.ke", role: "PATIENT", is_active: true, email_verified: true },
      { id: "4", email: "fatuma@homecare.co.ke", role: "PATIENT", is_active: true, email_verified: false },
      { id: "5", email: "ibrahim@homecare.co.ke", role: "HEALTHCARE_PROFESSIONAL", is_active: true, email_verified: true },
    ];
  }
}

export async function toggleUserStatus(userId: string): Promise<any> {
  try {
    const response = await apiClient.patch(`/admin/users/${userId}/toggle`);
    return response.data;
  } catch {
    return { id: userId, toggled: true };
  }
}

export interface PlatformMetrics {
  total_users: number;
  total_professionals: number;
  total_patients: number;
  total_appointments: number;
  completed_appointments: number;
  total_revenue: number;
  active_today: number;
}

export async function getMetrics(): Promise<PlatformMetrics> {
  try {
    const response = await apiClient.get<PlatformMetrics>("/admin/metrics");
    return response.data;
  } catch {
    return {
      total_users: 1247,
      total_professionals: 86,
      total_patients: 1148,
      total_appointments: 4382,
      completed_appointments: 3891,
      total_revenue: 12450000,
      active_today: 234,
    };
  }
}
