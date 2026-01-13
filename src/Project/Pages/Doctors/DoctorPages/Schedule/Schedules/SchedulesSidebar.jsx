import React, { useState } from "react";
import axios from "axios";
import { Users, Calendar, RefreshCw } from "lucide-react";import ScheduleItem from "./ScheduleItem";
import { notify } from "../../../../../../Units/notification";


const SchedulesSidebar = ({ schedules, loading, onScheduleDelete }) => {
  // console.log(schedules);
  
  const [expandedSchedule, setExpandedSchedule] = useState(null);

  const deleteSchedule = async (scheduleId) => {
    console.log(scheduleId);
    
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`http://localhost:4002/api/doctor/schedule/deleteSchedule/${scheduleId}`, {
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
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-blue-600" />
          Your Schedules
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full ml-2">
            {schedules.length}
          </span>
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw size={24} className="animate-spin mx-auto text-blue-600" />
            <p className="text-gray-500 mt-2">Loading schedules...</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
            <p>No schedules created yet</p>
            <p className="text-sm">Create your first schedule to get started</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {schedules.map((schedule) => (
              <ScheduleItem
                key={schedule._id}
                schedule={schedule}
                isExpanded={expandedSchedule === schedule._id}
                onToggleExpand={() => setExpandedSchedule(
                  expandedSchedule === schedule._id ? null : schedule._id
                )}
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