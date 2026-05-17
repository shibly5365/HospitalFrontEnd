import { useQuery } from '@tanstack/react-query';
import chatAPI from '../services/chatApi';

/**
 * Query hook for fetching communities
 * Handles:
 * - Fetching communities (role-based filtering by backend)
 * - Caching communities list
 * - Refetching when needed
 *
 * Backend filters communities based on user role:
 * - Regular users see public communities
 * - Doctors see professional communities
 * - Admins see all communities
 */
export const useCommunities = (options = {}) => {
  const {
    enabled = true,
    refetchInterval = 60000, // Refetch every minute
    ...queryOptions
  } = options;

  const {
    data: communities = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      // Assuming backend has this endpoint
      // If not available, modify based on your API
      try {
        const res = await chatAPI.getCommunities?.();
        return res?.data || [];
      } catch {
        // Fallback if endpoint doesn't exist
        console.warn('Communities endpoint not available');
        return [];
      }
    },
    enabled,
    staleTime: 1000 * 60, // Data is fresh for 1 minute
    gcTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchInterval,
    refetchOnWindowFocus: false,
    retry: 1,
    ...queryOptions,
  });

  return {
    communities,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};

export default useCommunities;
