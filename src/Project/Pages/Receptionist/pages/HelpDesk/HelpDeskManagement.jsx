import React, { useState } from "react";
import { HelpCircle, Stethoscope, FileText, Megaphone, Search, MessageSquare, CheckCircle, Clock } from "lucide-react";

export default function HelpDeskManagement() {
  const [activeTab, setActiveTab] = useState("enquiries");
  const [enquiries, setEnquiries] = useState([]);

  const tabs = [
    { id: "enquiries", label: "General Enquiries", icon: HelpCircle },
    { id: "info", label: "Room / Doctor Info", icon: Stethoscope },
    { id: "lostfound", label: "Lost & Found", icon: FileText },
    { id: "announcements", label: "Announcements", icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Enquiries & Help Desk</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "enquiries" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">General Enquiries</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search enquiries..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {item === 1 ? "Pending" : item === 2 ? "In Progress" : "Resolved"}
                            </span>
                            <span className="text-sm text-gray-500">
                              <Clock size={14} className="inline mr-1" />
                              2 hours ago
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-1">
                            Where is the Cardiology Department?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Visitor: John Doe | Contact: +91 98765 43210
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Respond
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Room / Doctor Info Requests</h2>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope size={18} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">Doctor Information Request</span>
                        <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Resolved
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Request: "What are Dr. Smith's consultation hours?"
                      </p>
                      <p className="text-xs text-gray-500">Requested by: Visitor | 1 hour ago</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "lostfound" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Lost & Found Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Item
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FileText className="text-gray-400" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">Mobile Phone</h3>
                          <p className="text-xs text-gray-500">Found: 2 days ago</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Location: Reception Area | Color: Black
                      </p>
                      <button className="w-full px-3 py-2 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200">
                        Claim Item
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "announcements" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Announcement
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-l-4 border-blue-600 bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800">Hospital Maintenance Notice</h3>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        The Cardiology Department will be closed for maintenance on Saturday, 10 AM - 2 PM.
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Pending Enquiries</span>
                  <span className="font-bold text-blue-600">5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Resolved Today</span>
                  <span className="font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-600">Lost Items</span>
                  <span className="font-bold text-yellow-600">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Active Announcements</span>
                  <span className="font-bold text-purple-600">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
