import React from "react";
import { CalendarCheck, CheckCircle, Clock, TrendingUp } from "lucide-react";

const StatsCards = ({ stats }) => {
  const statItems = [
    { label: "Total Today", value: stats.total, color: "blue", icon: CalendarCheck },
    { label: "Confirmed", value: stats.confirmed, color: "emerald", icon: CheckCircle },
    { label: "Pending", value: stats.pending, color: "amber", icon: Clock },
    { label: "Completed", value: stats.completed, color: "slate", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{item.label}</p>
              <p className="text-4xl font-semibold text-gray-900 mt-3 tracking-tighter">
                {item.value}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-${item.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <item.icon className={`text-${item.color}-600`} size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;