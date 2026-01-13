import React from "react";
import DashboardNav from "../../DashboardNav";

const LoadingState = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-50">
        <DashboardNav />
      </div>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-600 border-r-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading patients...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;