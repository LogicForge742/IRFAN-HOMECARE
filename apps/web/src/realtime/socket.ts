import { io, Socket } from "socket.io-client";

const SOCKET_URL = (import.meta.env.VITE_API_URL as string || "http://localhost:5000/api")
  .replace(/\/api$/, "");

export let socket: Socket | null = null;

export function initializeSocket(token: string): Socket {
  if (socket?.connected) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    autoConnect: false,
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
