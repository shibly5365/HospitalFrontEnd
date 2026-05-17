import { useQuery } from '@tanstack/react-query';
import chatAPI from '../services/chatApi';

/**
 * Query hook for fetching and managing conversations
 * Handles:
 * - Fetching conversations (already filtered by backend based on user role)
 * - Caching with proper stale time
 * - Automatic refetching when needed
 *
 * Backend handles role-based filtering:
 * - Patients see: consulted doctors + joined communities
 * - Doctors see: patient consultations + joined communities
 * - Admins see: all conversations
 */
export const useConversations = (options = {}) => {
  const {
    enabled = true,
    refetchInterval = 30000, // Refetch every 30 seconds
    ...queryOptions
  } = options;

  const {
    data: conversations = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await chatAPI.getConversations();
      return res.data || [];
    },
    enabled,
    staleTime: 1000 * 30, // Data is fresh for 30 seconds
    gcTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    ...queryOptions,
  });

  // Sort conversations by last message time
  const sortedConversations = [...conversations].sort((a, b) => {
    const timeA = a.lastMessage?.timestamp
      ? new Date(a.lastMessage.timestamp).getTime()
      : 0;
    const timeB = b.lastMessage?.timestamp
      ? new Date(b.lastMessage.timestamp).getTime()
      : 0;
    return timeB - timeA;
  });

  return {
    conversations: sortedConversations,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};

export default useConversations;
