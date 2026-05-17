import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';

/**
 * Chat Provider Component
 * Wraps the chat feature with TanStack Query provider
 * Add this to your root App component or main chat layout
 */
export const ChatProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ChatProvider;
