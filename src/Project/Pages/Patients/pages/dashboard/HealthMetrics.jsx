import React from "react";

export default function HealthMetrics({ metrics, isVisible }) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transform transition-all duration-700 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{metric.icon}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                metric.trend === "excellent"
                  ? "bg-green-100 text-green-600"
                  : metric.trend === "good"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {metric.trend}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {metric.value}
            <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
