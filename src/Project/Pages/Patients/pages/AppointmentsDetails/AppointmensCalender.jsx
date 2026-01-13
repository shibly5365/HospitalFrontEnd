import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
} from "date-fns";

export default function AppointmentsCalendar({
  selectedDate,
  onSelect,
  availableDates = [],
  doctorAvailableDates = null,
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(selectedDate || today)
  );

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(startOfMonth(selectedDate));
    }
  }, [selectedDate]);

  const monthStart = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const monthEnd = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Determine if date is selectable
  const isAvailableDate = (date) => {
    const formatted = format(date, "yyyy-MM-dd");

    // Only use doctorAvailableDates if a doctor is selected
    if (doctorAvailableDates && doctorAvailableDates.length > 0) {
      return doctorAvailableDates.includes(formatted);
    }

    // Otherwise, patient mode: all dates selectable (or availableDates)
    return availableDates.length === 0 || availableDates.includes(formatted);
  };


  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-md">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ◀
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-2">
        {allDays.map((dateObj, idx) => {
          const isSelected = selectedDate && isSameDay(dateObj, selectedDate);
          const isToday = isSameDay(dateObj, today);
          const type = isSameMonth(dateObj, currentMonth) ? "current" : "other";
          const available = isAvailableDate(dateObj);

          return (
            <button
              key={idx}
              onClick={() => available && onSelect(dateObj)}
              className={`h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                ${isSelected
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200"
                  : isToday
                    ? "border border-purple-500 text-purple-700 font-semibold"
                    : type === "current"
                      ? available
                        ? "bg-gray-50 text-gray-700 hover:bg-purple-50 cursor-pointer"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "text-gray-300 bg-gray-50"
                }`}
              disabled={!available}
            >
              {format(dateObj, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
