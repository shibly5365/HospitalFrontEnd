import React, { useState } from "react";

import DashboardWrapper from "./DoctorPages/dashboard/DashboardWrapper";
import Header from "./DoctorPages/dashboard/Header";

import StatsCards from "./DoctorPages/dashboard/StatsCards";
import NextAppointmentCard from "./DoctorPages/dashboard/NextAppointmentCard";
import TodaySchedule from "./DoctorPages/dashboard/TodaySchedule";
import RecentActivity from "./DoctorPages/dashboard/RecentActivity";

import CalendarWidget from "./DoctorPages/dashboard/CalendarWidget";
import FeedbackAndQuickActions from "./DoctorPages/dashboard/FeedbackAndQuickActions";
import AppointmentRequests from "./DoctorPages/dashboard/AppointmentRequest";

const MainDashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <DashboardWrapper>
      <Header setShowMobileMenu={setShowMobileMenu} />
      <main
        className="px-4 md:px-8 py-6 space-y-8"
      >
        <section>
          <StatsCards />
        </section>
        <section
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          <div
            className="xl:col-span-2 space-y-6"
          >
            <NextAppointmentCard />

            <TodaySchedule />

            <RecentActivity />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <CalendarWidget />

            <AppointmentRequests />

            <FeedbackAndQuickActions />
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
};

export default MainDashboard;
