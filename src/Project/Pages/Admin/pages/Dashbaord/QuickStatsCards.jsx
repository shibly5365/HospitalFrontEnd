import React from "react";
import { FaUser, FaUserMd, FaUsers, FaFileMedical, FaUserFriends, FaMicroscope } from "react-icons/fa";

const QuickStatsCards = () => {
  const stats = [
    { icon: FaUser, color: "text-blue-500", label: "Patients" },
    { icon: FaUserMd, color: "text-purple-500", label: "Doctors" },
    { icon: FaUsers, color: "text-green-500", label: "Receptionists" },
    { icon: FaFileMedical, color: "text-red-500", label: "Prescriptions" },
    { icon: FaUserFriends, color: "text-yellow-500", label: "Visitors" },
    { icon: FaMicroscope, color: "text-indigo-500", label: "Medical Results" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
            <Icon className={`${stat.color} text-2xl mb-2`} />
            <p className="font-semibold">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStatsCards;