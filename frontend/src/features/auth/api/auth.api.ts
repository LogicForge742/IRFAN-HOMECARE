import { apiClient, ENDPOINTS } from "@/infrastructure/api";

import type {
    LoginRequest,
    AuthResponse,
} from "../types";


export const loginRequest = async (
    payload: LoginRequest
): Promise<AuthResponse> => {

    const response = await apiClient.post<AuthResponse>(
        ENDPOINTS.auth.login,
        payload
    );

    return response.data;
};