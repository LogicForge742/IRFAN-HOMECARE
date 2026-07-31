import type { RouteObject } from "react-router-dom";

import { AuthLayout } from "@/layouts";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import { PATHS } from "./paths";

export const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: PATHS.auth.login,
                element: <LoginPage />,
            },
            {
                path: PATHS.auth.register,
                element: <RegisterPage />,
            },
            {
                path: PATHS.auth.forgotPassword,
                element: <ForgotPasswordPage />,
            },
        ],
    },
];