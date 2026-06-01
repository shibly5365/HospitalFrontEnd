import React from "react";

const weekDays = [
  { id: 1, name: "Monday", short: "Mon" },
  { id: 2, name: "Tuesday", short: "Tue" },
  { id: 3, name: "Wednesday", short: "Wed" },
  { id: 4, name: "Thursday", short: "Thu" },
  { id: 5, name: "Friday", short: "Fri" },
  { id: 6, name: "Saturday", short: "Sat" },
  { id: 0, name: "Sunday", short: "Sun" },
];

const ScheduleTypeSelector = ({
  isRecurring,
  setIsRecurring,
  selectedDate,
  setSelectedDate,
  recurringDays,
  setRecurringDays,
}) => {
  const toggleRecurringDay = (day) => {
    setRecurringDays((prev) =>
      prev.find((d) => d.id === day.id)
        ? prev.filter((d) => d.id !== day.id)
        : [...prev, day],
    );
  };

  return (
    <>
      {/* TYPE SELECTOR */}
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setIsRecurring(false)}
          className={`
          flex-1
          py-3 px-4
          rounded-xl
          border-2
          text-center
          transition-all

          ${
            !isRecurring
              ? "border-[var(--brand)] bg-[var(--surface-soft)] text-[var(--brand)]"
              : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)]"
          }
        `}
        >
          Specific Date
        </button>

        <button
          type="button"
          onClick={() => setIsRecurring(true)}
          className={`
          flex-1
          py-3 px-4
          rounded-xl
          border-2
          text-center
          transition-all

          ${
            isRecurring
              ? "border-[var(--brand)] bg-[var(--surface-soft)] text-[var(--brand)]"
              : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)]"
          }
        `}
        >
          Recurring Weekly
        </button>
      </div>

      {/* SINGLE DATE */}
      {!isRecurring ? (
        <div>
          <label
            className="
          block
          text-sm font-medium
          text-[var(--text)]
          mb-2
        "
          >
            Select Date
          </label>

          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
            w-full
            p-3
            border border-[var(--line)]
            rounded-xl
            bg-[var(--surface)]
            text-[var(--text)]
            outline-none
            focus:ring-2 focus:ring-[var(--brand)]
            focus:border-transparent
          "
          />
        </div>
      ) : (
        <div>
          <label
            className="
          block
          text-sm font-medium
          text-[var(--text)]
          mb-2
        "
          >
            Select Days of Week
          </label>

          <div className="grid grid-cols-4 gap-2">
            {weekDays.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleRecurringDay(day)}
                className={`
                p-3
                rounded-xl
                border-2
                text-sm font-medium
                transition-all

                ${
                  recurringDays.find((d) => d.id === day.id)
                    ? "border-[var(--brand)] bg-[var(--surface-soft)] text-[var(--brand)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)]"
                }
              `}
              >
                {day.short}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleTypeSelector;
