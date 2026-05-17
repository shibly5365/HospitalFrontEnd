import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Users,
  Calendar,
  BarChart3,
  AlertCircle,
  Loader2,
} from "lucide-react";
import DoctorScheduleAdminHeader from "./pages/DoctorScheduleAdminHeader";
import StatsCards from "./pages/StatsCards";
import StaffAvailabilityPanel from "./pages/StaffAvailabilityPanel";
import LeaveRequestsPanel from "./pages/LeaveRequestsPanel";
import CalendarScheduler from "./pages/CalendarScheduler";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import NotificationsPanel from "./pages/NotificationsPanel";
import EmergencyMode from "./pages/EmergencyMode";
import toast from "react-hot-toast";

const DoctorScheduleAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [staffStats, setStaffStats] = useState({
    available_doctors: 0,
    available_staff: 0,
    total_staff: 0,
    on_leave: 0,
    emergency_alerts: 0,
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch staff statistics
  useEffect(() => {
    const fetchStaffStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "/admin/overView",
          { withCredentials: true },
        );
        
        setStaffStats(response.data.data);
      } catch (error) {
        console.error("Error fetching staff stats:", error);
        // Using mock data if API fails
        setStaffStats({
          available_doctors: 12,
          available_staff: 24,
          total_staff: 45,
          on_leave: 5,
          emergency_alerts: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStaffStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStaffStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient.get(
          "/admin/notifications",
          { withCredentials: true },
        );
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyMode = (enabled) => {
    setEmergencyMode(enabled);
    toast.success(
      enabled ? "Emergency Mode Activated" : "Emergency Mode Deactivated",
    );
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Calendar },
    { id: "availability", label: "Availability", icon: Users },
    { id: "requests", label: "Leave Requests", icon: Bell },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Staff Management System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DoctorScheduleAdminHeader
        emergencyMode={emergencyMode}
        onEmergencyModeChange={handleEmergencyMode}
        unreadNotifications={notifications.filter((n) => !n.read).length}
      />

      {/* Emergency Alert Banner */}
      {emergencyMode && (
        <div className="bg-red-50 border-b-2 border-red-500 px-6 py-3 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-semibold">
            🚨 Emergency Mode Active - Staff Reassignment Priority
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="p-6 pb-4">
        <StatsCards stats={staffStats} emergencyMode={emergencyMode} />
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b px-6 z-10">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StaffAvailabilityPanel />
              </div>
              <div>
                <NotificationsPanel
                  notifications={notifications}
                  onNotificationRead={(id) => {
                    setNotifications((prev) =>
                      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
                    );
                  }}
                />
              </div>
            </div>
            <LeaveRequestsPanel />
          </div>
        )}

        {activeTab === "availability" && (
          <div className="space-y-6">
            <StaffAvailabilityPanel />
            {emergencyMode && <EmergencyMode />}
          </div>
        )}

        {activeTab === "requests" && <LeaveRequestsPanel />}

        {activeTab === "calendar" && <CalendarScheduler />}

        {activeTab === "analytics" && <AnalyticsDashboard />}

      </div>
    </div>
  );
};

export default DoctorScheduleAdmin;
