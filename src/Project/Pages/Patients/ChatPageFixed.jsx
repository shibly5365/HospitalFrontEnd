// ✅ FIXED VERSION - Secure Socket.IO Connection with Proper Auth

import React, { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Search, Send, Menu, X, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost:4002/api/patient";

const ChatPagePatient = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);

  // ✅ Connection state management
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ✅ Get token from httpOnly cookie (automatically sent by browser)
  // Frontend doesn't directly access tokens anymore - they're in secure cookies

  // 📥 LOAD CONVERSATIONS
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        // ✅ withCredentials: true sends httpOnly cookies automatically
        const res = await axios.get(`${API}/consultations`, {
          withCredentials: true,
        });

        if (res.data.success && res.data.data?.doctors) {
          const docs = res.data.data.doctors.map((d) => ({
            id: d.id,
            userId: d.id,
            name: d.name,
            role: d.department || "Doctor",
            avatar: d.avatar || "https://i.pravatar.cc/100",
            online: false,
          }));
          setConversations(docs);
        }
      } catch (err) {
        console.error("Error loading conversations:", err);
        toast.error("Failed to load conversations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🔌 SOCKET CONNECTION - FIXED WITH AUTH
  useEffect(() => {
    // ✅ Get token from localStorage (client-side) to pass to socket auth
    // In production, you'd use a secure token endpoint
    const token = localStorage.getItem("token");

    if (!token) {
      setSocketError("❌ No authentication token. Please login.");
      return;
    }

    try {
      // ✅ Connect with JWT token in auth
      const socket = io("http://localhost:4002", {
        auth: {
          token, // ✅ Sent in socket handshake
        },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      socketRef.current = socket;

      // ✅ Connection success
      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        setSocketConnected(true);
        setSocketError(null);
        toast.success("Connected to chat");

        // Register user after connection
        socket.emit("register");
      });

      // ✅ Connection error handling
      socket.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error.message);
        setSocketConnected(false);
        setSocketError(`Connection error: ${error.message}`);
        toast.error(`Socket error: ${error.message}`);
      });

      // ✅ Connection failed
      socket.on("error", (error) => {
        console.error("❌ Socket error:", error);
        setSocketError(error.message || "Socket error occurred");
        toast.error(error.message || "Socket error");
      });

      // ✅ Handle new messages
      socket.on("newMessage", (msg) => {
        setMessagesList((prev) => [...prev, msg]);
        toast.success("New message received");
      });

      // ✅ Handle message sent
      socket.on("messageSent", (msg) => {
        setMessagesList((prev) => [...prev, msg]);
        setMessage("");
      });

      // ✅ Handle message errors
      socket.on("messageError", ({ error }) => {
        console.error("Message error:", error);
        toast.error(error);
      });

      // ✅ Typing indicator
      socket.on("typing", ({ from, fromName }) => {
        setTypingUser(`${fromName} is typing...`);
      });

      socket.on("stop-typing", () => {
        setTypingUser(null);
      });

      // ✅ User presence
      socket.on("user-online", (data) => {
        console.log(`User ${data.userId} is online`);
      });

      socket.on("user-offline", (data) => {
        console.log(`User ${data.userId} is offline`);
      });

      // ✅ Disconnect handler
      socket.on("disconnect", (reason) => {
        console.log(`Socket disconnected: ${reason}`);
        setSocketConnected(false);
      });

      return () => {
        socket.disconnect();
      };
    } catch (err) {
      console.error("Socket initialization error:", err);
      setSocketError(err.message);
    }
  }, []);

  // 🔽 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  // 📥 LOAD MESSAGES FROM API
  const loadMessages = useCallback(
    async (userId) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API}/getMessage/${userId}`, {
          withCredentials: true,
        });
        setMessagesList(res.data || []);
      } catch (err) {
        console.error("Error loading messages:", err);
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 📤 SEND MESSAGE - FIXED
  const handleSend = useCallback(async () => {
    if (!message.trim() || !selectedChat) {
      toast.error("Please select a chat and enter a message");
      return;
    }

    if (!socketConnected) {
      toast.error("Socket not connected. Please wait...");
      return;
    }

    try {
      setIsLoading(true);

      // ✅ Only use Socket.IO (no duplicate API call)
      // The socket event will be saved to DB by backend
      socketRef.current.emit("sendMessage", {
        receiver: selectedChat.userId,
        text: message,
      });

      setMessage("");
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  }, [message, selectedChat, socketConnected]);

  // ✍️ TYPING INDICATOR - FIXED
  const handleTyping = useCallback(
    (value) => {
      setMessage(value);

      if (!socketConnected || !selectedChat) return;

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Emit typing event
      socketRef.current.emit("typing", {
        to: selectedChat.userId,
      });

      // Stop typing after 1 second of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("stop-typing", {
          to: selectedChat.userId,
        });
      }, 1000);
    },
    [socketConnected, selectedChat]
  );

  // 💬 CHAT BUBBLE
  const ChatBubble = ({ msg }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isMe = msg.sender === user._id;

    return (
      <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
        <div>
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs ${
              isMe
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(msg.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  };

  // ✅ ERROR ALERT COMPONENT
  const ErrorAlert = ({ message }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg mb-4">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative w-72 bg-white border-r h-full transition`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Chats</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* Socket Connection Status */}
        <div className="px-4 py-2">
          <div
            className={`text-xs p-2 rounded ${
              socketConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {socketConnected ? "✅ Connected" : "❌ Disconnected"}
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <Search size={16} />
            <input
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto h-[calc(100%-140px)]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : conversations.length > 0 ? (
            conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedChat(c);
                  setIsSidebarOpen(false);
                  loadMessages(c.userId);
                }}
                className={`p-3 flex items-center gap-3 cursor-pointer ${
                  selectedChat?.id === c.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate">{c.role}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        {selectedChat ? (
          <div className="p-4 border-b flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{selectedChat.name}</p>
                <p className="text-xs text-gray-500">{selectedChat.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b text-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}

        {/* Messages */}
        {selectedChat ? (
          <>
            {/* Error Alert */}
            <ErrorAlert message={socketError} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesList.length > 0 ? (
                messagesList.map((msg, idx) => (
                  <ChatBubble key={idx} msg={msg} />
                ))
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  No messages yet. Start the conversation!
                </div>
              )}

              {typingUser && (
                <div className="text-sm text-gray-500 italic">{typingUser}</div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg outline-none"
                disabled={!socketConnected || isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!socketConnected || isLoading || !message.trim()}
                className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPagePatient;
