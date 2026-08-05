import { loginRequest, registerRequest } from "../api/auth.api";
import type { LoginFormData } from "../schemas/login.schema";
import type { RegisterRequest } from "../types/auth.types";

export async function login(data: LoginFormData) {
    return loginRequest(data);
}

export async function register(data: RegisterRequest) {
    return registerRequest(data);
}