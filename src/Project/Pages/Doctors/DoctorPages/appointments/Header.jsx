import React from "react";
import { Plus, Calendar } from "lucide-react";

const Header = ({ onNewAppointment }) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Calendar className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Appointments</h1>
                <p className="text-gray-500 text-sm mt-0.5">{today}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onNewAppointment}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-3xl font-medium transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <Plus size={20} />
            New Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;