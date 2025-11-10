// components/StatsCards.jsx
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

export default function StatsCards({ appointments }) {
  const getStatusCount = (status) => {
    return appointments.filter((a) => a.status === status).length;
  };

  const stats = [
    {
      label: "Total",
      value: appointments.length,
      icon: Calendar,
      bgColor: "bg-slate-100",
      iconColor: "text-slate-600"
    },
    {
      label: "Confirmed",
      value: getStatusCount("Confirmed"),
      icon: () => <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200"
    },
    {
      label: "Pending",
      value: getStatusCount("Pending"),
      icon: Clock,
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600"
    },
    {
      label: "In Progress",
      value: getStatusCount("With-Doctor"),
      icon: User,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white rounded-2xl p-5 border hover:shadow-lg transition-shadow ${
            stat.borderColor || "border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.textColor || "text-slate-500"}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold mt-1 ${stat.textColor || "text-slate-800"}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={stat.iconColor} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}