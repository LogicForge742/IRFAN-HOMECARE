import { apiClient } from "@/infrastructure/http/api-client";

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: "appointment" | "payment" | "system" | "record";
  is_read: boolean;
  created_at: string;
}

export async function getNotifications(): Promise<AppNotification[]> {
  try {
    const response = await apiClient.get<AppNotification[]>("/notifications");
    return response.data;
  } catch {
    return [
      { id: 1, title: "Appointment Confirmed", message: "Your home care visit with Dr. Osman is confirmed for tomorrow at 09:00 AM.", type: "appointment", is_read: false, created_at: new Date().toISOString() },
      { id: 2, title: "M-Pesa Payment Received", message: "Payment of KES 3,500 received successfully. Reference: QKL7A2B8NM.", type: "payment", is_read: false, created_at: new Date().toISOString() },
      { id: 3, title: "Medical Record Updated", message: "A new clinical record has been added following your consultation.", type: "record", is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 4, title: "System Maintenance", message: "Scheduled system maintenance on Sunday 03:00 AM – 05:00 AM EAT.", type: "system", is_read: true, created_at: new Date(Date.now() - 172800000).toISOString() },
    ];
  }
}

export async function markAsRead(id: number): Promise<any> {
  try {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  } catch {
    return { id, is_read: true };
  }
}
