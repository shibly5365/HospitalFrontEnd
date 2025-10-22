import React, { useState } from "react";
import { Search, Plus } from "lucide-react";

const ChatPagePatient = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const conversations = [
    {
      id: 1,
      name: "Dr. Smith",
      role: "Doctor",
      message: "Patient in room 203 needs immediate attention. Please check the vitals.",
      time: "2 mins ago",
      unread: 2,
      statusColor: "text-blue-500",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Patient",
      message: "Thank you for the appointment confirmation. See you tomorrow at 9 AM.",
      time: "15 mins ago",
      unread: 0,
      statusColor: "text-green-500",
      avatar: "",
    },
    {
      id: 3,
      name: "Nurse Mary",
      role: "Staff",
      message: "Emergency patient arriving in 5 minutes. Bed 7 is ready.",
      time: "25 mins ago",
      unread: 1,
      statusColor: "text-pink-500",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-xl font-semibold">Messages</h2>
        <button className="flex items-center bg-pink-500 text-white px-3 py-1.5 rounded-lg hover:bg-pink-600 transition">
          <Plus size={18} className="mr-1" /> New Message
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r bg-white flex flex-col">
          {/* Search */}
          <div className="p-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="ml-2 bg-transparent outline-none text-sm flex-1 py-2"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-around text-sm px-3 mb-2">
            {["All", "Doctors", "Patients", "Staff"].map((tab) => (
              <button
                key={tab}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-start p-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-700 font-semibold">
                      {chat.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">{chat.name}</h4>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{chat.message}</p>
                  <span className={`text-xs font-medium ${chat.statusColor}`}>{chat.role}</span>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center">
          {!selectedChat ? (
            <div className="text-center text-gray-500">
              <div className="text-5xl mb-3">💬</div>
              <p className="font-medium">Select a Conversation</p>
              <p className="text-sm">Choose a conversation from the list to start messaging</p>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full">
              {/* Chat Header */}
              <div className="flex items-center p-4 bg-white border-b shadow-sm">
                <img
                  src={selectedChat.avatar || "https://via.placeholder.com/40"}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                  <p className="text-xs text-gray-500">{selectedChat.role}</p>
                </div>
              </div>

              {/* Empty State (for now) */}
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Chat with {selectedChat.name} will appear here.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPagePatient;
