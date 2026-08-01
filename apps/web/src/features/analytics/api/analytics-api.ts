import { apiClient } from "@/infrastructure/http/api-client";
import type {
  DashboardSummary,
  RevenueTrend,
  PaymentAnalytics,
  AppointmentAnalytics,
  ProfessionalAnalytic,
  PatientGrowth,
  SystemHealth,
} from "../types/analytics";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await apiClient.get<DashboardSummary>("/analytics/dashboard");
  return response.data;
}

export async function getRevenueAnalytics(): Promise<RevenueTrend[]> {
  const response = await apiClient.get<RevenueTrend[]>("/analytics/revenue");
  return response.data;
}

export async function getPaymentAnalytics(): Promise<PaymentAnalytics> {
  const response = await apiClient.get<PaymentAnalytics>("/analytics/payments");
  return response.data;
}

export async function getAppointmentAnalytics(): Promise<AppointmentAnalytics> {
  const response = await apiClient.get<AppointmentAnalytics>("/analytics/appointments");
  return response.data;
}

export async function getProfessionalAnalytics(): Promise<ProfessionalAnalytic[]> {
  const response = await apiClient.get<ProfessionalAnalytic[]>("/analytics/professionals");
  return response.data;
}

export async function getPatientAnalytics(): Promise<PatientGrowth[]> {
  const response = await apiClient.get<PatientGrowth[]>("/analytics/patients");
  return response.data;
}

export async function getSystemHealth(): Promise<SystemHealth> {
  const response = await apiClient.get<SystemHealth>("/analytics/system");
  return response.data;
}
