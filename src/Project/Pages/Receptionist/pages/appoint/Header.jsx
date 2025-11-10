// components/Header.jsx
import React from 'react';
import { Plus } from 'lucide-react';

export default function Header({ onAddAppointment }) {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track patient appointments</p>
          </div>
          <button
            onClick={onAddAppointment}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-medium"
          >
            <Plus size={18} />
            New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}