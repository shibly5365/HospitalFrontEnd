import React from "react";

export default function BookingHeader({ onHistoryClick }) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Booking Appointment
        </div>
        <div className="text-gray-600 mt-1">Schedule your consultation with top specialists</div>
      </div>
      
      <button
        onClick={onHistoryClick}
        className="w-full sm:w-auto px-4 py-3 text-sm sm:text-base font-semibold bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-all duration-200"
      >
        History
      </button>
    </div>
  );
}