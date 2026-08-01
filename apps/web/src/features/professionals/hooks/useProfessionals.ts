import { useQuery } from "@tanstack/react-query";
import { getProfessionals, getProfessionalById } from "../api/professional-api";
import type { ProfessionalFilterParams } from "@/types/professional";

export function useProfessionals(params?: ProfessionalFilterParams) {
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
