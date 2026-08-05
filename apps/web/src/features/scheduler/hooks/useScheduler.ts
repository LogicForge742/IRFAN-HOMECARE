import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schedulerApi } from "../api/scheduler-api";

export const useSchedulerJobs = () => {
  return useQuery({
    queryKey: ["scheduler-jobs"],
    queryFn: schedulerApi.getJobs,
    refetchInterval: 15000,
  });
};

export const useTriggerSchedulerJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => schedulerApi.triggerJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduler-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["scheduler-history"] });
    },
  });
};

export const useSchedulerHistory = () => {
  return useQuery({
    queryKey: ["scheduler-history"],
    queryFn: schedulerApi.getHistory,
    refetchInterval: 15000,
  });
};

export const useSchedulerHealth = () => {
  return useQuery({
    queryKey: ["scheduler-health"],
    queryFn: schedulerApi.getHealth,
    refetchInterval: 10000,
  });
};
