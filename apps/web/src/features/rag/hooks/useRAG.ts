import { useMutation } from "@tanstack/react-query";
import { ragApi } from "../api/rag-api";

export function useQueryKnowledgeBase() {
  return useMutation({
    mutationFn: (query: string) => ragApi.query(query),
  });
}

export function useIngestDocument() {
  return useMutation({
    mutationFn: ({
      title,
      text,
      metadata,
    }: {
      title: string;
      text: string;
      metadata?: Record<string, any>;
    }) => ragApi.ingest(title, text, metadata),
  });
}
