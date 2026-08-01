import { useMutation, useQuery } from "@tanstack/react-query";
import { fhirApi } from "../api/fhir-api";

export function useFHIRPatient(id: number) {
  return useQuery({
    queryKey: ["fhir", "patient", id],
    queryFn: () => fhirApi.getPatient(id),
    enabled: id > 0,
  });
}

export function useFHIRAppointment(id: number) {
  return useQuery({
    queryKey: ["fhir", "appointment", id],
    queryFn: () => fhirApi.getAppointment(id),
    enabled: id > 0,
  });
}

export function useFHIRObservation(id: number) {
  return useQuery({
    queryKey: ["fhir", "observation", id],
    queryFn: () => fhirApi.getObservation(id),
    enabled: id > 0,
  });
}

export function useValidateFHIR() {
  return useMutation({
    mutationFn: (resource: Record<string, any>) => fhirApi.validate(resource),
  });
}

export function useImportFHIR() {
  return useMutation({
    mutationFn: (resource: Record<string, any>) => fhirApi.importResource(resource),
  });
}

export function useExportFHIR() {
  return useMutation({
    mutationFn: (patientId: number) => fhirApi.exportBundle(patientId),
  });
}
