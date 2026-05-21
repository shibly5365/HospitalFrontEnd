import React from "react";

export default function SearchFilterSection({
  query,
  onQueryChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
}) {
  return (
    <div
      className="
        theme-card
        rounded-2xl
        p-4
        sm:p-6
        shadow-lg
        mb-6
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          justify-between
          gap-4
        "
      >
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold theme-text">
          Find Your Doctor
        </h2>

        {/* Filters */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
            items-start
            sm:items-center
            w-full
            lg:w-auto
          "
        >
          {/* Search Input */}
          <div className="relative w-full sm:w-[280px] lg:w-64">
            <input
              value={query}
              onChange={(e) =>
                onQueryChange(e.target.value)
              }
              placeholder="Search Doctor..."
              className="
                w-full
                pl-10
                pr-10
                py-3
                text-sm
                theme-soft
                theme-text
                border-2
                theme-border
                rounded-xl
                outline-none
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-200
                transition-all
                duration-200
              "
            />

            {/* Search Icon */}
            <div
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                theme-text-muted
              "
            >
              🔍
            </div>

            {/* Reset Button */}
            {query && (
              <button
                onClick={() =>
                  onQueryChange("")
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  theme-text-muted
                  hover:opacity-70
                  transition-colors
                "
              >
                ✕
              </button>
            )}
          </div>

          {/* Department Dropdown */}
          <select
            value={selectedDepartment}
            onChange={(e) =>
              onDepartmentChange(
                e.target.value
              )
            }
            className="
              w-full
              sm:w-auto
              px-4
              py-3
              text-sm
              theme-soft
              theme-text
              border-2
              theme-border
              rounded-xl
              outline-none
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-200
              transition-all
              duration-200
            "
          >
            <option value="">
              All Departments
            </option>

            {departments
              .sort((a, b) =>
                a.name.localeCompare(b.name)
              )
              .map((dept) => (
                <option
                  key={dept._id}
                  value={dept.name}
                >
                  {dept.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}