import React from "react";
import { Users, CheckCircle } from "lucide-react";

const DoctorStep = ({ doctors, selectedDoctor, onSelectDoctor, selectedDepartment }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Doctor</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Doctor
        </label>
        <select
          value={selectedDoctor}
          onChange={(e) => onSelectDoctor(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!selectedDepartment}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.userId?.fullName || "Unknown"}
            </option>
          ))}
        </select>
        {selectedDoctor && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="font-semibold">
                Selected: Dr. {doctors.find((d) => d._id === selectedDoctor)?.userId?.fullName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorStep;