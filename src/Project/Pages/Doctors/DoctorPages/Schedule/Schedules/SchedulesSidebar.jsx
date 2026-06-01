import { apiClient } from "../../../../../../services/queryClient";
import React, { useState } from "react";
import { Users, Calendar, RefreshCw } from "lucide-react";
import ScheduleItem from "./ScheduleItem";
import { notify } from "../../../../../../UnitsTemp/notification";

const SchedulesSidebar = ({ schedules, loading, onScheduleDelete }) => {
  // console.log(schedules);

  const [expandedSchedule, setExpandedSchedule] = useState(null);

  const deleteSchedule = async (scheduleId) => {
    console.log(scheduleId);

    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;
    try {
      await apiClient.delete(`/doctor/deleteSchedule/${scheduleId}`, {
        withCredentials: true,
      });
      notify.success("Schedule deleted successfully!");
      onScheduleDelete();
    } catch (err) {
      console.error("Failed to delete schedule:", err);
      notify.error("Failed to delete schedule");
    }
  };

  return (
    <div className="lg:col-span-1">
      <div
        className="
      bg-[var(--surface)]
      border border-[var(--line)]
      rounded-2xl
      shadow-sm
      p-6
      sticky top-6
    "
      >
        {/* HEADER */}
        <h2
          className="
        text-xl font-semibold
        text-[var(--text)]
        mb-4
        flex items-center gap-2
      "
        >
          <Users size={20} className="text-[var(--brand)]" />
          Your Schedules
          <span
            className="
          bg-[var(--surface-soft)]
          text-[var(--brand)]

          text-sm
          px-2 py-1
          rounded-full
          ml-2
        "
          >
            {schedules.length}
          </span>
        </h2>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw
              size={24}
              className="
              animate-spin
              mx-auto
              text-[var(--brand)]
            "
            />

            <p
              className="
            text-[var(--muted)]
            mt-2
          "
            >
              Loading schedules...
            </p>
          </div>
        ) : schedules.length === 0 ? (
          /* EMPTY STATE */
          <div
            className="
          text-center
          py-8
          text-[var(--muted)]
        "
          >
            <Calendar
              size={48}
              className="
              mx-auto mb-3
              text-[var(--line)]
            "
            />

            <p className="text-[var(--text)]">No schedules created yet</p>

            <p className="text-sm mt-1">
              Create your first schedule to get started
            </p>
          </div>
        ) : (
          /* SCHEDULE LIST */
          <div
            className="
          space-y-4
          max-h-[600px]
          overflow-y-auto
          custom-scrollbar
        "
          >
            {schedules.map((schedule) => (
              <ScheduleItem
                key={schedule._id}
                schedule={schedule}
                isExpanded={expandedSchedule === schedule._id}
                onToggleExpand={() =>
                  setExpandedSchedule(
                    expandedSchedule === schedule._id ? null : schedule._id,
                  )
                }
                onDelete={() => deleteSchedule(schedule._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulesSidebar;
