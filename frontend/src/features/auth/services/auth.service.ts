import { loginRequest } from "../api/auth.api";
import type { LoginFormData } from "../schemas/login.schema";

export async function login(data: LoginFormData) {
    return loginRequest(data);
}