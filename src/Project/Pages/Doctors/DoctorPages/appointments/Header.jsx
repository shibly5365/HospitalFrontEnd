// components/Header.jsx
import React from 'react';
import { Activity, Calendar } from 'lucide-react';

const Header = ({ onNewAppointment }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="text-blue-600" size={32} />
                Appointments
              </h1>
              <p className="text-gray-600 mt-1">Manage your patient schedule efficiently</p>
            </div>
            <button
              onClick={onNewAppointment}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center gap-2 font-semibold"
            >
              <Calendar size={20} />
              New Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;