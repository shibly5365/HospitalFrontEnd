import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

export default function AppointmensCalender({ selectedDate, onSelect }) {
  console.log(selectedDate);
  
  const today = new Date();
  const currentMonth = startOfMonth(selectedDate || new Date());
  const monthStart = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const monthEnd = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Appointment Calendar
      </h2>

      <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {allDays.map((dateObj, idx) => {
          const isSelected = selectedDate && isSameDay(dateObj, selectedDate);
          const isToday = isSameDay(dateObj, today);
          const type = isSameMonth(dateObj, currentMonth) ? "current" : "other";

          return (
            <button
              key={idx}
              onClick={() => onSelect(dateObj)}
              className={`h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200"
                    : isToday
                    ? "border border-purple-500 text-purple-700 font-semibold"
                    : type === "current"
                    ? "bg-gray-50 text-gray-700 hover:bg-purple-50"
                    : "text-gray-300 bg-gray-50"
                }`}
            >
              {format(dateObj, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
