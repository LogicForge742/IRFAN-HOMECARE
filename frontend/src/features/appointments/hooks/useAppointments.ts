import { useQuery } from "@tanstack/react-query";
import { fetchPatientAppointments } from "../services/appointment.service";

export function usePatientAppointments() {
    return useQuery({
        queryKey: ["patient_appointments"],
        queryFn: fetchPatientAppointments,
        staleTime: 1000 * 30, // 30 seconds
        refetchOnWindowFocus: true
    });
}
