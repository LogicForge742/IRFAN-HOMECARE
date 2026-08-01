export type UserRole = "PATIENT" | "HEALTHCARE_PROFESSIONAL" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  email_verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  message: string;
  access_token?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}
