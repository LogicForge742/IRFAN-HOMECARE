import { createBrowserRouter } from "react-router-dom";

import {
    publicRoutes,
    authRoutes,
    patientRoutes,
    providerRoutes,
    adminRoutes,
    protectedRoutes,
} from "@/routes";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

export const router = createBrowserRouter([
    ...publicRoutes,
    ...authRoutes,
    ...patientRoutes,
    ...providerRoutes,
    ...adminRoutes,
    ...protectedRoutes,

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);