import React from "react";

export default function PatientConcerns({ concern, onConcernChange }) {
  return (
    <div
      className="
        theme-card
        rounded-2xl
        p-4
        sm:p-6
        shadow-lg
      "
    >
      <div className="text-lg font-semibold theme-text mb-4">
        Patient Concerns
      </div>

      <textarea
        value={concern}
        onChange={(e) => onConcernChange(e.target.value)}
        rows={5}
        placeholder="Describe your symptoms and concerns..."
        className="
          w-full
          p-3
          sm:p-4
          text-sm
          sm:text-base
          theme-soft
          theme-text
          border-2
          theme-border
          rounded-xl
          resize-none
          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-200
          outline-none
          transition-all
          duration-200
        "
      />

      <div className="flex items-center justify-between mt-4">
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="
              p-2
              border-2
              theme-border
              rounded-lg
              hover:bg-white/5
              transition-colors
            "
          >
            📎
          </button>

          <button
            className="
              p-2
              border-2
              theme-border
              rounded-lg
              hover:bg-white/5
              transition-colors
            "
          >
            🖼️
          </button>
        </div>

        {/* Word Count */}
        <div className="text-sm theme-text-muted">
          {concern.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
    </div>
  );
}
