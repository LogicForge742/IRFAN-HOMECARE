import { apiClient } from "@/infrastructure/http/api-client";

export interface DashboardStats {
  totalAppointments: number;
  completedVisits: number;
  upcomingVisits: number;
  pendingPayments: number;
}

export interface AppointmentSummary {
  id: string;
  professionalName: string;
  patientName: string;
  serviceType: string;
  scheduledAt: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "PENDING";
  amount: number;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get<DashboardStats>("/metrics");
      return response.data;
    } catch {
      // Mock fallback metrics for immediate UI presentation
      return {
        totalAppointments: 12,
        completedVisits: 8,
        upcomingVisits: 3,
        pendingPayments: 1,
      };
    }
  },

  getRecentAppointments: async (): Promise<AppointmentSummary[]> => {
    try {
      const response = await apiClient.get<AppointmentSummary[]>(
        "/appointments/recent"
      );
      return response.data;
    } catch {
      return [
        {
          id: "apt-101",
          professionalName: "Dr. Sarah Kimani",
          patientName: "John Doe",
          serviceType: "General Nursing Checkup",
          scheduledAt: "2026-08-02 10:00 AM",
          status: "SCHEDULED",
          amount: 3500,
        },
        {
          id: "apt-102",
          professionalName: "Dr. David Ochieng",
          patientName: "John Doe",
          serviceType: "Physiotherapy Session",
          scheduledAt: "2026-08-04 02:30 PM",
          status: "PENDING",
          amount: 5000,
        },
        {
          id: "apt-103",
          professionalName: "Nurse Grace Wanjiku",
          patientName: "John Doe",
          serviceType: "Post-Operative Wound Care",
          scheduledAt: "2026-07-28 11:15 AM",
          status: "COMPLETED",
          amount: 2800,
        },
      ];
    }
  },
};
