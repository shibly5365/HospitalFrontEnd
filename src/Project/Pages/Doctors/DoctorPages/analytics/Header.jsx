import React from "react";

const Header = ({ timeframe, setTimeframe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Doctor Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of your performance and activities
          </p>
        </div>
        <div className="flex gap-2">
          {["daily", "weekly", "monthly"].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === period
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
