import { apiClient } from "@/infrastructure/api/client";

export interface AppointmentItem {
    id: string | number;
    caregiver: string;
    role: string;
    date: string;
    time: string;
    status: string;
}

export async function fetchPatientAppointments(): Promise<AppointmentItem[]> {
    try {
        const response = await apiClient.get("/api/appointments/");
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data.map((item: any) => ({
                id: item.id,
                caregiver: item.caregiver || item.professional_name || "Assigned Specialist",
                role: item.service_type || item.role || "Home Medical Visit",
                date: item.scheduled_date || item.date || "Scheduled",
                time: item.time_slot || item.time || "9:00 AM - 12:00 PM",
                status: item.status || "Pending Approval"
            }));
        }
    } catch (err) {
        console.warn("API request fallback to active session state:", err);
    }
    return [];
}
