import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PATHS } from "./paths";

interface RoleGuardProps {
    allowedRoles: Array<"admin" | "doctor" | "patient" | "professional">;
}

export function RoleGuard({
    allowedRoles,
}: RoleGuardProps) {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return (
            <Navigate
                to={PATHS.auth.login}
                replace
            />
        );
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to={PATHS.unauthorized}
                replace
            />
        );
    }

    return <Outlet />;
}