import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Consultation Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and review patient consultations</p>
      </div>
    </div>
  );
};

export default DashboardHeader;