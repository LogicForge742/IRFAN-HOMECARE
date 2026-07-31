export const PATHS = {
    root: "/",

    auth: {
        login: "/login",
        register: "/register",
        forgotPassword: "/forgot-password",
    },

    patient: {
        dashboard: "/patient/dashboard",
        appointments: "/patient/appointments",
        profile: "/patient/profile",
        payments: "/patient/payments",
        reviews: "/patient/reviews",
    },

    provider: {
        dashboard: "/provider/dashboard",
        appointments: "/provider/appointments",
        patients: "/provider/patients",
        schedule: "/provider/schedule",
        earnings: "/provider/earnings",
        profile: "/provider/profile",
    },

    admin: {
        dashboard: "/admin/dashboard",
        users: "/admin/users",
        providers: "/admin/providers",
        patients: "/admin/patients",
        appointments: "/admin/appointments",
        payments: "/admin/payments",
        settings: "/admin/settings",
    },

    unauthorized: "/unauthorized",
} as const;