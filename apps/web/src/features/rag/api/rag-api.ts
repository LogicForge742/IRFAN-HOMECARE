import { apiClient } from "@/infrastructure/http/api-client";

export interface RAGSource {
  id: string;
  text: string;
  score: number;
  metadata: {
    title?: string;
    [key: string]: any;
  };
}

export interface RAGQueryResponse {
  status: string;
  data: {
    answer: string;
    sources: RAGSource[];
  };
}

export const ragApi = {
  query: async (query: string): Promise<RAGQueryResponse> => {
    const response = await apiClient.post<RAGQueryResponse>("/rag/query", { query });
    return response.data;
  },

  ingest: async (
    title: string,
    text: string,
    metadata?: Record<string, any>
  ): Promise<{ status: string; message: string }> => {
    const response = await apiClient.post<{ status: string; message: string }>("/rag/ingest", {
      title,
      text,
      metadata,
    });
    return response.data;
  },
};
