import React from "react";
import {
  FileText,
  Activity,
  ClipboardList,
} from "lucide-react";

const StatsCards = ({ prescriptions }) => {
  const stats = [
    {
      label: "Total Prescriptions",
      value: prescriptions.length,
      icon: FileText,
      border: "border-blue-600",
      iconColor: "text-blue-600",
    },

    {
      label: "Active Prescriptions",
      value: prescriptions.filter(
        (p) => p.status === "Active",
      ).length,
      icon: Activity,
      border: "border-green-600",
      iconColor: "text-green-600",
    },

    {
      label: "Completed",
      value: prescriptions.filter(
        (p) => p.status === "Completed",
      ).length,
      icon: ClipboardList,
      border: "border-gray-600",
      iconColor: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            bg-[var(--surface)]
            rounded-xl
            shadow-sm
            p-6
            border-l-4
            ${stat.border}
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)] mb-1">
                {stat.label}
              </p>

              <p className="text-3xl font-bold text-[var(--text)]">
                {stat.value}
              </p>
            </div>

            <stat.icon
              className={`w-12 h-12 opacity-20 ${stat.iconColor}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;