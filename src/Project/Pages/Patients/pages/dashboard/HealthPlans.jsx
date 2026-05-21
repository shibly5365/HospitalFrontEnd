import React from "react";

export default function HealthPlans({ plans, isVisible }) {
  return (
    <div
      className={`
        theme-card
        rounded-2xl
        p-6
        shadow-lg
        transform
        transition-all
        duration-700
        delay-800
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }
      `}
    >
      <h2 className="text-2xl font-bold theme-text mb-4">
        Health Plans
      </h2>

      <ul className="space-y-3">
        {plans.map((plan, index) => (
          <li
            key={index}
            className={`
              flex items-center space-x-3 p-3 rounded-xl border
              transition-all duration-300 hover:scale-[1.02]
              ${
                plan.completed
                  ? `
                    bg-green-500/10
                    border-green-500/20
                    text-green-500
                  `
                  : `
                    theme-soft
                    theme-border
                    theme-text-muted
                  `
              }
            `}
          >
            <input
              type="checkbox"
              checked={plan.completed}
              readOnly
              className="accent-blue-500 w-5 h-5"
            />

            <p className="font-medium">
              {plan.task}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}