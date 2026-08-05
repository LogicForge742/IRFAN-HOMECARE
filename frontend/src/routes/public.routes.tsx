import type { RouteObject } from "react-router-dom";

import { PublicLayout } from "@/layouts";
import LandingPage from "@/pages/landing/LandingPage";
import { PATHS } from "./paths";

export const publicRoutes: RouteObject[] = [
    {
        element: <PublicLayout />,
        children: [
            {
                path: PATHS.root,
                element: <LandingPage />,
            },
        ],
    },
];
