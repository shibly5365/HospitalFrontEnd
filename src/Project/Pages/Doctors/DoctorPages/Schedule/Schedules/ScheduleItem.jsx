import React from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const ScheduleItem = ({ schedule, isExpanded, onToggleExpand, onDelete }) => {
  return (
    <div
      className="
    border border-[var(--line)]
    bg-[var(--surface)]
    rounded-xl
    p-4
    hover:border-[var(--brand)]
    hover:shadow-sm
    transition-all
  "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4
            className="
          font-semibold
          text-[var(--text)]
        "
          >
            {schedule.dayName || new Date(schedule.date).toLocaleDateString()}
          </h4>

          <p
            className="
          text-sm
          text-[var(--muted)]
        "
          >
            {schedule.workingHours?.start}
            {" - "}
            {schedule.workingHours?.end}
          </p>
        </div>

        <button
          onClick={onToggleExpand}
          className="
          text-[var(--muted)]
          hover:text-[var(--brand)]
          transition
        "
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* EXPANDED */}
      {isExpanded && (
        <div className="mt-3">
          {/* SLOTS */}
          <div className="flex flex-wrap gap-1 mb-3">
            {schedule.slots?.slice(0, 6).map((slot) => (
              <span
                key={slot._id}
                className="
                  px-2 py-1
                  text-xs
                  rounded-lg

                  bg-green-100
                  dark:bg-green-500/20

                  text-green-700
                  dark:text-green-400
                "
              >
                {slot.start}
                {" - "}
                {slot.end}
              </span>
            ))}

            {schedule.slots?.length > 6 && (
              <span
                className="
                px-2 py-1
                text-xs
                rounded-lg

                bg-[var(--surface-soft)]
                text-[var(--muted)]
              "
              >
                +{schedule.slots.length - 6} more
              </span>
            )}
          </div>

          {/* DELETE */}
          <button
            onClick={onDelete}
            className="
            w-full
            py-2

            text-red-600
            dark:text-red-400

            hover:bg-red-50
            dark:hover:bg-red-500/10

            rounded-lg
            transition-colors

            flex items-center
            justify-center
            gap-1

            text-sm
          "
          >
            <Trash2 size={14} />
            Delete Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleItem;
