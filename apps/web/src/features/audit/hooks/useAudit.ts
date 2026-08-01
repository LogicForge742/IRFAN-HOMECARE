import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auditApi } from "../api/audit-api";

export function useAuditLogs(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => auditApi.getLogs(params),
  });
}

export function useAuditLog(id: string) {
  return useQuery({
    queryKey: ["audit-log", id],
    queryFn: () => auditApi.getLogById(id),
    enabled: !!id,
  });
}

export function useUserAuditLogs(userId: string, params?: Record<string, any>) {
  return useQuery({
    queryKey: ["audit-logs-user", userId, params],
    queryFn: () => auditApi.getLogsByUser(userId, params),
    enabled: !!userId,
  });
}

export function useArchiveLogs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (beforeDate: string) => auditApi.archiveLogs(beforeDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}
