// components/ViewToggle.jsx
import React from 'react';

const ViewToggle = ({ view, onViewChange, appointmentCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="bg-gray-100 rounded-xl p-1 inline-flex">
        <button
          onClick={() => onViewChange("list")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            view === "list"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => onViewChange("calendar")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            view === "calendar"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Calendar
        </button>
      </div>
      <p className="text-gray-600 text-sm">
        {appointmentCount} appointment{appointmentCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default ViewToggle;