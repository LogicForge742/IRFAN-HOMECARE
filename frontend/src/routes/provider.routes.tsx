import type { RouteObject } from "react-router-dom";

import { ProviderLayout } from "@/layouts";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import { AuthGuard } from "./AuthGuard";
import { RoleGuard } from "./RoleGuard";
import { PATHS } from "./paths";

export const providerRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                element: (
                    <RoleGuard
                        allowedRoles={["doctor", "professional"]}
                    />
                ),
                children: [
                    {
                        element: <ProviderLayout />,
                        children: [
                            {
                                path: PATHS.provider.dashboard,
                                element: <DashboardPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
