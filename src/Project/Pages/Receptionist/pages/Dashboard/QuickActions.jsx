import React from "react";
import { Activity, UserPlus, Search, CalendarDays, CreditCard, Send, FileCheck } from "lucide-react";

const QuickActions = () => {
  const quickActions = [
    { icon: UserPlus, label: "Register", gradient: "from-blue-500 to-cyan-500" },
    { icon: Search, label: "Search", gradient: "from-emerald-500 to-teal-500" },
    { icon: CalendarDays, label: "Schedule", gradient: "from-purple-500 to-pink-500" },
    { icon: CreditCard, label: "Payment", gradient: "from-amber-500 to-orange-500" },
    { icon: Send, label: "Message", gradient: "from-rose-500 to-pink-500" },
    { icon: FileCheck, label: "Records", gradient: "from-indigo-500 to-purple-500" }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          Quick Actions
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <ActionButton key={index} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ action }) => {
  const IconComponent = action.icon;
  
  return (
    <button className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-transparent">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
        {action.label}
      </span>
    </button>
  );
};

export default QuickActions;