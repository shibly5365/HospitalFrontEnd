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

  const [currentMonth, setCurrentMonth] =
    useState(
      startOfMonth(
        selectedDate || today
      )
    );

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(
        startOfMonth(selectedDate)
      );
    }
  }, [selectedDate]);

  const monthStart = startOfWeek(
    currentMonth,
    {
      weekStartsOn: 1,
    }
  );

  const monthEnd = endOfWeek(
    endOfMonth(currentMonth),
    {
      weekStartsOn: 1,
    }
  );

  const allDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  // Available Dates
  const isAvailableDate = (date) => {
    const formatted = format(
      date,
      "yyyy-MM-dd"
    );

    if (
      doctorAvailableDates &&
      doctorAvailableDates.length > 0
    ) {
      return doctorAvailableDates.includes(
        formatted
      );
    }

    return (
      availableDates.length === 0 ||
      availableDates.includes(formatted)
    );
  };

  return (
    <div
      className="
        p-3
        sm:p-4
        theme-card
        rounded-2xl
        shadow-md
        w-full
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentMonth((prev) =>
              subMonths(prev, 1)
            )
          }
          className="
            px-3
            py-1
            rounded-lg
            theme-soft
            theme-text
            hover:opacity-80
            transition-all
          "
        >
          ◀
        </button>

        <h2 className="text-xl font-semibold theme-text">
          {format(
            currentMonth,
            "MMMM yyyy"
          )}
        </h2>

        <button
          onClick={() =>
            setCurrentMonth((prev) =>
              addMonths(prev, 1)
            )
          }
          className="
            px-3
            py-1
            rounded-lg
            theme-soft
            theme-text
            hover:opacity-80
            transition-all
          "
        >
          ▶
        </button>
      </div>

      {/* Week Days */}
      <div
        className="
          grid
          grid-cols-7
          gap-1
          sm:gap-2
          text-center
          text-xs
          sm:text-sm
          font-medium
          theme-text-muted
          mb-2
        "
      >
        {[
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ].map((day) => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {allDays.map(
          (dateObj, idx) => {
            const isSelected =
              selectedDate &&
              isSameDay(
                dateObj,
                selectedDate
              );

            const isToday =
              isSameDay(
                dateObj,
                today
              );

            const type =
              isSameMonth(
                dateObj,
                currentMonth
              )
                ? "current"
                : "other";

            const available =
              isAvailableDate(dateObj);

            return (
              <button
                key={idx}
                onClick={() =>
                  available &&
                  onSelect(dateObj)
                }
                disabled={!available}
                className={`
                  h-9
                  sm:h-11
                  md:h-12
                  text-xs
                  sm:text-sm
                  rounded-lg
                  sm:rounded-xl
                  flex
                  items-center
                  justify-center
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isSelected
                      ? `
                        bg-gradient-to-r
                        from-purple-600
                        to-indigo-600
                        text-white
                        shadow-lg
                        shadow-purple-200
                      `
                      : isToday
                      ? `
                        border
                        border-purple-500
                        text-purple-600
                        font-semibold
                      `
                      : type === "current"
                      ? available
                        ? `
                          theme-soft
                          theme-text
                          hover:bg-white/5
                          cursor-pointer
                        `
                        : `
                          theme-soft
                          theme-text-muted
                          cursor-not-allowed
                          opacity-50
                        `
                      : `
                        opacity-40
                        theme-soft
                        theme-text-muted
                      `
                  }
                `}
              >
                {format(
                  dateObj,
                  "d"
                )}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}