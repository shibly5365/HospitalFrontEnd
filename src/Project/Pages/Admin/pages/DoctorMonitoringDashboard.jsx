import { apiClient } from "../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import DashboardHeader from "./DoctorDetails/DashboardHeader";
import AlertsSection from "./DoctorDetails/AlertsSection";
import StatsCards from "./DoctorDetails/StatsCards";
import OverviewTab from "./DoctorDetails/OverviewTab";
import AttendanceTab from "./DoctorDetails/AttendanceTab";
import LeavesTab from "./DoctorDetails/LeavesTab";
import PaymentsTab from "./DoctorDetails/PaymentsTab";
import PatientsTab from "./DoctorDetails/PatientsTab";
import ActivityTab from "./DoctorDetails/ActivityTab";

const DoctorMonitoringDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [doctorData, setDoctorData] = useState({
    doctor: null,
    stats: {},
    attendance: [],
    patients: [],
    leaves: [],
    payments: [],
    activities: [],
  });

  useEffect(() => {
    if (!id) return;

    if (activeTab === "overview") fetchOverview();
    if (activeTab === "patients") fetchPatients();
    if (activeTab === "attendance") fetchAttendance();
    if (activeTab === "leaves") fetchLeaves();
    if (activeTab === "payments") fetchPayments();
    if (activeTab === "activity") fetchActivity();
  }, [activeTab, id]);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/admin/doctors/${id}/dashboard/overview`,
        { withCredentials: true },
      );

      setDoctorData((prev) => ({
        ...prev,
        doctor: res.data,
        stats: res.data.stats,
      }));
    } catch (err) {
      setError("Failed to load overview");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await apiClient.get(
        `/admin/doctors/${id}/patients`,
        {
          withCredentials: true, // ✅ IMPORTANT
        },
      );

      setDoctorData((prev) => ({
        ...prev,
        patients: res.data.data,
      }));
    } catch (err) {
      console.error("Patients API error:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await apiClient.get(
        `/admin/doctors/${id}/attendance`,
        {
          withCredentials: true, // ✅ MUST
        },
      );

      setDoctorData((prev) => ({
        ...prev,
        attendance: res.data.data,
      }));
    } catch (err) {
      console.error("Attendance API error:", err);
    }
  };

  const fetchLeaves = async () => {
    try {
      const res = await apiClient.get(
        `/admin/doctors/${id}/leaves`,
        {
          withCredentials: true,
        },
      );

      console.log("Leaves API:", res.data);

      setDoctorData((prev) => ({
        ...prev,
        leaves:res.data
      }));
    } catch (err) {
      console.error("Leaves fetch error:", err);
    }
  };
  const fetchPayments = async () => {
    try {
      const res = await apiClient.get(
        `/api/admin/doctors/${id}/dashboard/payments`,
      );

      setDoctorData((prev) => ({
        ...prev,
        payments: res.data.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchActivity = async () => {
    try {
      const res = await apiClient.get(
        `/api/admin/doctors/${id}/dashboard/activity`,
      );

      setDoctorData((prev) => ({
        ...prev,
        activities: res.data.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  // const fetchDoctorDetails = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     console.log("Fetching doctor with ID:", id);
  //     const response = await apiClient.get(
  //       `/admin/getAll-Doctor/${id}`,
  //       { withCredentials: true },
  //     );
  //     console.log("Doctor data:", response.data);

  //     const data = response.data;
  //     setDoctorData({
  //       doctor: data.doctor || data,
  //       stats: data.stats || {
  //         totalPatients: 0,
  //         patientsThisMonth: 0,
  //         daysPresentThisMonth: 0,
  //         totalLeavesTaken: 0,
  //         pendingLeaveRequests: 0,
  //       },
  //       attendance: data.attendance || [],
  //       patients: data.patients || [],
  //       leaves: data.leaves || [],
  //       payments: data.payments || [],
  //       activities: data.activities || [],
  //     });
  //   } catch (err) {
  //     console.error("Error fetching doctor details:", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "Failed to load doctor details. Please try again.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleLeaveAction = async (leaveId, action) => {
  //   try {
  //     await apiClient.post(
  //       `/admin/leave-action/${leaveId}`,
  //       { action },
  //       { withCredentials: true },
  //     );
  //     await fetchOverview();
  //   } catch (error) {
  //     console.error("Error updating leave:", error);
  //     alert(error.response?.data?.message || "Failed to update leave request");
  //   }
  // };

  const handleStatusToggle = async () => {
    try {
      const newStatus =
        doctorData.doctor.status === "Active" ? "Inactive" : "Active";
      await apiClient.put(
        `/admin/update-doctor-status/${id}`,
        { status: newStatus },
        { withCredentials: true },
      );
      await fetchOverview();
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response?.data?.message || "Failed to update doctor status");
    }
  };

  const handleSalaryUpdate = async (newSalary) => {
    try {
      await apiClient.put(
        `/admin/update-salary/${id}`,
        { salary: newSalary },
        { withCredentials: true },
      );
      await fetchOverview();
      alert("Salary updated successfully!");
    } catch (error) {
      console.error("Error updating salary:", error);
      alert(error.response?.data?.message || "Failed to update salary");
    }
  };

  const handleClose = () => {
    navigate("/admin/admin-doctorDetails");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md shadow-lg">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back to Doctor List
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!doctorData || !doctorData.doctor) return null;

  const { doctor, stats, attendance, patients, leaves, payments, activities } =
    doctorData;

  const tabs = [
    "overview",
    "patients",
    "attendance",
    "leaves",
    "payments",
    "activity",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader
          doctor={doctor}
          onClose={handleClose}
          onEdit={() => {}}
          onStatusToggle={handleStatusToggle}
        />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <AlertsSection
          attendancePercentage={(stats.daysPresentThisMonth / 22) * 100}
          patientsThisMonth={stats.patientsThisMonth}
          totalLeavesTaken={stats.totalLeavesTaken}
        />

        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <StatsCards stats={stats} />
              <OverviewTab doctor={doctor} attendance={attendance} />
            </>
          )}

          {activeTab === "patients" && <PatientsTab patients={patients} />}

          {activeTab === "attendance" && (
            <AttendanceTab stats={stats} attendance={attendance} />
          )}

          {activeTab === "leaves" && (
            <LeavesTab leaves={leaves}  />
          )}

          {activeTab === "payments" && (
            <PaymentsTab
              doctor={doctor}
              payments={payments}
              onSalaryUpdate={handleSalaryUpdate}
            />
          )}

          {activeTab === "activity" && <ActivityTab activities={activities} />}
        </div>
      </div>
    </div>
  );
};

export default DoctorMonitoringDashboard;
