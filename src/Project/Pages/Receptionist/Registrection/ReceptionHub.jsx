import React, { useState } from "react";
import { Phone, PhoneCall, PhoneOff, MessageCircle } from "lucide-react";

const ReceptionHub = () => {
  const [selectedChat, setSelectedChat] = useState("Dr. Sarah Johnson");

  const calls = [
    { name: "Sarah Johnson", number: "+1 (555) 123-4567", status: "Ringing" },
    { name: "Dr. Michael Chen", number: "+1 (555) 987-6543", status: "Ongoing", time: "2:45" },
    { name: "Emma Williams", number: "+1 (555) 456-7890", status: "Missed" },
  ];

  const messages = [
    { id: 1, name: "Dr. Sarah Johnson", time: "2:45 PM", unread: 2, online: true },
    { id: 2, name: "Mike Thomas", time: "1:30 PM", unread: 0, online: false },
    { id: 3, name: "Dr. Emily Davis", time: "12:15 PM", unread: 1, online: true },
    { id: 4, name: "Jessica Lee", time: "11:45 AM", unread: 0, online: false },
  ];

  const conversation = [
    { sender: "Dr. Sarah Johnson", text: "Hello! I need to reschedule my appointment for tomorrow.", time: "2:30 PM", me: false },
    { sender: "Me", text: "Of course! What time would work better for you?", time: "2:32 PM", me: true },
    { sender: "Dr. Sarah Johnson", text: "How about Friday at 3 PM?", time: "2:35 PM", me: false },
    { sender: "Me", text: "Perfect! I've rescheduled your appointment with Dr. Smith for Friday, December 29th at 3:00 PM.", time: "2:36 PM", me: true },
    { sender: "Dr. Sarah Johnson", text: "Thank you so much!", time: "2:40 PM", me: false },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-white shadow px-4 py-3">
        <div className="flex gap-6 text-sm">
          {["Patient Form", "Patient Portal", "Patient Info", "Patient Directory", "Receptionist", "Reception Hub", "Schedule", "Admin Panel", "Doctor Hub"].map((tab, i) => (
            <button key={i} className={`px-2 ${tab === "Reception Hub" ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-600 text-white p-6 text-xl font-semibold">
        Receptionist Dashboard
        <p className="text-sm font-normal">Manage phone calls and messages efficiently</p>
      </div>

      {/* Content */}
      <div className="flex flex-1 gap-4 p-6">
        {/* Phone Calls */}
        <div className="w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="font-semibold mb-4 flex items-center gap-2">📞 Phone Calls</h2>

          <div className="flex gap-4 mb-3 border-b pb-2 text-sm font-medium text-gray-600">
            <button className="text-blue-600">Active Calls</button>
            <button>Call History</button>
          </div>

          <div className="flex flex-col gap-3">
            {calls.map((call, i) => (
              <div key={i} className="flex items-center justify-between border rounded-lg px-3 py-2">
                <div>
                  <p className="font-medium">{call.name}</p>
                  <p className="text-xs text-gray-500">{call.number}</p>
                </div>
                {call.status === "Ringing" && (
                  <div className="flex gap-2">
                    <span className="text-yellow-500 font-semibold">Ringing</span>
                    <PhoneCall className="text-green-500 cursor-pointer" />
                    <PhoneOff className="text-red-500 cursor-pointer" />
                  </div>
                )}
                {call.status === "Ongoing" && <span className="text-green-600">Ongoing</span>}
                {call.status === "Missed" && <span className="text-red-500">Missed</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="w-2/3 bg-white rounded-2xl shadow flex">
          {/* Chat List */}
          <div className="w-1/3 border-r p-3 flex flex-col gap-2">
            <h2 className="font-semibold mb-3">💬 Messages</h2>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${selectedChat === msg.name ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedChat(msg.name)}
              >
                <div>
                  <p className="font-medium">{msg.name}</p>
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
                {msg.unread > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{msg.unread}</span>}
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <div className="border-b p-3 font-medium flex justify-between items-center">
              <span>{selectedChat}</span>
              <span className="text-xs text-green-500">Online</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {conversation.map((msg, i) => (
                <div key={i} className={`flex ${msg.me ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-3 rounded-xl max-w-xs ${msg.me ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                  >
                    {msg.text}
                    <p className="text-[10px] mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionHub;
