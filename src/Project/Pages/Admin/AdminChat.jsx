import React, { useState } from "react";
import {
  Send,
  Users,
  Phone,
  Video,
  MoreVertical,
  Plus,
  Search,
  Info,
  UserPlus,
  Volume2,
  Trash2,
  X,
} from "lucide-react";

const AdminChat = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState(1);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [message, setMessage] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isAdminOnly, setIsAdminOnly] = useState(true);
  const [selectedGroupType, setSelectedGroupType] = useState("staff");
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // New: WhatsApp Style Message Selection
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Mock Data
  const contacts = [
    {
      id: 1,
      name: "Dr. Sarah Khan",
      role: "doctor",
      avatar: "https://i.pravatar.cc/150?img=32",
      status: "online",
    },
    {
      id: 2,
      name: "Dr. Arjun Menon",
      role: "doctor",
      avatar: "https://i.pravatar.cc/150?img=44",
      status: "offline",
      lastSeen: "2h ago",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "receptionist",
      avatar: "https://i.pravatar.cc/150?img=45",
      status: "online",
    },
    {
      id: 4,
      name: "Dr. Meera Nair",
      role: "doctor",
      avatar: "https://i.pravatar.cc/150?img=33",
      status: "online",
    },
    {
      id: 5,
      name: "Rohan Patel",
      role: "receptionist",
      avatar: "https://i.pravatar.cc/150?img=67",
      status: "offline",
      lastSeen: "Yesterday",
    },
  ];

  const [groups, setGroups] = useState([
    {
      id: 101,
      name: "All Doctors",
      members: 12,
      type: "doctors",
      isAdminOnly: true,
      memberList: [1, 2, 4],
    },
    {
      id: 102,
      name: "Reception Team",
      members: 8,
      type: "receptionists",
      isAdminOnly: false,
      memberList: [3, 5],
    },
    {
      id: 103,
      name: "Emergency Staff",
      members: 25,
      type: "staff",
      isAdminOnly: true,
      memberList: [1, 2, 3, 4, 5],
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning team. How are patient numbers looking today?",
      isAdmin: true,
      time: "09:15",
    },
    {
      id: 2,
      text: "Morning sir. We have 47 appointments scheduled.",
      isAdmin: false,
      time: "09:17",
    },
    {
      id: 3,
      text: "Dr. Sarah will be late by 30 mins due to traffic.",
      isAdmin: false,
      time: "09:18",
    },
  ]);

  const currentChat = isGroupChat
    ? groups.find((g) => g.id === selectedChat)
    : contacts.find((c) => c.id === selectedChat);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      text: message,
      isAdmin: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setMessage("");
  };

  // ==================== MESSAGE DELETE FUNCTIONS ====================
  const toggleMessageSelection = (msgId) => {
    if (!messages.find((m) => m.id === msgId)?.isAdmin) return; // Only allow selecting own messages

    if (selectedMessages.includes(msgId)) {
      const newSelected = selectedMessages.filter((id) => id !== msgId);
      setSelectedMessages(newSelected);
      if (newSelected.length === 0) setIsSelectionMode(false);
    } else {
      setSelectedMessages([...selectedMessages, msgId]);
      setIsSelectionMode(true);
    }
  };

  const deleteSelectedMessages = () => {
    setMessages(messages.filter((msg) => !selectedMessages.includes(msg.id)));
    cancelSelection();
  };

  const cancelSelection = () => {
    setSelectedMessages([]);
    setIsSelectionMode(false);
  };

  const createGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members: 1,
      type: selectedGroupType,
      isAdminOnly: isAdminOnly,
      memberList: [],
    };

    setGroups([...groups, newGroup]);
    alert(
      `Group "${newGroupName}" created successfully! (${isAdminOnly ? "Admin Only" : "Everyone can reply"})`,
    );

    setNewGroupName("");
    setShowNewGroupModal(false);
    setIsAdminOnly(true);
  };

  const menuOptions = [
    { label: "Group Info", icon: Info, action: () => setShowGroupInfo(true) },
    {
      label: "Add Member",
      icon: UserPlus,
      action: () => alert("Add member feature coming soon"),
    },
    {
      label: "Mute Notifications",
      icon: Volume2,
      action: () => alert("Muted"),
    },
    {
      label: "Delete Group",
      icon: Trash2,
      action: () => alert("Group deleted"),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar - Contacts & Groups */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">Clinic Admin</h1>
                <p className="text-xs text-gray-400">Hospital Management</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewGroupModal(true)}
              className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl pl-10 py-2.5 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          {["all", "doctors", "receptionists", "groups"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "groups") {
                  setIsGroupChat(true);
                  setSelectedChat(groups[0]?.id || 101);
                } else {
                  setIsGroupChat(false);
                }
              }}
              className={`flex-1 py-3 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {activeTab === "groups"
            ? groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => {
                    setSelectedChat(group.id);
                    setIsGroupChat(true);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-gray-900 transition-all ${selectedChat === group.id ? "bg-gray-900" : ""}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{group.name}</p>
                    <p className="text-xs text-gray-400">
                      {group.members} members •{" "}
                      {group.isAdminOnly ? "Admin Only" : "Open"}
                    </p>
                  </div>
                </div>
              ))
            : /* Contacts list same as before */
              contacts
                .filter((c) => activeTab === "all" || c.role === activeTab)
                .map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedChat(contact.id);
                      setIsGroupChat(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-gray-900 ${selectedChat === contact.id ? "bg-gray-900" : ""}`}
                  >
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt=""
                        className="w-10 h-10 rounded-2xl"
                      />
                      {contact.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-950" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {contact.role}
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Selection Mode or Normal Header */}
        {isSelectionMode ? (
          <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center px-6 justify-between z-50">
            <div className="flex items-center gap-4">
              <button
                onClick={cancelSelection}
                className="p-2 hover:bg-gray-800 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
              <p className="font-medium">{selectedMessages.length} selected</p>
            </div>

            <button
              onClick={deleteSelectedMessages}
              className="flex items-center gap-2 px-5 py-2 text-red-500 hover:bg-gray-800 rounded-xl font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        ) : (
          currentChat && (
            <div className="h-16 border-b border-gray-800 px-6 flex items-center justify-between bg-gray-950">
              <div className="flex items-center gap-4">
                {isGroupChat ? (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                ) : (
                  <img
                    src={currentChat.avatar}
                    alt=""
                    className="w-10 h-10 rounded-2xl"
                  />
                )}
                <div>
                  <h2 className="font-semibold">{currentChat.name}</h2>
                  <p className="text-xs text-emerald-400">
                    {isGroupChat
                      ? `${currentChat.members} members • ${currentChat.isAdminOnly ? "Admin Only" : "Everyone can reply"}`
                      : "Online"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-900 rounded-xl">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-900 rounded-xl">
                  <Video className="w-5 h-5" />
                </button>
                {isGroupChat && (
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-900 rounded-xl"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                )}
                {showMenu && (
                  <div className="absolute right-0 top-12 bg-gray-900 border border-gray-700 rounded-2xl py-2 w-56 shadow-xl z-50">
                    {menuOptions.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          item.action();
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-800 text-left"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[length:20px_20px]">
          {messages.map((msg) => {
            const isSelected = selectedMessages.includes(msg.id);
            return (
              <div
                key={msg.id}
                className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                onClick={() => toggleMessageSelection(msg.id)}
              >
                <div
                  className={`max-w-[65%] flex flex-col ${msg.isAdmin ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-5 py-3 rounded-3xl text-[15px] leading-relaxed transition-all cursor-pointer
                      ${msg.isAdmin ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-800 text-gray-100 rounded-bl-none"}
                      ${isSelected ? "ring-2 ring-blue-400 scale-[1.02]" : ""}`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Input */}
        <div className="p-4 border-t border-gray-800 bg-gray-950">
          <div className="flex gap-3 bg-gray-900 rounded-3xl p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                isGroupChat && currentChat?.isAdminOnly
                  ? "Only you can send messages..."
                  : "Type a message..."
              }
              className="flex-1 bg-transparent px-5 py-3 focus:outline-none text-sm"
              disabled={
                isGroupChat && currentChat?.isAdminOnly === false && false
              } // You can allow staff reply later
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Group Info Sidebar (Like WhatsApp) */}
      {isGroupChat && showGroupInfo && (
        <div className="w-80 border-l border-gray-800 bg-gray-950 overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Group Info</h3>
              <button
                onClick={() => setShowGroupInfo(false)}
                className="text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                <Users className="w-12 h-12" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{currentChat.name}</h2>
              <p className="text-gray-400">{currentChat.members} members</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">MEMBERS</p>
              {contacts
                .filter((c) => currentChat.memberList?.includes(c.id))
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 py-3 border-b border-gray-800"
                  >
                    <img
                      src={member.avatar}
                      className="w-9 h-9 rounded-2xl"
                      alt=""
                    />
                    <div>
                      <p>{member.name}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal - Enhanced */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6">Create New Group</h3>

            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 mb-6 focus:outline-none focus:border-blue-600"
              placeholder="Group Name"
            />

            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-3 block">
                Group Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["staff", "doctors", "receptionists"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedGroupType(type)}
                    className={`py-4 rounded-2xl text-sm capitalize ${selectedGroupType === type ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-2xl">
              <div>
                <p className="font-medium">Admin Only Messages</p>
                <p className="text-sm text-gray-400">
                  Only admin can send messages
                </p>
              </div>
              <button
                onClick={() => setIsAdminOnly(!isAdminOnly)}
                className={`w-12 h-7 rounded-full relative transition-colors ${isAdminOnly ? "bg-blue-600" : "bg-gray-600"}`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isAdminOnly ? "right-1" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="flex-1 py-4 text-gray-400 hover:bg-gray-800 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-medium"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChat;
