import type { LoginFormData } from "../schemas/login.schema";
import type { RegisterFormData } from "../schemas/register.schema";

export type LoginRequest = LoginFormData;
export type RegisterRequest = Omit<RegisterFormData, "confirmPassword">;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "patient" | "doctor" | "professional" | "admin";
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}