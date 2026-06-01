import React from "react";
import { Search, Filter } from "lucide-react";

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => {
  console.log("fsdlkas", filterStatus);

  return (
    <div className="bg-[var(--surface)] rounded-xl shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)] w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name, ID, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[var(--line)] rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)]"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)] w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[var(--line)] rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none appearance-none bg-[var(--surface)] text-[var(--text)] "
          >
            <option value="all">All Prescriptions</option>
            <option value="active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
