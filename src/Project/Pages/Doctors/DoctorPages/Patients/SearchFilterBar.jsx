import React from "react";
import { Search, Filter } from "lucide-react";

const SearchFilterBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)]"
          />
          <input
            type="text"
            placeholder="Search by name, condition, or phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-soft)] border border-[var(--line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-soft)] border border-[var(--line)] rounded-lg hover:bg-[var(--surface)] transition-colors text-sm font-medium text-[var(--text)]">
          <Filter size={16} />
          Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
