import React from "react";

export default function PatientConcerns({ concern, onConcernChange }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div className="text-lg font-semibold text-gray-800 mb-4">Patient Concerns</div>
      <textarea
        value={concern}
        onChange={(e) => onConcernChange(e.target.value)}
      rows={5}
        className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl resize-none text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
        placeholder="Describe your symptoms and concerns..."
      />
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            📎
          </button>
          <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            🖼️
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {concern.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
    </div>
  );
}