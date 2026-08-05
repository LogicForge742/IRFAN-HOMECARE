import type { RouteObject } from "react-router-dom";

import { DashboardLayout } from "@/layouts";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import { AuthGuard } from "./AuthGuard";
import { PATHS } from "./paths";

export const protectedRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: PATHS.dashboard,
                        element: <DashboardPage />,
                    },
                ],
            },
        ],
    },
];