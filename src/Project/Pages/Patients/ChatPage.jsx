import { apiClient } from "../../../services/queryClient";
import { useState, useRef, useEffect } from "react";
import {
  FaVideo,
  FaPhone,
  FaPaperclip,
  FaMicrophone,
  FaSmile,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { useChat } from "../../../features/chat/hooks/useChat.js";
import useChatUIStore from "../../../features/chat/store/chatUIStore.js";
import { useAuth } from "../../../Project/Components/AuthContext.jsx";

export default function ChatPagePatient() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const {
    messageText,
    setMessageText,
    sendMessage,
    isRecording,
    startVoiceRecording,
    stopRecording,
    canSendMessage,
    conversations,
    expiryReason,
    messages,
  } = useChat("patient");

  const { activeConversation, setActiveConversation } = useChatUIStore();

  const { auth } = useAuth();
  const user = auth.user;

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("conversationId", activeConversation._id);

    try {
      await apiClient.post("/message/send-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-[100dvh] theme-bg theme-text overflow-hidden">
      {/* ==================== SIDEBAR ==================== */}
      <div className={`${activeConversation ? "hidden md:flex" : "flex"} w-full md:w-[380px] border-r theme-border theme-card flex-col `}
      >
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b theme-border theme-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold theme-text">
              Messages
            </h2>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg py-3 bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-500">
              +
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-3 theme-text-muted" />
            <input
              type="text"
              placeholder="Search doctors or chats..."
              className="w-full theme-soft text-sm pl-11 pr-4 py-2.5 rounded-full outline-none border theme-border focus:border-blue-500"
            />
          </div>
        </div>
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations?.length > 0 ? (
            Array.isArray(conversations) &&
            conversations
              .filter((convo) => {
                const otherUser = convo.members?.find(
                  (m) => m._id?.toString() !== user?._id?.toString(),
                );

                return (
                  otherUser &&
                  otherUser.role?.toLowerCase()?.trim() === "doctor"
                );
              })
              .map((convo) => {
                const otherUser = convo.members?.find(
                  (m) => m._id?.toString() !== user?._id?.toString(),
                );

                return (
                  <div
                    key={convo._id}
                    onClick={() => setActiveConversation(convo)}
                    className={`p-4 border-b theme-border cursor-pointer hover:theme-soft
          ${activeConversation?._id === convo._id ? "theme-soft" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        👨‍⚕️
                      </div>

                      <div>
                        <h3 className="font-semibold">{otherUser?.fullName}</h3>

                        <p className="text-sm theme-text-muted">
                          {otherUser?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="p-3 theme-text-muted text-sm text-center mt-8">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* ==================== MAIN CHAT AREA ==================== */}
<div
  className={`${!activeConversation ? "hidden md:flex" : "flex"} flex-1 flex-col h-full overflow-hidden theme-bg`}
>
        {activeConversation ? (
          <>
            {/* Header */}
           <div className="sticky top-0 z-20 h-16 theme-card border-b theme-border px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="md:hidden text-lg theme-text"
                >
                  ←
                </button>

                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
                    👨‍⚕️
                  </div>

                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 theme-border"></div>
                </div>

                <div>
                  <h3 className="font-semibold text-base">
                    {activeConversation.members?.find(
                      (m) => m._id?.toString() !== user?._id?.toString(),
                    )?.fullName || "Doctor"}
                  </h3>

                  <p className="text-green-500 text-xs">● Online</p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-lg theme-text-muted">
                <FaPhone className="cursor-pointer hover:text-blue-500 transition-colors" />
                <FaVideo className="cursor-pointer hover:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-scroll overscroll-contain p-3 sm:p-5 space-y-2 custom-scrollbar"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/cubes.png')",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isOwnMessage =
                    msg.sender?._id?.toString() === user?._id?.toString();

                  const messageTime = new Date(
                    msg.createdAt || msg.timestamp,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      layout="position"
                      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%]
                  px-3 py-2 rounded-2xl shadow-sm text-sm sm:text-[15px]
                  ${isOwnMessage
                            ? "bg-[#005c4b] text-white rounded-br-md"
                            : "theme-soft theme-text rounded-bl-md"
                          }`}
                      >
                        {msg.messageType === "text" && (
                          <p className="break-words">{msg.text}</p>
                        )}

                        {msg.messageType === "file" && (
                          <a
                            href={msg.file}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-300 underline"
                          >
                            📄 Open Document
                          </a>
                        )}

                        {msg.messageType === "image" && (
                          <img
                            src={msg.file}
                            alt="chat-file"
                            className="rounded-xl max-w-full"
                          />
                        )}

                        {msg.messageType === "audio" && (
                          <audio controls className="w-full">
                            <source src={msg.audio} type="audio/webm" />
                          </audio>
                        )}

                        <div className="flex justify-end items-center gap-1 mt-1">
                          <span className="text-[11px] opacity-70">
                            {messageTime}
                          </span>

                          {isOwnMessage && (
                            <span className="text-[11px] opacity-70">✓✓</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Expiry Banner */}
            {!canSendMessage && (
              <div className="bg-red-600 py-3 text-center text-sm font-medium text-white">
                {expiryReason || "Consultation chat has expired"}
              </div>
            )}

            {/* Input */}
            {canSendMessage && (
              <div className="sticky bottom-0 z-20 theme-card border-t theme-border p-2">
                <div className="flex items-center theme-soft rounded-full px-3 py-2 gap-2">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-yellow-400 text-xl hover:scale-110 transition"
                  >
                    <FaSmile />
                  </button>

                  <label className="cursor-pointer theme-text-muted hover:opacity-80">
                    <FaPaperclip size={20} />
                    <input type="file" hidden onChange={handleFileUpload} />
                  </label>

                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none text-sm px-2 min-w-0"
                  />

                  <button
                    onMouseDown={startVoiceRecording}
                    onMouseUp={stopRecording}
                    className={`transition ${isRecording
                        ? "text-red-500 scale-110"
                        : "theme-text-muted hover:opacity-80"
                      }`}
                  >
                    <FaMicrophone size={20} />
                  </button>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!messageText.trim()}
                    className="bg-[#0ea5e9] hover:bg-[#0284c8] text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 transition"
                  >
                    ➤
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center theme-text-muted">
            <div className="text-6xl mb-6 opacity-50">💬</div>

            <p className="text-center text-base sm:text-xl px-4">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmoji && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 shadow-2xl max-w-[95vw]">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                setMessageText((prev) => prev + emoji.emoji)
              }
              width={window.innerWidth < 640 ? 300 : 350}
              height={window.innerWidth < 640 ? 350 : 400}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
