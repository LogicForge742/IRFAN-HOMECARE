export const API = {
    BASE_URL: import.meta.env.VITE_API_URL,

    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/logout",
        PROFILE: "/auth/me",
    },
} as const;