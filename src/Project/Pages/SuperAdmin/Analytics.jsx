import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  Activity,
  Building2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  RefreshCw,
  Download,
  Filter,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { notify } from "../../../UnitsTemp/notification";

const COLORS = [
  "#1f2937",
  "#374151",
  "#4b5563",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
];

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(
        `/superadmin/analytics?period=${period}`,
        { withCredentials: true }
      );
      setAnalytics(res.data.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      notify.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const exportAnalytics = () => {
    if (!analytics) return;

    const data = {
      period: analytics.period,
      overview: analytics.overview,
      revenue: analytics.revenue,
      departments: analytics.departments,
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${period}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    notify.success("Analytics exported successfully");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Hospital Analytics
            </h1>
            <p className="text-gray-600">
              Comprehensive insights into hospital operations
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={exportAnalytics}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {analytics.overview.totalPatients.toLocaleString()}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Total Patients</p>
          <p className="text-xs text-gray-500 mt-1">
            +{analytics.overview.newPatients} new this period
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </div>
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {analytics.overview.activeDoctors}/{analytics.overview.totalDoctors}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Active Doctors</p>
          <p className="text-xs text-gray-500 mt-1">
            {(
              (analytics.overview.activeDoctors /
                analytics.overview.totalDoctors) *
              100
            ).toFixed(0)}
            % availability
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </div>
             <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {analytics.overview.completedAppointments}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            Completed Appointments
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {analytics.overview.completionRate}% completion rate
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            ₹{analytics.revenue.total.toLocaleString()}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Total Revenue</p>
          <p className="text-xs text-gray-500 mt-1">
            Avg: ₹{Math.round(analytics.revenue.average).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Daily Revenue Trend */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <LineChartIcon className="w-5 h-5" />
            Daily Revenue Trend (Last 30 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.revenue.dailyTrend}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1f2937" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1f2937" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1f2937"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5" />
            Appointment Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.appointmentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ _id, percent }) =>
                  `${_id}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.appointmentStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Department Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.departments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="departmentName" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="appointmentCount"
                fill="#1f2937"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Methods Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.paymentMethods}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="_id" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar dataKey="total" fill="#374151" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Patient Demographics */}
      {analytics.patientDemographics?.ageGroups &&
        analytics.patientDemographics.ageGroups.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Patient Age Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.patientDemographics.ageGroups}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="_id" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#4b5563" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      {/* Top Performing Doctors */}
      {analytics.topDoctors && analytics.topDoctors.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Top Performing Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analytics.topDoctors.map((doctor, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {doctor.name}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {doctor.specialization}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {doctor.appointments}
                </p>
                <p className="text-xs text-gray-500">appointments</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Statistics Table */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mt-6 md:mt-8 border border-gray-200">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
          Detailed Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.overview.totalAppointments}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.overview.pendingAppointments}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.overview.cancelledAppointments}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Payments</p>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.revenue.count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
