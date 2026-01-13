import React from "react";
import { Stethoscope, CheckCircle } from "lucide-react";

const DepartmentStep = ({ departments, selectedDepartment, onSelectDepartment }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Department</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Department
        </label>
        <select
          value={selectedDepartment}
          onChange={(e) => onSelectDepartment(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
        {selectedDepartment && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="font-semibold">
                Selected: {departments.find((d) => d._id === selectedDepartment)?.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentStep;