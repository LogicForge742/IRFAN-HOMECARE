import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PATHS } from "./paths";

export function AuthGuard() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return (
            <Navigate
                to={PATHS.auth.login}
                replace
            />
        );
    }

    return <Outlet />;
}