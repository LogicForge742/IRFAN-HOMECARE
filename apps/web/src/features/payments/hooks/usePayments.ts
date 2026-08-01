import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPayments, initiateMpesaPayment } from "../api/payment-api";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
}

export function useMpesaPayment() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: initiateMpesaPayment,
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
}
