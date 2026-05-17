import { useEffect, useRef, useCallback } from "react";
import { socket, initSocket } from "../../../lib/socket";
import useChatUIStore from "../store/chatUIStore";
import { useQueryClient } from "@tanstack/react-query";

export const useSocket = () => {
  const queryClient = useQueryClient();

  const {
    setTyping,
    addOnlineUser,
    removeOnlineUser,
    setSocketConnected,
    activeConversation,
  } = useChatUIStore();

  const socketRef = useRef(socket);

  // =====================================================
  // INITIALIZE SOCKET
  // =====================================================

  useEffect(() => {
    if (!socket.connected) {
      initSocket();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  // =====================================================
  // SOCKET LISTENERS
  // =====================================================

  useEffect(() => {
    // =====================================================
    // NEW MESSAGE
    // =====================================================

    const handleNewMessage = (message) => {
      console.log("📩 New message:", message);

      queryClient.setQueryData(
        ["messages", message.conversation],
        (old = []) => {
          const exists = old.some((m) => m._id === message._id);

          if (exists) return old;

          const filtered = old.filter(
            (m) => !(m.isOptimistic && m.text === message.text),
          );

          return [
            ...filtered,
            {
              ...message,
              content: message.text,
              timestamp: message.createdAt,
            },
          ];
        },
      );

      // refresh conversations list
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    };

    // =====================================================
    // MESSAGE READ
    // =====================================================

    const handleMessageRead = ({ conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    };

    // =====================================================
    // TYPING
    // =====================================================

    const handleUserTyping = ({ conversationId, userId, isTyping }) => {
      setTyping(conversationId, userId, isTyping);
    };

    // =====================================================
    // ONLINE USERS
    // =====================================================

    const handleUserOnline = ({ userId }) => {
      addOnlineUser(userId);
    };

    const handleUserOffline = ({ userId }) => {
      removeOnlineUser(userId);
    };

    // =====================================================
    // CONNECT
    // =====================================================

    const handleConnect = () => {
      console.log("🟢 Socket connected");

      setSocketConnected(true);

      // rejoin active room after refresh/reconnect
      if (activeConversation?._id) {
        socket.emit("joinConversation", {
          conversationId: activeConversation._id,
        });

        console.log("✅ Rejoined room:", activeConversation._id);
      }
    };

    // =====================================================
    // DISCONNECT
    // =====================================================

    const handleDisconnect = () => {
      console.log("🔴 Socket disconnected");

      setSocketConnected(false);
    };

    // =====================================================
    // ERROR
    // =====================================================

    const handleError = (error) => {
      console.error("Socket error:", error);
    };

    // =====================================================
    // REGISTER EVENTS
    // =====================================================

    socket.on("connect", handleConnect);

    socket.on("disconnect", handleDisconnect);

    socket.on("error", handleError);

    socket.on("newMessage", handleNewMessage);

    socket.on("messageRead", handleMessageRead);

    socket.on("userTyping", handleUserTyping);

    socket.on("userOnline", handleUserOnline);

    socket.on("userOffline", handleUserOffline);

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      socket.off("connect", handleConnect);

      socket.off("disconnect", handleDisconnect);

      socket.off("error", handleError);

      socket.off("newMessage", handleNewMessage);

      socket.off("messageRead", handleMessageRead);

      socket.off("userTyping", handleUserTyping);

      socket.off("userOnline", handleUserOnline);

      socket.off("userOffline", handleUserOffline);
    };
  }, [
    queryClient,
    setTyping,
    addOnlineUser,
    removeOnlineUser,
    setSocketConnected,
    activeConversation,
  ]);

  // =====================================================
  // JOIN ROOM
  // =====================================================

  const joinConversation = useCallback((conversationId) => {
    if (!conversationId) return;

    const emitJoin = () => {
      socket.emit("joinConversation", {
        conversationId,
      });

      console.log("✅ Joined conversation:", conversationId);
    };

    // already connected
    if (socket.connected) {
      emitJoin();
    } else {
      // wait for connect
      socket.once("connect", emitJoin);

      initSocket();
    }
  }, []);

  // =====================================================
  // LEAVE ROOM
  // =====================================================

  const leaveConversation = useCallback((conversationId) => {
    if (!conversationId) return;

    if (socket.connected) {
      socket.emit("leaveConversation", {
        conversationId,
      });

      console.log("❌ Left conversation:", conversationId);
    }
  }, []);

  // =====================================================
  // TYPING EVENT
  // =====================================================

  const sendTyping = useCallback((conversationId, isTyping) => {
    if (!conversationId) return;

    if (socket.connected) {
      socket.emit("typing", {
        conversationId,
        isTyping,
      });
    }
  }, []);

  // =====================================================
  // READ RECEIPT
  // =====================================================

  const markMessageAsRead = useCallback((conversationId, messageId) => {
    if (!conversationId || !messageId) return;

    if (socket.connected) {
      socket.emit("markMessageAsRead", {
        conversationId,
        messageId,
      });
    }
  }, []);

  return {
    socket: socketRef.current,

    isConnected: socket.connected,

    joinConversation,

    leaveConversation,

    sendTyping,

    markMessageAsRead,
  };
};

export default useSocket;
