import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { getRedirectPath } from "../utils";

export function useLogin() {
    const navigate = useNavigate();

    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            setAuth(
                data.user,
                data.accessToken,
                data.refreshToken
            );

            navigate(getRedirectPath(data.user), {
                replace: true,
            });
        },

        onError: (error) => {
            console.error("Login failed", error);
        },
    });
}