import { apiClient, ENDPOINTS } from "@/infrastructure/api";

export interface ProfessionalDashboardData {
    today: number;
    pending: number;
    confirmed: number;
    completed: number;
    today_appointments: Array<{
        id: string;
        patient_id: string;
        patient_name: string;
        appointment_time: string;
        status: string;
    }>;
}

export interface ProfessionalProfile {
    id: string;
    user_id: string;
    license_number: string;
    specialization: string;
    qualification: string;
    years_of_experience: number;
    phone_number: string;
    consultation_fee: number;
    verification_status: "pending" | "approved" | "rejected";
    bio?: string | null;
}

export const getProfessionalDashboard = async (): Promise<ProfessionalDashboardData> => {
    const response = await apiClient.get<ProfessionalDashboardData>(
        ENDPOINTS.dashboard.professional
    );
    return response.data;
};

export const getProfessionalProfile = async (): Promise<ProfessionalProfile> => {
    const response = await apiClient.get<{ data: ProfessionalProfile }>(
        "/professionals/profile"
    );
    return response.data.data;
};
