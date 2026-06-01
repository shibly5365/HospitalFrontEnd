import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const CalendarWidget = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Calendar</h2>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)),
              )
            }
            className="p-1.5 rounded-lg hover:bg-[var(--surface-soft)]"
          >
            <ChevronRight className="rotate-180" size={18} />
          </button>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)),
              )
            }
            className="p-1.5 rounded-lg hover:bg-[var(--surface-soft)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <p className="text-center font-medium mb-4">
        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </p>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--muted)] mb-2">
        {weekDays.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({
          length: new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1,
          ).getDay(),
        }).map((_, i) => (
          <div key={`empty-${i}`} className="py-2"></div>
        ))}
        {getDaysInMonth(currentMonth).map((date, i) => {
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div
              key={i}
              className={`py-2 rounded-xl cursor-pointer hover:bg-[var(--surface-soft)] ${isToday ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--line)]">
        <p className="text-xs text-[var(--muted)] flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 3
          appointments today
        </p>
        <p className="text-xs text-[var(--muted)] flex items-center gap-2 mt-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 2
          follow-ups tomorrow
        </p>
      </div>
    </div>
  );
};

export default CalendarWidget;
