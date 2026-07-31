import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers";
import { queryClient } from "./query-client";


interface ProvidersProps {
    children: ReactNode;
}


export function Providers({ children }: ProvidersProps) {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>

                <Toaster
                    position="top-center"
                    richColors
                />
            </QueryClientProvider>
        </HelmetProvider>
    );
}