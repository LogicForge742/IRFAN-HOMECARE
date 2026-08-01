import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVideoRoom, joinVideoRoom, endVideoRoom } from "../api/video-api";

export function useVideoRoom(roomId: string) {
  const queryClient = useQueryClient();

  const roomQuery = useQuery({
    queryKey: ["video-room", roomId],
    queryFn: () => getVideoRoom(roomId),
    enabled: !!roomId,
  });

  const joinMutation = useMutation({
    mutationFn: () => joinVideoRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-room", roomId] });
    },
  });

  const endMutation = useMutation({
    mutationFn: () => endVideoRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-room", roomId] });
    },
  });

  return {
    room: roomQuery.data,
    isLoading: roomQuery.isLoading,
    error: roomQuery.error,
    joinRoom: joinMutation.mutateAsync,
    isJoining: joinMutation.isPending,
    endRoom: endMutation.mutateAsync,
    isEnding: endMutation.isPending,
  };
}
