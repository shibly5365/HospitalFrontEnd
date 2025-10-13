import React from "react";

export default function QuickActions({ isVisible }) {
  const actions = [
    { label: "Book Appointment", icon: "📅" },
    { label: "Upload Report", icon: "📄" },
    { label: "Message Doctor", icon: "💬" },
    { label: "Request Prescription", icon: "💊" },
  ];

  return (
    <div
      className={`bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-[1000ms] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-4 text-center font-medium hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-2xl mb-1">{a.icon}</div>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
