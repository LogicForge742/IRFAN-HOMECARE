import { useQuery } from "@tanstack/react-query";
import { getProfessionalDashboard, getProfessionalProfile } from "../api/dashboard.api";

export function useProfessionalDashboard() {
    return useQuery({
        queryKey: ["professional_dashboard"],
        queryFn: getProfessionalDashboard,
        staleTime: 1000 * 30, // 30 seconds
        refetchOnWindowFocus: true
    });
}

export function useProfessionalProfile() {
    return useQuery({
        queryKey: ["professional_profile"],
        queryFn: getProfessionalProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
