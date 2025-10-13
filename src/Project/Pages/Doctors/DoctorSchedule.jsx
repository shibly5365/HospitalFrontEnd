import React, { useState } from "react";
import CalendarView from "./DoctorPages/Schedule/CalendarView ";
import Schedule from "./DoctorPages/Schedule/Schedule";
import WorkingDays from "./DoctorPages/Schedule/WorkingDays ";
import Payments from "./DoctorPages/Schedule/Payments ";

const DoctorSchedule = () => {
  const [view, setView] = useState("calendar"); // calendar, schedule, leave, workingDays, payments

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setView("calendar")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Calendar
          </button>
          <button
            onClick={() => setView("schedule")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Set Schedule
          </button>

          <button
            onClick={() => setView("workingDays")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Working Days
          </button>
          <button
            onClick={() => setView("payments")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Payments
          </button>
        </div>
      </div>

      {/* Render selected view */}
      <div className="mt-4">
        {view === "calendar" && <CalendarView />}
        {view === "schedule" && <Schedule />}
        {view === "workingDays" && <WorkingDays />}
        {view === "payments" && <Payments />}
      </div>
    </div>
  );
};

export default DoctorSchedule;
