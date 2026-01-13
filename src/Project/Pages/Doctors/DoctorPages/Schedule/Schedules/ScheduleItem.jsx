import React from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const ScheduleItem = ({ schedule, isExpanded, onToggleExpand, onDelete }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-800">
            {schedule.dayName || new Date(schedule.date).toLocaleDateString()}
          </h4>
          <p className="text-sm text-gray-500">
            {schedule.workingHours?.start} - {schedule.workingHours?.end}
          </p>
        </div>
        <button
          onClick={onToggleExpand}
          className="text-gray-400 hover:text-gray-600"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {schedule.slots?.slice(0, 6).map((slot) => (
              <span
                key={slot._id}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
              >
                {slot.start}-{slot.end}
              </span>
            ))}
            {schedule.slots?.length > 6 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{schedule.slots.length - 6} more
              </span>
            )}
          </div>
          <button
            onClick={onDelete}
            className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm"
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