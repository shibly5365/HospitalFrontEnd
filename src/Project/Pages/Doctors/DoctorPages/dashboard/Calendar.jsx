import React from "react";
import { CalendarDays } from "lucide-react";

const Calendar = () => {
  const weekDays = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
  const dates = [
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
    1, 2, 3, 4, 5, 6, 7
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <CalendarDays className="text-blue-600" size={20} />
        December - 2021
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`p-2 rounded text-xs ${
              date === 21
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } cursor-pointer`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;