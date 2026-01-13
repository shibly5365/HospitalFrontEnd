import React from "react";
import { Search, Filter } from "lucide-react";

const SearchFilterBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, condition, or phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700">
          <Filter size={16} />
          Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;