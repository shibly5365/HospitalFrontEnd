# Hospital Chat System - TanStack Query & Zustand Setup

## Overview

This is a production-ready chat system that combines:
- **TanStack Query (React Query)** - Server state management
- **Zustand** - UI state management
- **Socket.io** - Real-time communication
- **Axios** - HTTP requests

## Architecture

### State Management Strategy

```
┌─────────────────────────────────────────┐
│          Chat Application               │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   TanStack Query                  │  │
│  │   (Server State)                  │  │
│  │                                  │  │
│  │  • messages (by conversationId)  │  │
│  │  • conversations                 │  │
│  │  • communities                   │  │
│  └──────────────────────────────────┘  │
│                 ↕ (invalidate)          │
│  ┌──────────────────────────────────┐  │
│  │   Socket.io                       │  │
│  │   (Real-time Events)              │  │
│  │                                  │  │
│  │  • newMessage                    │  │
│  │  • userTyping                    │  │
│  │  • userOnline/offline            │  │
│  └──────────────────────────────────┘  │
│                 ↕                       │
│  ┌──────────────────────────────────┐  │
│  │   Zustand (useChatUIStore)        │  │
│  │   (UI State Only)                 │  │
│  │                                  │  │
│  │  • activeConversation            │  │
│  │  • typingUsers                   │  │
│  │  • onlineUsers                   │  │
│  │  • unreadCounts                  │  │
│  │  • emojiPickerOpen               │  │
│  │  • callModalOpen                 │  │
│  │  • isRecording                   │  │
│  │  • sidebarOpen                   │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## File Structure

```
src/features/chat/
├── hooks/
│   ├── index.js                    # Export all hooks
│   ├── useChat.js                  # Main orchestrator hook
│   ├── useMessages.js              # Query hook for messages
│   ├── useConversations.js         # Query hook for conversations
│   ├── useCommunities.js           # Query hook for communities
│   └── useSocket.js                # Socket.io management
├── store/
│   ├── index.js                    # Export all stores
│   ├── chatUIStore.js              # Zustand UI state (NEW)
│   └── chatSlice.js                # Legacy Redux store (kept for compatibility)
├── services/
│   └── chatApi.js                  # API endpoints
├── ChatProvider.jsx                # QueryClientProvider wrapper (NEW)
└── ... other components

src/services/
├── queryClient.js                  # TanStack Query configuration (NEW)
└── ... other services
```

## Installation

### 1. Install TanStack Query

```bash
npm install @tanstack/react-query
```

If not already installed, Zustand should also be present:
```bash
npm install zustand
```

### 2. Wrap Your App with QueryClientProvider

In your main App or Root component:

```jsx
import ChatProvider from '@/features/chat/ChatProvider';

function App() {
  return (
    <ChatProvider>
      {/* Your chat components */}
    </ChatProvider>
  );
}
```

Or if you already use QueryClientProvider elsewhere:

```jsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your chat components */}
    </QueryClientProvider>
  );
}
```

## Usage Examples

### Basic Chat Component

```jsx
import { useChat } from '@/features/chat/hooks';
import { useChatUIStore } from '@/features/chat/store';

function ChatComponent() {
  const userRole = 'patient'; // or 'doctor', 'admin'
  const {
    messages,
    isLoadingMessages,
    sendMessage,
    conversations,
    activeConversation,
    setActiveConversation,
  } = useChat(userRole);

  const { onlineUsers } = useChatUIStore();

  return (
    <div>
      {/* Render conversations */}
      {conversations.map((conv) => (
        <div
          key={conv._id}
          onClick={() => setActiveConversation(conv)}
        >
          {conv.name}
          {onlineUsers.has(conv.participants[0]._id) && '●'}
        </div>
      ))}

      {/* Render messages */}
      {isLoadingMessages ? (
        <p>Loading...</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id}>{msg.content}</div>
        ))
      )}

      {/* Send message */}
      <button onClick={() => sendMessage('text', null)}>
        Send
      </button>
    </div>
  );
}
```

### Accessing Typing Indicators

```jsx
import { useChatUIStore } from '@/features/chat/store';

function TypingIndicator() {
  const { activeConversation, getTypingUsers } = useChatUIStore();

  const typingUsers = getTypingUsers(activeConversation?._id);

  if (typingUsers.length === 0) return null;

  return (
    <div className="typing-indicator">
      {typingUsers.length} user(s) typing...
    </div>
  );
}
```

### Checking Online Status

```jsx
import { useChatUIStore } from '@/features/chat/store';

function UserStatus({ userId }) {
  const { isUserOnline } = useChatUIStore();

  return (
    <span>
      {isUserOnline(userId) ? '🟢 Online' : '⚫ Offline'}
    </span>
  );
}
```

### Using Socket Methods

```jsx
import { useSocket } from '@/features/chat/hooks';

function ChatMessage() {
  const { sendMessage, sendTyping, markMessageAsRead } = useSocket();

  const handleSendMessage = (content) => {
    sendMessage({
      conversationId,
      content,
      type: 'text',
    });
  };

  const handleTyping = (isTyping) => {
    sendTyping(conversationId, isTyping);
  };

  return (
    // JSX here
  );
}
```

## Query Keys

### Messages Query
- Key: `['messages', conversationId]`
- Invalidates when: New message arrives, message marked as read
- Stale time: 0 (always refetch to get latest)
- Cache time: 5 minutes

### Conversations Query
- Key: `['conversations']`
- Refetch interval: 30 seconds
- Stale time: 30 seconds
- Cache time: 5 minutes

### Communities Query
- Key: `['communities']`
- Refetch interval: 1 minute
- Stale time: 1 minute
- Cache time: 10 minutes

## Socket Events

### Events Emitted to Server

```javascript
// Join a conversation
socket.emit('joinConversation', conversationId)

