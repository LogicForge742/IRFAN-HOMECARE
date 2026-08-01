import { apiClient } from "@/infrastructure/http/api-client";

export interface AISuggestionResponse {
  status: string;
  suggestion: string;
}

export const aiApi = {
  getConsultationSummary: async (
    observations: string,
    symptoms: string,
    diagnosis: string
  ): Promise<AISuggestionResponse> => {
    const response = await apiClient.post<AISuggestionResponse>("/ai/consultation-summary", {
      observations,
      symptoms,
      diagnosis,
    });
    return response.data;
  },

  getDifferentialDiagnosis: async (symptoms: string, diagnosis: string): Promise<AISuggestionResponse> => {
    const response = await apiClient.post<AISuggestionResponse>("/ai/differential-diagnosis", {
      symptoms,
      diagnosis,
    });
    return response.data;
  },

  getFollowup: async (diagnosis: string): Promise<AISuggestionResponse> => {
    const response = await apiClient.post<AISuggestionResponse>("/ai/follow-up", {
      diagnosis,
    });
    return response.data;
  },

  getPatientInstructions: async (diagnosis: string): Promise<AISuggestionResponse> => {
    const response = await apiClient.post<AISuggestionResponse>("/ai/patient-instructions", {
      diagnosis,
    });
    return response.data;
  },
};
