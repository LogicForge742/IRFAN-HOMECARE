import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAsRead } from "../api/notification-api";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
}

export function useMarkAsRead() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess() {
      client.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
