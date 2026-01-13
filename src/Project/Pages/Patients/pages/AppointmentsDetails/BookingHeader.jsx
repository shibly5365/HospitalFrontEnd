import React from "react";

export default function BookingHeader({ onHistoryClick }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Booking Appointment
        </div>
        <div className="text-gray-600 mt-1">Schedule your consultation with top specialists</div>
      </div>
      
      <button
        onClick={onHistoryClick}
        className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-all duration-200"
      >
        History
      </button>
    </div>
  );
}