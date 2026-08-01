import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../api/ai-api";

export function useConsultationSummary() {
  return useMutation({
    mutationFn: ({
      observations,
      symptoms,
      diagnosis,
    }: {
      observations: string;
      symptoms: string;
      diagnosis: string;
    }) => aiApi.getConsultationSummary(observations, symptoms, diagnosis),
  });
}

export function useDifferentialDiagnosis() {
  return useMutation({
    mutationFn: ({ symptoms, diagnosis }: { symptoms: string; diagnosis: string }) =>
      aiApi.getDifferentialDiagnosis(symptoms, diagnosis),
  });
}

export function useFollowup() {
  return useMutation({
    mutationFn: (diagnosis: string) => aiApi.getFollowup(diagnosis),
  });
}

export function usePatientInstructions() {
  return useMutation({
    mutationFn: (diagnosis: string) => aiApi.getPatientInstructions(diagnosis),
  });
}
