import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentApi } from "../api/appointment-api";
import type { CreateAppointmentRequest } from "@/types/appointment";
import { toast } from "sonner";

export const useAppointments = () => {
  const queryClient = useQueryClient();

  const appointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentApi.getAppointments(),
  });

  const professionalsQuery = useQuery({
    queryKey: ["professionals"],
    queryFn: () => appointmentApi.getProfessionals(),
  });

  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentRequest) =>
      appointmentApi.createAppointment(data),
    onSuccess: async (appointment, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment created! Triggering M-Pesa payment prompt...");

      try {
        await appointmentApi.initiateMpesaPayment(
          appointment.id,
          variables.phoneNumber,
          appointment.amount
        );
        toast.info(
          `M-Pesa STK Push sent to ${variables.phoneNumber}. Enter PIN to confirm payment.`
        );
      } catch {
        toast.error("Failed to send M-Pesa push prompt. Please retry payment.");
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Failed to create appointment";
      toast.error(msg);
    },
  });

  return {
    appointments: appointmentsQuery.data || [],
    isLoadingAppointments: appointmentsQuery.isLoading,
    professionals: professionalsQuery.data || [],
    isLoadingProfessionals: professionalsQuery.isLoading,
    createAppointment: createAppointmentMutation.mutateAsync,
    isBooking: createAppointmentMutation.isPending,
  };
};
