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
      await apiClient.post(
        "/message/send-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-[#0f172a] text-white overflow-hidden">
      {/* ==================== SIDEBAR ==================== */}
     <div className="w-full md:w-80 border-r border-gray-700 bg-[#1e2937] flex flex-col md:h-full h-[35vh]">
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-gray-700 bg-[#1e2937]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Messages</h2>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-500">
              +
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors or chats..."
              className="w-full bg-[#334155] text-sm pl-11 pr-4 py-2.5 rounded-full outline-none border border-gray-600 focus:border-blue-500"
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
                    className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-[#334155]
          ${activeConversation?._id === convo._id ? "bg-[#334155]" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        👨‍⚕️
                      </div>

                      <div>
                        <h3 className="font-semibold">{otherUser?.fullName}</h3>

                        <p className="text-sm text-gray-400">
                          {otherUser?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="p-3 text-gray-400 text-sm text-center mt-8">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* ==================== MAIN CHAT AREA ==================== */}
     <div className="flex-1 flex flex-col bg-[#0f172a] min-h-0">
        {activeConversation ? (
          <>
            {/* Chat Header - WhatsApp Style */}
            <div className="min-h-[64px] bg-[#1e2937] border-b border-gray-700 px-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
                    👨‍⚕️
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1e2937]"></div>
                </div>

                <div>
                 <h3 className="font-semibold text-base sm:text-lg">
                    {activeConversation.members?.find(
                      (m) => m._id?.toString() !== user?._id?.toString(),
                    )?.fullName || "Doctor"}
                  </h3>
                  <p className="text-green-500 text-sm flex items-center gap-1">
                    ● Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-xl sm:text-2xl text-gray-300">
                <FaPhone className="cursor-pointer hover:text-white transition-colors" />
                <FaVideo className="cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Messages Area - WhatsApp Background */}
            <div
              className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-2
                         bg-repeat bg-center custom-scrollbar"
              style={{ backgroundColor: "#0f172a" }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isOwnMessage =
                    msg.sender?._id?.toString() === user?._id?.toString();

                  // ✅ memo-friendly lightweight time formatting
                  const messageTime = new Date(
                    msg.createdAt || msg.timestamp,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <motion.div
                      key={msg._id}
                      // ✅ lighter animation
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.15,
                      }}
                      layout="position"
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm sm:text-[15.2px] leading-relaxed shadow-sm
          ${
            isOwnMessage
              ? "bg-[#0ea5e9] text-white rounded-br-none"
              : "bg-[#1e2937] text-gray-100 rounded-bl-none"
          }`}
                      >
                        {msg.messageType === "text" && <p>{msg.text}</p>}

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

                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-75">
                            {messageTime}
                          </span>

                          {isOwnMessage && <span className="text-xs">✓✓</span>}
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
              <div className="bg-red-600 py-3 text-center font-medium text-sm border-t border-red-700">
                {expiryReason || "Consultation chat has expired"}
              </div>
            )}

            {/* Input Area - WhatsApp Style */}
            {canSendMessage && (
             <div className="bg-[#1e2937] border-t border-gray-700 px-2 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center bg-[#334155] rounded-3xl px-2 sm:px-5 py-2 gap-1 sm:gap-2">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-yellow-400 hover:text-yellow-300 text-xl sm:text-2xl px-1 sm:px-2"
                  >
                    <FaSmile />
                  </button>

                  <label className="cursor-pointer px-3 text-gray-300 hover:text-white">
                    <FaPaperclip size={22} />
                    <input type="file" hidden onChange={handleFileUpload} />
                  </label>

                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none px-2 sm:px-4 text-sm sm:text-[15.5px] min-w-0"
                  />

                  <button
                    onMouseDown={startVoiceRecording}
                    onMouseUp={stopRecording}
                    className={`px-1 sm:px-3 transition ${isRecording ? "text-red-500 scale-110" : "text-gray-300 hover:text-white"}`}
                  >
                    <FaMicrophone size={23} />
                  </button>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!messageText.trim()}
                    className="ml-1 sm:ml-2 bg-[#0ea5e9] hover:bg-[#0284c8] text-white w-10 h-10 flex items-center justify-center rounded-full disabled:opacity-50 transition"
                  >
                    ↑
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="text-6xl mb-6 opacity-50">💬</div>
            <p className="text-base sm:text-xl text-center px-4">Select a conversation to start messaging</p>
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
