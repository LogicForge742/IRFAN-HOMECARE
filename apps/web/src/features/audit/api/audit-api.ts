import { apiClient } from "@/infrastructure/http/api-client";

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  resource_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: any;
  created_at: string;
}

export interface AuditLogsResponse {
  status: string;
  data: {
    items: AuditLog[];
    metadata: {
      page: number;
      per_page: number;
      total: number;
      pages: number;
    };
  };
}

export const auditApi = {
  getLogs: async (params?: Record<string, any>): Promise<AuditLogsResponse> => {
    const response = await apiClient.get<AuditLogsResponse>("/audit", { params });
    return response.data;
  },

  getLogById: async (id: string): Promise<{ status: string; data: AuditLog }> => {
    const response = await apiClient.get<{ status: string; data: AuditLog }>(`/audit/${id}`);
    return response.data;
  },

  getLogsByUser: async (userId: string, params?: Record<string, any>): Promise<AuditLogsResponse> => {
    const response = await apiClient.get<AuditLogsResponse>(`/audit/user/${userId}`, { params });
    return response.data;
  },

  exportLogs: async (): Promise<Blob> => {
    const response = await apiClient.get<Blob>("/audit/export", { responseType: "blob" });
    return response.data;
  },

  archiveLogs: async (beforeDate: string): Promise<{ status: string; message: string }> => {
    const response = await apiClient.delete<{ status: string; message: string }>("/audit/archive", {
      data: { before_date: beforeDate },
    });
    return response.data;
  },
};
