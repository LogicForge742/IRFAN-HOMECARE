import { apiClient } from "@/infrastructure/http/api-client";

export interface FHIRResource {
  resourceType: string;
  id: string;
  [key: string]: any;
}

export interface FHIRBundle {
  resourceType: "Bundle";
  type: string;
  entry: { resource: FHIRResource }[];
}

export interface FHIRValidationResult {
  status: "valid" | "invalid";
  message?: string;
  errors?: string[];
}

export const fhirApi = {
  getPatient: async (id: number): Promise<FHIRResource> => {
    const response = await apiClient.get<FHIRResource>(`/fhir/Patient/${id}`);
    return response.data;
  },

  getAppointment: async (id: number): Promise<FHIRResource> => {
    const response = await apiClient.get<FHIRResource>(`/fhir/Appointment/${id}`);
    return response.data;
  },

  getObservation: async (id: number): Promise<FHIRResource> => {
    const response = await apiClient.get<FHIRResource>(`/fhir/Observation/${id}`);
    return response.data;
  },

  validate: async (resource: Record<string, any>): Promise<FHIRValidationResult> => {
    const response = await apiClient.post<FHIRValidationResult>("/fhir/validate", { resource });
    return response.data;
  },

  importResource: async (resource: Record<string, any>): Promise<{ status: string; message: string }> => {
    const response = await apiClient.post<{ status: string; message: string }>("/fhir/import", { resource });
    return response.data;
  },

  exportBundle: async (patientId: number): Promise<FHIRBundle> => {
    const response = await apiClient.post<FHIRBundle>("/fhir/export", { patient_id: patientId });
    return response.data;
  },
};
