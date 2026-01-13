import React from "react";

export default function ProgressDots({ sections, activeSection, onSectionChange }) {
  const currentIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              activeSection === section.id
                ? "bg-teal-500 scale-125"
                : index <= currentIndex
                ? "bg-blue-400"
                : "bg-gray-300"
            }`}
            aria-label={`Go to ${section.label}`}
          />
        ))}
      </div>
    </div>
  );
}