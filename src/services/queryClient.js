import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN ||
  (API_BASE_URL.endsWith("/api")
    ? API_BASE_URL.slice(0, -4) || "/"
    : API_BASE_URL);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const buildAssetUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${normalizedPath}`;
};

/**
 * TanStack Query configuration
 * Centralized query client setup for the entire application
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Refetch on window focus
        refetchOnWindowFocus: true,
        // Refetch on tab reconnection
        refetchOnReconnect: true,
        // Number of retries for failed requests
        retry: (failureCount, error) => {
          // Don't retry if it's a 4xx error
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        // Initial stale time is 0 (data considered stale immediately)
        staleTime: 0,
        // Cache time before garbage collection (5 minutes default)
        gcTime: 1000 * 60 * 5,
      },
      mutations: {
        // Retry mutations once on network failure
        retry: (failureCount, error) => {
          // Only retry on network errors, not on 4xx/5xx
          if (error?.response?.status) {
            return false;
          }
          return failureCount < 1;
        },
      },
    },
  });
};

export const queryClient = createQueryClient();
