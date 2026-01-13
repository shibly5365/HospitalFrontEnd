import React from "react";
import { UserPlus, X } from "lucide-react";

export default function FormHeader({ onClose }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-md">
            <UserPlus size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Register New Patient</h1>
            <p className="text-gray-600 mt-1">Complete the form below to register a new patient</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-xl transition duration-200 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}