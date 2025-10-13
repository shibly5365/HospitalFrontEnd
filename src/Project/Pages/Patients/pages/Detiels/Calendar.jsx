// Calendar.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ selectedDate, onSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = useMemo(
    () => new Date(currentYear, currentMonth + 1, 0).getDate(),
    [currentMonth, currentYear]
  );

  const startDayIndex = useMemo(
    () => new Date(currentYear, currentMonth, 1).getDay(),
    [currentMonth, currentYear]
  );

  const endDayIndex = useMemo(
    () => new Date(currentYear, currentMonth, daysInMonth).getDay(),
    [currentMonth, currentYear, daysInMonth]
  );

  // Previous month's last days to fill the first week
  const prevMonthDays = useMemo(() => {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    return Array.from({ length: startDayIndex }, (_, i) => ({
      d: daysInPrevMonth - startDayIndex + i + 1,
      type: "prev",
      month: prevMonth,
      year: prevYear,
    }));
  }, [currentMonth, currentYear, startDayIndex]);

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    d: i + 1,
    type: "current",
    month: currentMonth,
    year: currentYear,
  }));

  // Next month's first days to fill the last week
  const nextMonthDays = useMemo(() => {
    const remaining = 6 - endDayIndex;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    return Array.from({ length: remaining }, (_, i) => ({
      d: i + 1,
      type: "next",
      month: nextMonth,
      year: nextYear,
    }));
  }, [currentMonth, currentYear, endDayIndex]);

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  const handlePrev = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);


        
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-semibold text-gray-800">
          {monthName} {currentYear}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous month"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next month"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-3 text-sm font-medium text-gray-500 mb-4">
        {weekdays.map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2">
        {allDays.map(({ d, type, month, year }, i) => {
          const dateObj = new Date(year, month, d);
          const isToday = dateObj.toDateString() === today.toDateString();
          const isSelected =
            selectedDate instanceof Date &&
            dateObj.toDateString() === selectedDate.toDateString();

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect && onSelect(dateObj)}
              className={`h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                ${isSelected
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200"
                  : isToday
                  ? "border border-purple-500 text-purple-700 font-semibold"
                  : type === "current"
                  ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 bg-gray-50"}
              `}
              aria-pressed={isSelected}
            >
              {d}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
