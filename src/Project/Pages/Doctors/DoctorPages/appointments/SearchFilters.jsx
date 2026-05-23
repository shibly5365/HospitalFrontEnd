import React from "react";
import { Search, X } from "lucide-react";

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm || statusFilter !== "All Status" || dateFilter !== "Today";

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients or reason..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={onStatusFilterChange}
          className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 transition-all"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={onDateFilterChange}
          className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 transition-all"
        >
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Week</option>
          <option>Next Week</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-4 text-red-600 hover:bg-red-50 rounded-3xl transition flex items-center gap-2 whitespace-nowrap"
          >
            <X size={18} /> Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;