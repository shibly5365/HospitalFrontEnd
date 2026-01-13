import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Activity,
  Users,
  Stethoscope,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import { notify } from "../../../Units/notification";

const AdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAdminDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/superadmin/admin-details/${id}`,
        { withCredentials: true }
      );
      setAdminData(res.data.data);
    } catch (err) {
      console.error("Error fetching admin details:", err);
      notify.error("Failed to load admin details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Admin not found</p>
          <button
            onClick={() => navigate("/super-admin/admin-management")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { admin, activity } = adminData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/super-admin/admin-management")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Admin Management</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Admin Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              {admin.profileImage ? (
                <img
                  src={admin.profileImage}
                  alt={admin.fullName}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200 mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {admin.fullName}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium">Administrator</span>
              </div>
              {admin.isBlocked && (
                <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg mb-4">
                  <span className="font-semibold">Blocked</span>
                </div>
              )}
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{admin.email}</p>
                </div>
              </div>
              {admin.contact && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-gray-800 font-medium">{admin.contact}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(admin.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {activity?.totalAppointmentsCreated || 0}
              </p>
              <p className="text-sm text-gray-600">Appointments Created</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {activity?.recentAppointments?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Recent Activities</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {new Date(activity?.accountCreated).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Account Created</p>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activity?.recentAppointments && activity.recentAppointments.length > 0 ? (
                activity.recentAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {appointment.patient?.fullName || "Unknown Patient"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Doctor: {appointment.doctor?.userId?.fullName || "N/A"} -{" "}
                          {appointment.doctor?.specialization || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(appointment.appointmentDate).toLocaleDateString()} -{" "}
                          {appointment.timeSlot?.start} to {appointment.timeSlot?.end}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;