// Send a message
socket.emit('sendMessage', {
  conversationId,
  content,
  type: 'text', // 'text', 'voice', 'image'
  fileUrl: null,
  sender: { _id, name }
})

// Send typing indicator
socket.emit('typing', {
  conversationId,
  isTyping: true/false
})

// Mark message as read
socket.emit('markMessageAsRead', {
  conversationId,
  messageId
})
```

### Events Listened From Server

```javascript
// New message received
socket.on('newMessage', (message) => {
  // Triggers message query invalidation
})

// User typing
socket.on('userTyping', ({ conversationId, userId, isTyping }) => {
  // Updates UI state via Zustand
})

// User online/offline
socket.on('userOnline', ({ userId }) => {})
socket.on('userOffline', ({ userId }) => {})

// Message read status
socket.on('messageRead', ({ conversationId, messageId }) => {
  // Invalidates messages query
})
```

## Optimistic Updates

When sending a message, the UI updates immediately with an optimistic message:

```javascript
// 1. Message added to cache immediately
// 2. Socket emits to server
// 3. Server broadcasts to other users
// 4. Conflict resolution if needed
```

If the mutation fails, the cache is rolled back automatically.

## Caching Strategy

### Data Flow

```
User Action
    ↓
TanStack Query Mutation
    ↓
Optimistic Update (instant UI)
    ↓
Socket emit / API call
    ↓
Server responds
    ↓
Query invalidated
    ↓
Fresh data fetched
```

## Error Handling

All hooks return an `error` property:

```jsx
const { messages, error } = useMessages(conversationId);

if (error) {
  return <div className="error">{error.message}</div>;
}
```

## Performance Optimization

### 1. Message Deduplication
Messages are automatically deduplicated by ID to prevent duplicates from both Socket.io and API responses.

### 2. Query Caching
- Queries are cached for 5 minutes
- Stale time prevents unnecessary refetches
- Manual invalidation on real-time events

### 3. Offline Support
- Socket.io automatically handles reconnection
- Queries retry failed requests
- Unread messages persist across disconnects

## Role-Based Filtering

The backend handles role-based filtering for conversations:

```javascript
// Patient sees:
- Conversations with consulted doctors
- Joined communities

// Doctor sees:
- Patient consultation conversations
- Joined professional communities

// Admin sees:
- All conversations
- All communities
```

No filtering needed on frontend - backend returns only relevant data.

## Testing

### Mock useChat Hook

```jsx
import { useChat } from '@/features/chat/hooks';
jest.mock('@/features/chat/hooks', () => ({
  useChat: jest.fn(() => ({
    messages: [],
    conversations: [],
    sendMessage: jest.fn(),
  }))
}));
```

### Mock useSocket Hook

```jsx
import { useSocket } from '@/features/chat/hooks';
jest.mock('@/features/chat/hooks', () => ({
  useSocket: jest.fn(() => ({
    socket: {},
    isConnected: true,
    sendMessage: jest.fn(),
  }))
}));
```

## Troubleshooting

### Messages not updating
1. Check Socket.io connection: `useSocket` should log `Socket connected`
2. Verify conversation ID is set: `activeConversation._id` should exist
3. Check browser console for errors

### Infinite loop / Refetching too much
- Adjust `staleTime` and `gcTime` in query options
- Check that dependencies are correct in useEffect

### Memory leaks
- Zustand store is cleaned up automatically
- Socket listeners are removed on component unmount
- Query cache is garbage collected after `gcTime`

## Migration from Old Store

If using the old `chatSlice` Redux store:

### Before:
```jsx
import useChatStore from '@/features/chat/store/chatSlice';

const { setConversations, messages } = useChatStore();
```

### After:
```jsx
import { useChat } from '@/features/chat/hooks';
import { useChatUIStore } from '@/features/chat/store';

const { conversations, messages } = useChat(userRole);
const { setActiveConversation } = useChatUIStore();
```

## Best Practices

1. **Never call server endpoints directly in components**
   - Use TanStack Query hooks (useMessages, useConversations)

2. **Keep UI state separate**
   - Use useChatUIStore for UI concerns only

3. **Use Socket.io for real-time events**
   - Don't poll the API for messages

4. **Invalidate queries on socket events**
   - New message → invalidate messages query
   - User online → invalidate conversations query

5. **Always check loading and error states**
   ```jsx
   if (isLoading) return <Spinner />;
   if (error) return <ErrorBox error={error} />;
   ```

6. **Use queryKey consistently**
   - Always use same query keys for related data
   - Makes cache management predictable

## Common Pitfalls

❌ **Don't:**
- Fetch data directly in component with useEffect + axios
- Store conversations in component state
- Emit messages via Socket.io without query invalidation
- Use Redux for messages/conversations

✅ **Do:**
- Use useMessages hook for message queries
- Use useChatUIStore for UI-only state
- Let Socket.io automatically invalidate queries
- Use Zustand for UI state and TanStack Query for server state

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Socket.io Client Docs](https://socket.io/docs/v4/client-api/)

## Next Steps

1. Install @tanstack/react-query
2. Update App.jsx to wrap with ChatProvider
3. Update any existing chat components to use new hooks
4. Test message sending and receiving
5. Verify Socket.io connection in browser DevTools
