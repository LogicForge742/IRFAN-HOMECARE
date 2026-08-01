import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMedicalRecord,
  completeAppointment,
} from "../api/consultation-api";

export function useCreateMedicalRecord() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createMedicalRecord,
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["medical-records"],
      });
    },
  });
}

export function useCompleteAppointment() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: completeAppointment,
    onSuccess() {
      client.invalidateQueries();
    },
  });
}
