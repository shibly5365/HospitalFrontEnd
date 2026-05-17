import { apiClient } from "../../../services/queryClient";

const messagePath = (path) => `/message${path}`;

const API = {
  get: (path, config) => apiClient.get(messagePath(path), config),
  post: (path, data, config) => apiClient.post(messagePath(path), data, config),
  patch: (path, data, config) => apiClient.patch(messagePath(path), data, config),
  delete: (path, config) => apiClient.delete(messagePath(path), config),
};

/**
 * Chat API Service
 * Hospital Chat System
 */

export const chatAPI = {
  // =========================================
  // CONVERSATIONS
  // =========================================

  /**
   * Get or create direct conversation
   */
  getOrCreateConversation: (data) => API.post("/conversation", data),

  /**
   * Get all conversations
   */
  getConversations: () => API.get("/conversations"),

  /**
   * Get single conversation
   */
  getConversation: (conversationId) =>
    API.get(`/conversation/${conversationId}`),

  // =========================================
  // MESSAGES
  // =========================================

  /**
   * Send text message
   */
  sendMessage: (data) => API.post("/send", data),

  /**
   * Get conversation messages
   */
  getMessages: (conversationId) => API.get(`/messages/${conversationId}`),

  /**
   * Get paginated messages
   */
  getMessagesPaginated: (conversationId, page = 1, limit = 50) =>
    API.get(`/messages/${conversationId}?page=${page}&limit=${limit}`),

  /**
   * Mark message as read
   */
  markMessageAsRead: (messageId) => API.patch(`/${messageId}/read`),

  /**
   * Mark conversation as read
   */
  markConversationAsRead: (conversationId) =>
    API.patch(`/conversation/${conversationId}/read`),

  /**
   * Edit message
   */
  editMessage: (messageId, data) => API.patch(`/${messageId}/edit`, data),

  /**
   * Delete message
   */
  deleteMessage: (messageId) => API.delete(`/${messageId}`),

  // =========================================
  // GROUPS / COMMUNITIES
  // =========================================

  /**
   * Get communities
   */
  getCommunities: () => API.get("/communities"),

  /**
   * Create group
   */
  createGroup: (data) => API.post("/group/create", data),

  /**
   * Add member
   */
  addMember: (data) => API.post("/group/add-member", data),

  /**
   * Remove member
   */
  removeMember: (data) => API.post("/group/remove-member", data),

  /**
   * Join community
   */
  joinCommunity: (communityId) => API.post(`/community/${communityId}/join`),

  /**
   * Leave community
   */
  leaveCommunity: (communityId) => API.post(`/community/${communityId}/leave`),

  // =========================================
  // SEARCH
  // =========================================

  /**
   * Search users
   */
  searchUsers: (query) => API.get(`/search-users?search=${query}`),

  /**
   * Online users
   */
  getOnlineUsers: () => API.get("/users/online"),

  /**
   * Typing users
   */
  getTypingUsers: (conversationId) =>
    API.get(`/conversation/${conversationId}/typing`),

  // =========================================
  // FILE UPLOADS
  // =========================================

  /**
   * Upload image
   */
  uploadImage: (file, conversationId) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("conversationId", conversationId);

    return API.post(
      "/upload/image",

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  /**
   * Upload document
   */
  uploadDocument: (file, conversationId) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("conversationId", conversationId);

    return API.post(
      "/upload/document",

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  /**
   * Upload any file
   */
  uploadFile: (file, conversationId) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("conversationId", conversationId);

    return API.post(
      "/upload/file",

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  /**
   * Upload voice message
   */
  uploadVoiceMessage: (audioBlob, conversationId) => {
    const formData = new FormData();

    formData.append("file", audioBlob, "voice-message.webm");

    formData.append("conversationId", conversationId);

    return API.post(
      "/upload/audio",

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  /**
   * Delete uploaded file
   */
  deleteUploadedFile: (public_id) =>
    API.post("/upload/delete", {
      public_id,
    }),

  /**
   * Get uploaded file info
   */
  getFileInfo: (publicId) => API.get(`/upload/${publicId}`),
};

export default chatAPI;
