import React from "react";
import DashboardNav from "../../DashboardNav";

const ErrorState = ({ error }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-50">
        <DashboardNav />
      </div>
      <div className="flex items-center justify-center h-96">
        <div className="bg-white border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;