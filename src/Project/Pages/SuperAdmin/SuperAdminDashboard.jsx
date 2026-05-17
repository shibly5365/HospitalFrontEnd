import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Stethoscope,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
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

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get(
        "/superadmin/dashboard",
        { withCredentials: true }
      );
      setDashboardData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error || "No data available"}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    overview,
    doctors,
    appointments,
    income,
    analytics,
    recentAppointments,
  } = dashboardData;

  // Prepare chart data
  const monthlyIncomeData = income?.monthlyIncome || [];
  const appointmentStatusData = Object.entries(appointments?.byStatus || {}).map(
    ([status, count]) => ({ name: status, value: count })
  );
  const paymentMethodData = income?.byMethod || [];
  const patientGenderData = analytics?.patientGender || [];

  const statsCards = [
    {
      title: "Total Staff",
      value: overview?.totalStaff || 0,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      trend: "+12%",
      trendUp: true,
      color: "text-blue-600",
    },
    {
      title: "Total Doctors",
      value: doctors?.total || 0,
      icon: Stethoscope,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
      trend: `Available: ${doctors?.available || 0}`,
      trendUp: true,
      color: "text-green-600",
    },
    {
      title: "Total Patients",
      value: overview?.totalPatients || 0,
      icon: UserCheck,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      trend: "+8%",
      trendUp: true,
      color: "text-purple-600",
    },
    {
      title: "Total Income",
      value: `₹${((income?.total || 0) / 100000).toFixed(1)}L`,
      icon: DollarSign,
      gradient: "from-yellow-500 to-amber-600",
      bgGradient: "from-yellow-50 to-amber-100",
      trend: `This Month: ₹${((income?.thisMonth || 0) / 100000).toFixed(1)}L`,
      trendUp: true,
      color: "text-yellow-600",
    },
    {
      title: "Total Appointments",
      value: overview?.totalAppointments || 0,
      icon: Calendar,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100",
      trend: `Today: ${appointments?.today || 0}`,
      trendUp: true,
      color: "text-indigo-600",
    },
    {
      title: "Departments",
      value: overview?.totalDepartments || 0,
      icon: Building2,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-100",
      trend: "Active",
      trendUp: true,
      color: "text-pink-600",
    },
  ];

  const roleDistribution = [
    { name: "Admins", value: overview?.totalAdmins || 0, color: "#3B82F6" },
    { name: "Doctors", value: doctors?.total || 0, color: "#10B981" },
    { name: "Receptionists", value: overview?.totalReceptionists || 0, color: "#8B5CF6" },
    { name: "Patients", value: overview?.totalPatients || 0, color: "#F59E0B" },
  ];

  const incomeCards = [
    {
      title: "Today's Income",
      amount: income?.today || 0,
      count: income?.todayCount || 0,
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      icon: DollarSign,
    },
    {
      title: "This Week",
      amount: income?.thisWeek || 0,
      count: income?.weekCount || 0,
      gradient: "from-blue-400 via-blue-500 to-indigo-600",
      icon: TrendingUp,
    },
    {
      title: "This Month",
      amount: income?.thisMonth || 0,
      count: income?.monthCount || 0,
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      icon: Activity,
    },
    {
      title: "This Year",
      amount: income?.thisYear || 0,
      count: income?.yearCount || 0,
      gradient: "from-purple-400 via-purple-500 to-pink-600",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div
        className={`mb-8 transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Super Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Complete overview of hospital operations</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">System Active</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transform transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trendUp ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-emerald-600 text-sm font-bold">{stat.trend}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Income Overview Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {incomeCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white/90">{card.title}</h3>
                  <IconComponent className="w-6 h-6 text-white/80" />
                </div>
                <p className="text-3xl font-bold mb-2">₹{card.amount.toLocaleString()}</p>
                <p className="text-sm text-white/80">{card.count} payments</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 - Income and Appointments */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transform transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Monthly Income Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-blue-600" />
                Monthly Income Trend
              </h2>
              <p className="text-sm text-gray-500 mt-1">Last 12 months revenue</p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyIncomeData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
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
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-purple-600" />
                Appointment Status
              </h2>
              <p className="text-sm text-gray-500 mt-1">Distribution by status</p>
            </div>
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 - Payment Methods and Role Distribution */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transform transition-all duration-700 delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Payment Methods Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
                Payment Methods
              </h2>
              <p className="text-sm text-gray-500 mt-1">Revenue by payment type</p>
            </div>
            <DollarSign className="w-6 h-6 text-yellow-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
              <Bar
                dataKey="totalAmount"
                fill="url(#colorBar)"
                radius={[8, 8, 0, 0]}
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Role Distribution
              </h2>
              <p className="text-sm text-gray-500 mt-1">User distribution across roles</p>
            </div>
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appointments Overview */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-700 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {appointments?.today || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Week</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {appointments?.thisWeek || 0}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {appointments?.thisMonth || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {appointments?.total || 0}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-xl">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Doctors and Recent Appointments */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transform transition-all duration-700 delay-600 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Top Doctors */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-green-600" />
            Top Performing Doctors
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {analytics?.topDoctors && analytics.topDoctors.length > 0 ? (
              analytics.topDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{doctor.doctorName}</p>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">{doctor.appointmentCount}</p>
                    <p className="text-xs text-gray-500">appointments</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Recent Appointments
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {recentAppointments && recentAppointments?.length > 0 ? (
              recentAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">
                      {appointment.patient?.fullName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {appointment.doctor?.userId?.fullName || "N/A"} -{" "}
                      {appointment.doctor?.specialization || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(appointment.appointmentDate).toLocaleDateString()} -{" "}
                      {appointment.timeSlot?.start} to {appointment.timeSlot?.end}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
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
              <p className="text-gray-500 text-center py-8">No recent appointments</p>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Status Overview */}
      <div
        className={`bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all duration-700 delay-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Doctor Status Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-4xl font-bold text-green-600 mb-2">{doctors?.available || 0}</p>
            <p className="text-gray-700 font-medium">Available Doctors</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-4xl font-bold text-red-600 mb-2">{doctors?.unavailable || 0}</p>
            <p className="text-gray-700 font-medium">Unavailable Doctors</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Stethoscope className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <p className="text-4xl font-bold text-blue-600 mb-2">{doctors?.total || 0}</p>
            <p className="text-gray-700 font-medium">Total Doctors</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SuperAdminDashboard;
