import React from "react";

export default function SearchFilterSection({
  query,
  onQueryChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Find Your Doctor</h2>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search input */}
          <div className="relative">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search Doctor..."
              className="pl-10 pr-10 py-3 text-sm w-full sm:w-[280px] lg:w-64 border-2 border-gray-200 rounded-xl text-sm w-full lg:w-64 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>

            {/* Reset button */}
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Department dropdown */}
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 text-sm border-2 border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          >
            <option value="">All Departments</option>
            {departments
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
          </select>

        </div>
      </div>
    </div>
  );
}
