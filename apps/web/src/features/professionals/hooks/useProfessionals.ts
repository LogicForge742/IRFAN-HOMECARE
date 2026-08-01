import { useQuery } from "@tanstack/react-query";
import { getProfessionals, getProfessionalById } from "../api/professional-api";

export function useProfessionals(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["professionals", params],
    queryFn: () => getProfessionals(params),
  });
}

export function useProfessional(id: number) {
  return useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  });
}
