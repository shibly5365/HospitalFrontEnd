import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import chatAPI from "../services/chatApi";
import { useSocket } from "./useSocket";

/**
 * Query hook for fetching and managing messages
 */
export const useMessages = (conversationId) => {
  const queryClient = useQueryClient();

  // =====================================================
  // FETCH MESSAGES
  // =====================================================

  const {
    data: messages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messages", conversationId],

    queryFn: async () => {
      if (!conversationId) return [];

      const res = await chatAPI.getMessages(conversationId);

      return (res.data.messages || []).map((msg) => ({
        ...msg,
        content: msg.text,
        timestamp: msg.createdAt,
      }));
    },

    enabled: !!conversationId,

    staleTime: 0,

    gcTime: 1000 * 60 * 5,
  });

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessageMutation = useMutation({
    // ✅ SOCKET ONLY
    mutationFn: async (messageData) => {
      const res = await chatAPI.sendMessage(messageData);

      return {
        ...res.data,
        content: res.data.text,
        timestamp: res.data.createdAt,
      };
    },

    // =====================================================
    // OPTIMISTIC UPDATE
    // =====================================================

    onMutate: async (newMessage) => {
      // cancel old refetch
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      // backup old data
      const previousMessages = queryClient.getQueryData([
        "messages",
        conversationId,
      ]);

      // optimistic message
      queryClient.setQueryData(["messages", conversationId], (old) => {
        const currentUser = window.__AUTH_USER__;

        const optimisticMessage = {
          ...newMessage,

          _id: `temp-${Date.now()}`,

          sender: {
            _id: currentUser?._id,
          },

          text: newMessage.text,

          content: newMessage.text,

          createdAt: new Date().toISOString(),

          timestamp: new Date().toISOString(),

          isOptimistic: true,
        };

        return [...(old || []), optimisticMessage];
      });

      return { previousMessages };
    },

    // =====================================================
    // ERROR ROLLBACK
    // =====================================================

    onError: (error, newMessage, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", conversationId],
          context.previousMessages,
        );
      }

      console.error("Failed to send message:", error);
    },
  });

  // =====================================================
  // REMOVE DUPLICATES
  // =====================================================

  const deduplicatedMessages = Array.from(
    new Map(messages.map((msg) => [msg._id, msg])).values(),
  );

  return {
    messages: deduplicatedMessages,

    isLoading,

    error,

    refetch,

    sendMessage: sendMessageMutation.mutate,

    isSending: sendMessageMutation.isPending,
  };
};

export default useMessages;
