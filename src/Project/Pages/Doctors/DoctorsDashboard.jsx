import React from "react";
import DashboardNav from "./DashboardNav";
import StatsCard from "./DoctorPages/dashboard/StatsCard";
import PatientChart from "./DoctorPages/dashboard/PatientChart";
import TodayAppointments from "./DoctorPages/dashboard/TodayAppointments";
import NextPatient from "./DoctorPages/dashboard/NextPatient";
import PatientReviews from "./DoctorPages/dashboard/PatientReviews";
import Calendar from "./DoctorPages/dashboard/Calendar";
import AppointmentRequests from "./DoctorPages/dashboard/AppointmentRequests";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <DashboardNav />
      <main className="p-6">
        {/* Top Stats Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Patient"
            value="2000+"
            date="Till Today"
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatsCard
            title="Today Patient"
            value="068"
            date="21 Dec-2021"
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatsCard
            title="Today Appointments"
            value="085"
            date="21 Dec-2021"
            bgColor="bg-purple-100"
            textColor="text-purple-600"
          />
        </div>

        {/* Second Row - Three Equal Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PatientChart />
          <TodayAppointments />
          <NextPatient />
        </div>

        {/* Third Row - Three Equal Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PatientReviews />
          <AppointmentRequests />
          <Calendar />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;