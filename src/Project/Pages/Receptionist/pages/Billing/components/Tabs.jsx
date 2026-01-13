import React from "react";
import { DollarSign, Clock, CheckCircle } from "lucide-react";

const tabs = [
  { id: "all", label: "All Payments", icon: DollarSign, color: "blue" },
  { id: "pending", label: "Pending", icon: Clock, color: "yellow" },
  { id: "completed", label: "Completed", icon: CheckCircle, color: "green" },
];

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-700 text-white shadow-lg shadow-${tab.color}-500/30`
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Icon size={20} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}