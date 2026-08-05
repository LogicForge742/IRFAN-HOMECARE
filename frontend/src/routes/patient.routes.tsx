import type { RouteObject } from "react-router-dom";

import { PatientLayout } from "@/layouts";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import { AuthGuard } from "./AuthGuard";
import { RoleGuard } from "./RoleGuard";
import { PATHS } from "./paths";

export const patientRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                element: (
                    <RoleGuard
                        allowedRoles={["patient"]}
                    />
                ),

                children: [
                    {
                        element: <PatientLayout />,

                        children: [
                            {
                                path: PATHS.patient.dashboard,
                                element: <DashboardPage />,
                            },
                            {
                                path: PATHS.patient.appointments,
                                element: <DashboardPage />,
                            },
                            {
                                path: PATHS.patient.payments,
                                element: <DashboardPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];