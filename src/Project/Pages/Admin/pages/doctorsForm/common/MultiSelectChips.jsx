import React from "react";

const MultiSelectChips = ({ label, options, selected, onChange, icon: Icon }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected.includes(option)
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default MultiSelectChips;