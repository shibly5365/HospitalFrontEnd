import React from "react";
import { CalendarDays } from "lucide-react";

const StatsCard = ({ title, value, date, bgColor, textColor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-3 rounded-full`}>
          <CalendarDays className={textColor} size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className={`text-3xl font-bold ${textColor}`}>{value}</h2>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;