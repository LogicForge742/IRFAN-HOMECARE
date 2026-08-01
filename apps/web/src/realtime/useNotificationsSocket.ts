import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { initializeSocket, disconnectSocket } from "./socket";

export function useNotificationsSocket() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      disconnectSocket();
      return;
    }

    const socketInstance = initializeSocket(token);

    socketInstance.on("connect", () => {
      console.log("WebSocket connection established");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socketInstance.on("notification", (data: {
      id: number;
      title: string;
      message: string;
      notification_type: string;
    }) => {
      // Invalidate notifications query to auto-refresh notifications count and pages
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      // Display a beautiful Sonner toast notification
      const toastOptions = {
        description: data.message,
        duration: 6000,
      };

      if (data.notification_type === "payment") {
        toast.success(data.title, toastOptions);
      } else if (data.notification_type === "appointment") {
        toast.info(data.title, toastOptions);
      } else {
        toast(data.title, toastOptions);
      }
    });

    socketInstance.connect();

    return () => {
      socketInstance.off("connect");
      socketInstance.off("connect_error");
      socketInstance.off("notification");
      disconnectSocket();
    };
  }, [token, isAuthenticated, queryClient]);
}
