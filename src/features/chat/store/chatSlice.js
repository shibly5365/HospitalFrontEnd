import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useChatStore = create(
  devtools((set, get) => ({
    // State
    conversations: [],
    activeConversation: null,
    messages: {}, // { conversationId: [messages] }
    typingUsers: {}, // { conversationId: Set(userIds) }
    onlineUsers: new Set(),
    unreadCounts: {},

    // Actions
    setConversations: (conversations) => set({ conversations }),

    setActiveConversation: (conversation) => {
      set({ activeConversation: conversation });
      // Mark as read when opening chat
      if (conversation?._id) {
        get().markAsRead(conversation._id);
      }
    },

    addMessage: (conversationId, message) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: [...(state.messages[conversationId] || []), message],
        },
        // Increase unread if not active
        unreadCounts:
          state.activeConversation?._id !== conversationId
            ? {
                ...state.unreadCounts,
                [conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
              }
            : state.unreadCounts,
      })),

    setMessages: (conversationId, messages) =>
      set((state) => ({
        messages: { ...state.messages, [conversationId]: messages },
      })),

    setTyping: (conversationId, userId, isTyping) =>
      set((state) => {
        const current = state.typingUsers[conversationId] || new Set();
        const updated = new Set(current);

        if (isTyping) updated.add(userId);
        else updated.delete(userId);

        return {
          typingUsers: {
            ...state.typingUsers,
            [conversationId]: updated,
          },
        };
      }),

    setOnlineUsers: (users) => set({ onlineUsers: new Set(users) }),

    markAsRead: (conversationId) =>
      set((state) => {
        const newUnread = { ...state.unreadCounts };
        delete newUnread[conversationId];
        return { unreadCounts: newUnread };
      }),

    resetChat: () =>
      set({
        activeConversation: null,
        messages: {},
        unreadCounts: {},
      }),
  }))
);

export default useChatStore;