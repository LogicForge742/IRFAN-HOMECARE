import type { User } from "../types/auth.types";
import { PATHS } from "@/routes/paths";

export function getRedirectPath(user?: User | null): string {
    if (!user || !user.role) {
        return PATHS.auth.login;
    }

    switch (user.role) {
        case "patient":
            return PATHS.patient.dashboard;

        case "doctor":
        case "professional":
            return PATHS.provider.dashboard;

        case "admin":
            return PATHS.admin.dashboard;

        default:
            return PATHS.auth.login;
    }
}