import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Search, Send, Menu, X } from "lucide-react";

const API = "http://localhost:4002/api/patient";

const ChatPagePatient = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [conversations, setConversations] = useState([]);

  // 📥 LOAD CONVERSATIONS
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API}/consultations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success && res.data.data.doctors) {
          const docs = res.data.data.doctors.map(d => ({
            id: d.id,
            userId: d.id, // we send Doctor._id and receiverType='doctor'
            name: d.name,
            role: d.department || "Doctor",
            avatar: d.avatar,
            online: false, // You'd need a socket event to update this
          }));
          setConversations(docs);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, [token]);


  // 🔌 SOCKET CONNECT
  useEffect(() => {
    const socket = io("http://localhost:4002");
    socketRef.current = socket;

    if (user?._id) socket.emit("register", user._id);

    socket.on("newMessage", (msg) => {
      setMessagesList((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ from }) => {
      setTypingUser(from);
    });

    socket.on("stop-typing", () => {
      setTypingUser(null);
    });

    return () => socket.disconnect();
  }, []);

  // 🔽 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  // 📥 LOAD MESSAGES FROM API
  const loadMessages = async (userId) => {
    try {
      const res = await axios.get(`${API}/getMessage/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessagesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📤 SEND MESSAGE
  const handleSend = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      // 🔥 API SAVE
      await axios.post(
        `${API}/sendMessage`,
        {
          receiverId: selectedChat.userId,
          text: message,
          receiverType: "doctor",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ⚡ SOCKET SEND
      socketRef.current.emit("sendMessage", {
        sender: user._id,
        receiver: selectedChat.userId,
        text: message,
      });

      setMessage("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✍️ TYPING
  const handleTyping = (value) => {
    setMessage(value);

    socketRef.current.emit("typing", {
      to: selectedChat.userId,
      from: user._id,
    });

    setTimeout(() => {
      socketRef.current.emit("stop-typing", {
        to: selectedChat.userId,
        from: user._id,
      });
    }, 1000);
  };

  // 💬 CHAT BUBBLE
  const ChatBubble = ({ msg }) => {
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
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X />
          </button>
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

        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              setSelectedChat(c);
              setIsSidebarOpen(false);
              loadMessages(c.userId);
            }}
            className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
          >
            <img src={c.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-gray-500">{c.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-4 bg-white border-b flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu />
          </button>

          {selectedChat && (
            <>
              <img
                src={selectedChat.avatar}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{selectedChat.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedChat.online ? "Online" : "Offline"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {!selectedChat ? (
            <div className="text-center text-gray-400 mt-10">
              Select a chat
            </div>
          ) : (
            <>
              {messagesList
                .filter(
                  (msg) =>
                    // Only show messages. Because `recipient` could be the actual User ID of the doctor,
                    // we might need to filter by our side only if we want, or just show whatever GET /getMessage returns
                    // Actually, getting /getMessage/:userId already filters by conversation!
                    true
                )
                .map((msg, i) => (
                  <ChatBubble key={i} msg={msg} />
                ))}

              {typingUser === selectedChat.userId && (
                <p className="text-sm text-gray-400">Typing...</p>
              )}

              <div ref={bottomRef}></div>
            </>
          )}
        </div>

        {/* INPUT */}
        {selectedChat && (
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Type message..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 rounded"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPagePatient;