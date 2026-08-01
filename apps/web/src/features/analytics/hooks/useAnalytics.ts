import { useQuery } from "@tanstack/react-query";
import * as api from "../api/analytics-api";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: api.getDashboardSummary,
  });
}

export function useRevenueAnalytics() {
  return useQuery({
    queryKey: ["analytics", "revenue"],
    queryFn: api.getRevenueAnalytics,
  });
}

export function usePaymentAnalytics() {
  return useQuery({
    queryKey: ["analytics", "payments"],
    queryFn: api.getPaymentAnalytics,
  });
}

export function useAppointmentAnalytics() {
  return useQuery({
    queryKey: ["analytics", "appointments"],
    queryFn: api.getAppointmentAnalytics,
  });
}

export function useProfessionalAnalytics() {
  return useQuery({
    queryKey: ["analytics", "professionals"],
    queryFn: api.getProfessionalAnalytics,
  });
}

export function usePatientAnalytics() {
  return useQuery({
    queryKey: ["analytics", "patients"],
    queryFn: api.getPatientAnalytics,
  });
}

export function useSystemHealth() {
  return useQuery({
    queryKey: ["analytics", "system"],
    queryFn: api.getSystemHealth,
    refetchInterval: 10000, // Poll system metrics every 10s
  });
}
