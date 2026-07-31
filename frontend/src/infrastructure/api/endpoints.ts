export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
        register: "/auth/register",
        refresh: "/auth/refresh",
        me: "/auth/me",
    },

    patients: {
        all: "/patients",
        byId: (id: string) => `/patients/${id}`,
    },

    caregivers: {
        all: "/caregivers",
        byId: (id: string) => `/caregivers/${id}`,
    },

    appointments: {
        all: "/appointments",
        byId: (id: string) => `/appointments/${id}`,
    },

    dashboard: {
        summary: "/dashboard",
    },
} as const;