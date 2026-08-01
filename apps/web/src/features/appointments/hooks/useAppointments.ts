import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAppointments,
  createAppointment,
  getProfessionals,
} from "../api/appointment-api";

export function useAppointments() {
  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const professionalsQuery = useQuery({
    queryKey: ["professionals"],
    queryFn: getProfessionals,
  });

  const createMutation = useCreateAppointment();

  return {
    ...query,
    appointments: query.data || [],
    isLoadingAppointments: query.isLoading,
    professionals: professionalsQuery.data || [],
    isLoadingProfessionals: professionalsQuery.isLoading,
    createAppointment: createMutation.mutateAsync,
    isBooking: createMutation.isPending,
  };
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}
