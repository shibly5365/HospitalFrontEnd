import React from "react";
import { Users, UserPlus } from "lucide-react";

const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Users size={40} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">
      No doctors found
    </h3>
    <p className="text-gray-500 mb-6">Add a new doctor to get started.</p>
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
    >
      <UserPlus size={18} /> Add Doctor
    </button>
  </div>
);

export default EmptyState;