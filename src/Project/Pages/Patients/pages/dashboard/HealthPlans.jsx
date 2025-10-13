import React from "react";

export default function HealthPlans({ plans, isVisible }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 delay-800 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Plans</h2>
      <ul className="space-y-3">
        {plans.map((plan, index) => (
          <li
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
              plan.completed
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-gray-50 border-gray-200 text-gray-600"
            }`}
          >
            <input
              type="checkbox"
              checked={plan.completed}
              readOnly
              className="accent-blue-500 w-5 h-5"
            />
            <p className="font-medium">{plan.task}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
