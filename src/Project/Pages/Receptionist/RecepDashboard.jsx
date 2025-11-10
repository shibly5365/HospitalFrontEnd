import React, { useEffect, useState } from "react";
import { Stethoscope, Bell, RefreshCw, Sparkles, Zap, Phone } from "lucide-react";
import HeroSection from "./pages/Dashboard/HeroSection";
import StatsGrid from "./pages/Dashboard/StatsGrid";
import UpcomingAppointments from "./pages/Dashboard/UpcomingAppointments";
import RecentActivity from "./pages/Dashboard/RecentActivity";
import AvailableDoctors from "./pages/Dashboard/AvailableDoctors";
import WaitingRoom from "./pages/Dashboard/WaitingRoom";
import QuickActions from "./pages/Dashboard/QuickActions";


const ReceptionDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        appointments: {
          today: { count: 24 },
          nextPatients: {
            count: 8,
            list: [
              {
                _id: "1",
                patient: { fullName: "Sarah Johnson", email: "sarah.j@email.com" },
                appointmentDate: new Date(),
                timeSlot: { start: "10:30 AM" },
                status: "Confirmed"
              },
              {
                _id: "2",
                patient: { fullName: "Michael Chen", email: "m.chen@email.com" },
                appointmentDate: new Date(),
                timeSlot: { start: "11:00 AM" },
                status: "Pending"
              },
              {
                _id: "3",
                patient: { fullName: "Emma Davis", email: "emma.d@email.com" },
                appointmentDate: new Date(),
                timeSlot: { start: "11:30 AM" },
                status: "Confirmed"
              }
            ]
          },
          upcoming: {
            list: [
              {
                _id: "a1",
                patientInfo: { fullName: "Alex Thompson" },
                doctorInfo: { fullName: "Dr. James Wilson", department: { name: "Cardiology" } },
                appointmentDate: new Date(),
                timeSlot: { start: "2:00 PM" },
                tokenNumber: "T-045",
                status: "Confirmed"
              },
              {
                _id: "a2",
                patientInfo: { fullName: "Lisa Martinez" },
                doctorInfo: { fullName: "Dr. Sarah Lee", department: { name: "Pediatrics" } },
                appointmentDate: new Date(),
                timeSlot: { start: "2:30 PM" },
                tokenNumber: "T-046",
                status: "Pending"
              },
              {
                _id: "a3",
                patientInfo: { fullName: "Robert Brown" },
                doctorInfo: { fullName: "Dr. Michael Chang", department: { name: "Orthopedics" } },
                appointmentDate: new Date(),
                timeSlot: { start: "3:00 PM" },
                tokenNumber: "T-047",
                status: "Confirmed"
              }
            ]
          }
        },
        patients: {
          byStatus: { Pending: [1, 2, 3, 4, 5] },
          counts: { Confirmed: 156 },
          total: 1247
        },
        availableDoctors: {
          list: [
            { _id: "d1", fullName: "Dr. Emily Parker", specialization: "Cardiology", isAvailableToday: true },
            { _id: "d2", fullName: "Dr. James Wilson", specialization: "Neurology", isAvailableToday: true },
            { _id: "d3", fullName: "Dr. Sarah Mitchell", specialization: "Pediatrics", isAvailableToday: true },
            { _id: "d4", fullName: "Dr. David Chen", specialization: "Orthopedics", isAvailableToday: false }
          ]
        },
        todayRegisteredPatients: { count: 32 },
        walkInPatients: { count: 12 },
        recentActivity: {
          list: [
            {
              _id: "act1",
              type: "registration",
              patientName: "John Smith",
              timestamp: new Date(Date.now() - 5 * 60000),
              status: "completed",
              icon: "UserCheck",
              color: "text-emerald-500",
              bgColor: "bg-emerald-100"
            },
            {
              _id: "act2",
              type: "appointment",
              patientName: "Maria Garcia",
              timestamp: new Date(Date.now() - 12 * 60000),
              status: "scheduled",
              icon: "CalendarCheck",
              color: "text-blue-500",
              bgColor: "bg-blue-100"
            }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        <HeroSection dashboardData={dashboardData} />
        <StatsGrid dashboardData={dashboardData} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <WaitingRoom dashboardData={dashboardData} />
            <UpcomingAppointments dashboardData={dashboardData} />
          </div>

          <div className="xl:col-span-4 space-y-6">
            <QuickActions />
            <RecentActivity dashboardData={dashboardData} />
            <AvailableDoctors dashboardData={dashboardData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
    <div className="px-4 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">MediCare</h1>
            <p className="text-xs text-gray-500">Reception Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
            R
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="p-4 lg:p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl xl:col-span-2"></div>
          <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorScreen = ({ error }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
    <div className="text-center bg-white rounded-3xl p-8 shadow-2xl max-w-md">
      <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
      <p className="text-gray-600">{error}</p>
    </div>
  </div>
);

export default ReceptionDashboard;