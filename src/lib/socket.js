import { io } from "socket.io-client";
import { API_ORIGIN } from "../services/queryClient";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_ORIGIN;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  withCredentials: true,
  transports: ["websocket"],
});

export const initSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
