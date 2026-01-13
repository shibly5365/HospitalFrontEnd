import React from "react";

const Header = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Doctor Schedules</h1>
      </div>
      <p className="text-slate-600 ml-13">View availability and manage appointments</p>
    </div>
  );
};

export default Header;
