import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./pages/dashboard/Header";
import HealthMetrics from "./pages/dashboard/HealthMetrics";
import StatsGrid from "./pages/dashboard/StatsGrid";
import Appointments from "./pages/dashboard/AppointmentsDash";
import Activities from "./pages/dashboard/Activities";
import Files from "./pages/dashboard/Files";
import ProfileCard from "./pages/dashboard/ProfileCard";
import HealthPlans from "./pages/dashboard/HealthPlans";
import DoctorsList from "./pages/dashboard/DoctorsList";
import QuickActions from "./pages/dashboard/QuickActions";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/dashboard",
          { withCredentials: true },
        );
        console.log("faaa", res.data);

        const records = res.data;

        // ✅ Medical Records
        const latestRecord = records.medicalRecords;
        const vitals =
          latestRecord && latestRecord.length > 0 ? latestRecord[0] : null;

        const formattedMetrics = [
          {
            label: "Heart Rate",
            value: vitals?.vitals?.heartRate ?? "N/A",
            unit: "bpm",
            trend: "normal",
            icon: "💓",
          },
          {
            label: "Blood Pressure",
            value: vitals?.vitals?.bloodPressure ?? "N/A",
            unit: "mmHg",
            trend: "good",
            icon: "🩺",
          },
          {
            label: "Glucose",
            value: vitals?.vitals?.glucose ?? "N/A",
            unit: "mg/dL",
            trend: "excellent",
            icon: "🩸",
          },
          {
            label: "Oxygen",
            value: vitals?.vitals?.oxygenLevel ?? "N/A",
            unit: "%",
            trend: "excellent",
            icon: "🌬️",
          },
        ];

        setHealthMetrics(formattedMetrics);

        // ✅ Appointments (NEW)
        setAppointments(records.appointments || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const activities = [
    { text: "Blood Test results updated", time: "2 hours ago", icon: "🩸" },
    {
      text: "Prescription for antibiotics issued",
      time: "1 day ago",
      icon: "💊",
    },
    {
      text: "Follow-up scheduled with Dr. Smith",
      time: "2 days ago",
      icon: "📅",
    },
  ];

  const files = [
    { id: 1, name: "Blood_Report.pdf", size: "2.4 MB", date: "12 Oct 2024" },
    { id: 2, name: "Xray_Scan.pdf", size: "5.1 MB", date: "10 Oct 2024" },
    {
      id: 3,
      name: "Prescription_2025.pdf",
      size: "1.2 MB",
      date: "08 Oct 2024",
    },
  ];

  const healthPlans = [
    { task: "Take medication twice daily after meals", completed: true },
    { task: "30 minutes of walking every morning", completed: false },
    { task: "Maintain low-sodium diet", completed: true },
    { task: "Regular blood pressure monitoring", completed: false },
  ];

  // 🔄 Loading
  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg"
        style={{ color: "var(--muted)" }}
      >
        Loading dashboard...
      </div>
    );
  }
  console.log("appointments".appointments);

  return (
    <div
      className="min-h-screen p-4 md:p-6 font-sans"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Header isVisible={isVisible} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <HealthMetrics metrics={healthMetrics} isVisible={isVisible} />
          <StatsGrid isVisible={isVisible} />
          {appointments?.total > 0 && (
            <Appointments isVisible={isVisible} appointments={appointments} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Activities activities={activities} isVisible={isVisible} />
            <Files files={files} isVisible={isVisible} />
          </div>
        </div>

        <div className="space-y-6">
          <ProfileCard isVisible={isVisible} />
          <HealthPlans plans={healthPlans} isVisible={isVisible} />
          <DoctorsList isVisible={isVisible} />
          <QuickActions isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}
