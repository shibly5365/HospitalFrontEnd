import React from "react";
import { Users, UserCheck, AlertCircle, Clock, Activity } from "lucide-react";

const StatsCards = ({ stats, emergencyMode }) => {

  const cards = [
    {
      title: "Available Doctors",
      value: stats?.stats?.availableDoctors || 0,
      icon: UserCheck,
      color: "bg-green-100",
      textColor: "text-green-700",
      bgIcon: "bg-green-500",
    },
    {
      title: "Available Staff",
      value: stats?.stats?.availableReceptionists || 0,
      icon: Users,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      bgIcon: "bg-blue-500",
    },
    {
      title: "Total Staff",
      value: stats?.stats?.totalStaff || 0,
      icon: Activity,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      bgIcon: "bg-purple-500",
    },
    {
      title: "On Leave",
      value: stats?.stats?.doctorsOnLeave || 0,
      icon: Clock,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      bgIcon: "bg-yellow-500",
    },
    {
      title: "Emergency Alerts",
      value: stats.emergency_alerts || 0,
      icon: AlertCircle,
      color: emergencyMode ? "bg-red-200" : "bg-orange-100",
      textColor: emergencyMode ? "text-red-900" : "text-orange-700",
      bgIcon: emergencyMode ? "bg-red-600" : "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">
                {card.title}
              </h3>
              <div className={`${card.bgIcon} p-2 rounded-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className={`text-3xl font-bold ${card.textColor}`}>
              {card.value}
            </div>
            {emergencyMode && card.title === "Emergency Alerts" && (
              <p className="text-xs text-red-600 mt-2 font-semibold">
                ⚠️ Priority Mode
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
