import React from "react";
import { Calendar, Clock, Stethoscope } from "lucide-react";

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "today", label: "Today's Appointments", icon: Calendar },
    { id: "upcoming", label: "Upcoming", icon: Clock },
    { id: "availability", label: "Doctor Availability", icon: Stethoscope },
    { id: "all", label: "All Appointments", icon: Calendar },
  ];

  return (
    <div className="mb-6">
      <div className="flex gap-4 flex-wrap">
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
    </div>
  );
}