import React, { useState } from "react";
import { Bell, AlertCircle, Calendar, MessageSquare } from "lucide-react";

const NotificationsDropdown = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: 8 },
    { id: "appointments", label: "Appointments", count: 2 },
    { id: "messages", label: "Messages", count: 2 },
    { id: "emergency", label: "Emergency", count: 1 },
  ];

  const notifications = [
    {
      id: 1,
      type: "error",
      title: "Emergency Case Assigned",
      message: "Critical patient admitted to ER - Room 305",
      time: "2 min ago",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      badge: "error",
    },
    {
      id: 2,
      type: "warning",
      title: "New Appointment Request",
      message: "Sarah Johnson requested appointment for tomorrow 2:30 PM",
      time: "5 min ago",
      icon: <Calendar className="w-5 h-5 text-yellow-500" />,
      badge: "warning",
    },
    {
      id: 3,
      type: "info",
      title: "New Patient Message",
      message: 'John Smith: "Can I reschedule my appointment?"',
      time: "15 min ago",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      badge: "info",
    },
  ];

  return (
    <div className="relative w-80">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold">Notifications</h2>
          <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
            3 new
          </span>
        </div>
        <button className="text-blue-600 text-sm">Mark all read</button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto px-4 py-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 text-sm font-medium ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs rounded-full px-2 py-0.5 ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div className="mt-1">{n.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{n.title}</h3>
              <p className="text-sm text-gray-600">{n.message}</p>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
            <span
              className={`text-xs capitalize rounded px-2 py-0.5 ${
                n.badge === "error"
                  ? "bg-red-100 text-red-600"
                  : n.badge === "warning"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {n.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t text-center">
        <button className="text-blue-600 text-sm font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
