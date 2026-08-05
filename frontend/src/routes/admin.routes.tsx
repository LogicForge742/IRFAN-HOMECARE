import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "@/layouts";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import { AuthGuard } from "./AuthGuard";
import { RoleGuard } from "./RoleGuard";
import { PATHS } from "./paths";

export const adminRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                element: (
                    <RoleGuard
                        allowedRoles={["admin"]}
                    />
                ),
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            {
                                path: PATHS.admin.dashboard,
                                element: <DashboardPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
