import { apiClient, ENDPOINTS } from "@/infrastructure/api";

import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../types";

export interface PatientProfilePayload {
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    blood_group?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_notes?: string;
}

export interface ProfessionalProfilePayload {
    phone_number: string;
    license_number: string;
    specialization: string;
    qualification: string;
    years_of_experience: number;
    consultation_fee: number;
    bio?: string | null;
}

export const loginRequest = async (
    payload: LoginRequest
): Promise<AuthResponse> => {
    const response = await apiClient.post(
        ENDPOINTS.auth.login,
        payload
    );

    const resData = response.data?.data || response.data;
    const rawUser = resData?.user || {};

    return {
        accessToken: resData?.access_token || resData?.accessToken || "",
        refreshToken: resData?.refresh_token || resData?.refreshToken || "",
        user: {
            id: rawUser.id || "",
            firstName: rawUser.first_name || rawUser.firstName || "",
            lastName: rawUser.last_name || rawUser.lastName || "",
            email: rawUser.email || "",
            role: rawUser.role || "patient",
        },
    };
};

export const registerRequest = async (
    payload: RegisterRequest
): Promise<AuthResponse> => {
    const response = await apiClient.post(
        ENDPOINTS.auth.register,
        payload
    );

    const resData = response.data?.data || response.data;
    const rawUser = resData?.user || {};

    return {
        accessToken: resData?.access_token || resData?.accessToken || "",
        refreshToken: resData?.refresh_token || resData?.refreshToken || "",
        user: {
            id: rawUser.id || "",
            firstName: rawUser.first_name || rawUser.firstName || "",
            lastName: rawUser.last_name || rawUser.lastName || "",
            email: rawUser.email || "",
            role: rawUser.role || "patient",
        },
    };
};

export const createPatientProfile = async (
    token: string,
    payload: PatientProfilePayload
): Promise<any> => {
    const response = await apiClient.post(
        "/patients/profile",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const createProfessionalProfile = async (
    token: string,
    payload: ProfessionalProfilePayload
): Promise<any> => {
    const response = await apiClient.post(
        "/professionals/profile",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};