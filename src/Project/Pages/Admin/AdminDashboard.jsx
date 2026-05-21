import React, { useEffect, useState } from "react";

import Header from "./pages/Dashbaord/Header";
import TopStats from "./pages/Dashbaord/TopStats";
import AppointmentRequests from "./pages/Dashbaord/AppointmentRequests";
import PatientStatistics from "./pages/Dashbaord/PatientStatistics";
import QuickStatsCards from "./pages/Dashbaord/QuickStatsCards";
import ReportsSection from "./pages/Dashbaord/ReportsSection";
import LatestAppointments from "./pages/Dashbaord/LatestAppointments";
import AdminLoading from "../../../skeletons/AdminSkeleton";

const AdminDashboard = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // FULL PAGE LOADING UI
  if (pageLoading) {
    return <AdminLoading  />;
  }

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
