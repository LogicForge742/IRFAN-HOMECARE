import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyAvailability,
  createAvailability,
  blockAvailability,
} from "../api/availability-api";

export function useAvailability() {
  return useQuery({
    queryKey: ["availability"],
    queryFn: getMyAvailability,
  });
}

export function useCreateAvailability() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createAvailability,
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["availability"],
      });
    },
  });
}

export function useBlockAvailability() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: blockAvailability,
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["availability"],
      });
    },
  });
}
