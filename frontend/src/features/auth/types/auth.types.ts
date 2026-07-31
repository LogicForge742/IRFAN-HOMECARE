import type { LoginFormData } from "../schemas/login.schema";

export type LoginRequest = LoginFormData;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "patient" | "doctor" | "admin";
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}