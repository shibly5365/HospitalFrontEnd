import React from "react";
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle,
  Star,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      icon: Users,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: "+12% this month",
      change: "up",
    },

    {
      title: "Today's Appointments",
      value: "14",
      icon: Calendar,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      trend: "3 remaining",
      change: "neutral",
    },

    {
      title: "Pending Consults",
      value: "7",
      icon: Clock,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      trend: "2 urgent",
      change: "up",
    },

    {
      title: "Revenue",
      value: "₹8.4L",
      icon: DollarSign,
      iconBg: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-400",
      trend: "+18% vs last month",
      change: "up",
    },

    {
      title: "Emergency Cases",
      value: "3",
      icon: AlertTriangle,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
      trend: "Today",
      change: "down",
    },

    {
      title: "Rating",
      value: "4.8",
      icon: Star,
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      trend: "⭐ 128 reviews",
      change: "up",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative overflow-hidden bg-[var(--surface)] rounded-2xl p-5 border border-[var(--line)] shadow-sm hover:shadow-md transition-all "
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[var(--muted)] text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-1 text-[var(--text)]">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}
            >
              <stat.icon size={22} />
            </div>
          </div>
          <p
            className={`text-xs mt-3 ${stat.change === "up" ? "text-emerald-600" : stat.change === "down" ? "text-red-600" : "text-[var(--muted)]"}`}
          >
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
