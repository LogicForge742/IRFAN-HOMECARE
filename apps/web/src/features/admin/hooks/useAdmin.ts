import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, toggleUserStatus, getMetrics } from "../api/admin-api";

export function useUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getUsers,
  });
}

export function useToggleUser() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: toggleUserStatus,
    onSuccess() {
      client.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

export function useMetrics() {
  return useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getMetrics,
  });
}
