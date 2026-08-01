import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../api/schedule-api";

export function useSchedule() {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: getSchedule,
  });
}
