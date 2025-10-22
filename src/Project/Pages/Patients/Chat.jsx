import { useState, useEffect, useRef } from "react";
import axios from "axios";

const users = [
  { id: 1, name: "Alice", lastMessage: "Hello!" },
  { id: 2, name: "Bob", lastMessage: "Hey, how are you?" },
  { id: 3, name: "Charlie", lastMessage: "Good morning!" },
];

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages when user changes
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/messages/${selectedUser.id}`
        );
        setMessages(res.data); // assume backend returns [{id, text, sender}]
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      receiverId: selectedUser.id,
      text: newMessage,
      receiverType: "users", // adjust if needed
    };

    try {
      // Optimistically update UI
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");

      // Send to backend
      await axios.post("http://localhost:4002/api/patient/send", messageData);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-300 flex flex-col w-80 transition-transform duration-300 ease-in-out ${
          selectedUser ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        } md:relative fixed md:w-80 z-20 h-full`}
      >
        <div className="p-4 border-b border-gray-300">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                selectedUser?.id === user.id ? "bg-blue-100 font-semibold" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <div>{user.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {user.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex flex-col flex-1 bg-gray-50 transition-transform duration-300 ease-in-out ${
          selectedUser ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile back button */}
        <div className="bg-white border-b border-gray-300 flex items-center px-4 py-3 md:hidden">
          <button
            onClick={() => setSelectedUser(null)}
            className="text-blue-500 font-semibold mr-4 focus:outline-none"
          >
            &larr; Back
          </button>
          <div className="font-semibold text-lg">{selectedUser?.name}</div>
        </div>

        {/* Chat header on md and up */}
        <div className="hidden md:block bg-white border-b border-gray-300 px-6 py-4 font-semibold text-lg">
          {selectedUser?.name || "Select a user"}
        </div>

        {/* Messages */}
        {selectedUser ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg break-words ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex p-4 bg-white border-t border-gray-300 space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500 text-lg">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatUI;
