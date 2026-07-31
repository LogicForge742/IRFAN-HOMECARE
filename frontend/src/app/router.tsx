import { createBrowserRouter } from "react-router-dom";

import {
    authRoutes,
    protectedRoutes,
} from "@/routes";
import { PublicLayout } from "@/layouts";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [],
    },

    ...authRoutes,
    ...protectedRoutes,

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);