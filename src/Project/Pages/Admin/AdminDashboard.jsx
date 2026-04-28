import React from "react";

import Header from "./pages/Dashbaord/Header";
import TopStats from "./pages/Dashbaord/TopStats";
import AppointmentRequests from "./pages/Dashbaord/AppointmentRequests";
import PatientStatistics from "./pages/Dashbaord/PatientStatistics";
import QuickStatsCards from "./pages/Dashbaord/QuickStatsCards";
import ReportsSection from "./pages/Dashbaord/ReportsSection";
import LatestAppointments from "./pages/Dashbaord/LatestAppointments";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <Header />

      <TopStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentRequests />
        <PatientStatistics />
      </div>

      <QuickStatsCards />

      <ReportsSection />

      <LatestAppointments />
    </div>
  );
};

export default AdminDashboard;
