import { useEffect, useRef, useState } from "react";
import { useMessages } from "./useMessages";
import { useConversations } from "./useConversations";
import { useSocket } from "./useSocket";
import useChatUIStore from "../store/chatUIStore";

/**
 * Main chat hook - orchestrates all chat functionality
 * Combines TanStack Query hooks with Socket.io and Zustand
 *
 * Architecture:
 * - UI state → Zustand (useChatUIStore)
 * - Server data → TanStack Query (useMessages, useConversations)
 * - Real-time events → Socket.io (useSocket)
 */
export const useChat = (currentUserRole) => {
  // UI State from Zustand
  const {
    activeConversation,
    setActiveConversation,
    setIsRecording,
    isRecording,
  } = useChatUIStore();

  // Server data from TanStack Query
  const { conversations, isLoading: isLoadingConversations } =
    useConversations();
  const {
    messages,
    isLoading: isLoadingMessages,
    sendMessage,
  } = useMessages(activeConversation?._id);

  // Socket management
  const { joinConversation } = useSocket();

  // Local UI state
  const [messageText, setMessageText] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [expiryReason, setExpiryReason] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // =========================================
  // HANDLE ACTIVE CONVERSATION CHANGES
useEffect(() => {
  if (!activeConversation?._id) return;

  const timeout = setTimeout(() => {
    joinConversation(activeConversation._id);
  }, 500);

  return () => clearTimeout(timeout);

}, [activeConversation, joinConversation]);
  // =========================================
  // SEND MESSAGE
  // =========================================
  const handleSendMessage = (type = "text", fileUrl = null) => {
    if (
      (!messageText.trim() && type === "text") ||
      !activeConversation ||
      !canSendMessage
    )
      return;

    const newMsg = {
      conversationId: activeConversation._id,
      text: messageText.trim(),
      messageType: type,
      fileUrl,
    };

    // Send message through TanStack Query mutation
    sendMessage(newMsg);
    setMessageText("");
  };

  // =========================================
  // VOICE RECORDING
  // =========================================
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        // TODO: Upload audioBlob to your server and get URL
        // Then call handleSendMessage('voice', uploadedUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Voice recording failed", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    // Message state
    messageText,
    setMessageText,
    sendMessage: handleSendMessage,
    messages,
    isLoadingMessages,

    // Conversation state
    conversations,
    isLoadingConversations,
    activeConversation,
    setActiveConversation,

    // Recording state
    isRecording,
    startVoiceRecording,
    stopRecording,

    // Permissions
    canSendMessage,
    expiryReason,
  };
};
