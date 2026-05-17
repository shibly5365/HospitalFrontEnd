import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Chat UI Store
 * ONLY manages UI state
 * Server data handled by TanStack Query
 */

const useChatUIStore = create(
  devtools((set, get) => ({
    // =====================================================
    // UI STATE
    // =====================================================

    activeConversation:
      JSON.parse(
        localStorage.getItem("activeConversation")
      ) || null,

    typingUsers: {},

    onlineUsers: new Set(),

    unreadCounts: {},

    emojiPickerOpen: false,

    callModalOpen: false,

    isRecording: false,

    sidebarOpen: true,

    socketConnected: false,

    // =====================================================
    // ACTIVE CONVERSATION
    // =====================================================

    setActiveConversation: (conversation) => {
      if (conversation) {
        localStorage.setItem(
          "activeConversation",
          JSON.stringify(conversation)
        );
      } else {
        localStorage.removeItem(
          "activeConversation"
        );
      }

      set({
        activeConversation: conversation,
      });
    },

    // =====================================================
    // TYPING USERS
    // =====================================================

    setTyping: (
      conversationId,
      userId,
      isTyping
    ) =>
      set((state) => {
        const current =
          state.typingUsers[conversationId] ||
          new Set();

        const updated = new Set(current);

        if (isTyping) {
          updated.add(userId);
        } else {
          updated.delete(userId);
        }

        return {
          typingUsers: {
            ...state.typingUsers,
            [conversationId]: updated,
          },
        };
      }),

    getTypingUsers: (conversationId) => {
      const state = get();

      return Array.from(
        state.typingUsers[conversationId] ||
          new Set()
      );
    },

    // =====================================================
    // ONLINE USERS
    // =====================================================

    setOnlineUsers: (users) =>
      set({
        onlineUsers: new Set(users),
      }),

    addOnlineUser: (userId) =>
      set((state) => {
        const updated = new Set(
          state.onlineUsers
        );

        updated.add(userId);

        return {
          onlineUsers: updated,
        };
      }),

    removeOnlineUser: (userId) =>
      set((state) => {
        const updated = new Set(
          state.onlineUsers
        );

        updated.delete(userId);

        return {
          onlineUsers: updated,
        };
      }),

    isUserOnline: (userId) => {
      return get().onlineUsers.has(userId);
    },

    // =====================================================
    // UNREAD COUNTS
    // =====================================================

    setUnreadCount: (
      conversationId,
      count
    ) =>
      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [conversationId]: count,
        },
      })),

    incrementUnreadCount: (
      conversationId
    ) =>
      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [conversationId]:
            (state.unreadCounts[
              conversationId
            ] || 0) + 1,
        },
      })),

    clearUnreadCount: (
      conversationId
    ) =>
      set((state) => {
        const newUnread = {
          ...state.unreadCounts,
        };

        delete newUnread[conversationId];

        return {
          unreadCounts: newUnread,
        };
      }),

    // =====================================================
    // UI CONTROLS
    // =====================================================

    setEmojiPickerOpen: (isOpen) =>
      set({
        emojiPickerOpen: isOpen,
      }),

    setCallModalOpen: (isOpen) =>
      set({
        callModalOpen: isOpen,
      }),

    setIsRecording: (isRecording) =>
      set({
        isRecording,
      }),

    setSidebarOpen: (isOpen) =>
      set({
        sidebarOpen: isOpen,
      }),

    toggleSidebar: () =>
      set((state) => ({
        sidebarOpen: !state.sidebarOpen,
      })),

    setSocketConnected: (connected) =>
      set({
        socketConnected: connected,
      }),

    // =====================================================
    // RESET STORE
    // =====================================================

    resetChatUI: () => {
      localStorage.removeItem(
        "activeConversation"
      );

      set({
        activeConversation: null,
        unreadCounts: {},
        typingUsers: {},
        emojiPickerOpen: false,
        callModalOpen: false,
        isRecording: false,
      });
    },
  }))
);

export default useChatUIStore;