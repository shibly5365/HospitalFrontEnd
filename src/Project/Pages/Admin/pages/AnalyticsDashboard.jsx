import { apiClient } from "../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get(
          `/admin/adminAnalytics?range=${timeRange}`,
          { withCredentials: true },
        );

        console.log("analytics:", res.data);

        setAnalytics(res.data);
      } catch (error) {
        console.error("Analytics error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  // Charts data
  const patientDataWeek = [
    { day: "Mon", patients: 45, consultations: 12 },
    { day: "Tue", patients: 52, consultations: 15 },
    { day: "Wed", patients: 48, consultations: 14 },
    { day: "Thu", patients: 61, consultations: 18 },
    { day: "Fri", patients: 55, consultations: 16 },
    { day: "Sat", patients: 42, consultations: 11 },
    { day: "Sun", patients: 38, consultations: 9 },
  ];

  const appointmentTrends = [
    { week: "Week 1", scheduled: 120, completed: 110, cancelled: 8, noShow: 2 },
    { week: "Week 2", scheduled: 135, completed: 125, cancelled: 7, noShow: 3 },
    { week: "Week 3", scheduled: 128, completed: 118, cancelled: 6, noShow: 4 },
    { week: "Week 4", scheduled: 142, completed: 135, cancelled: 5, noShow: 2 },
  ];

  const departmentPerformance = [
    { name: "Cardiology", patients: 250 },
    { name: "Neurology", patients: 180 },
    { name: "Surgery", patients: 220 },
    { name: "Orthopedics", patients: 150 },
    { name: "Pediatrics", patients: 120 },
  ];

  const topDoctors = [
    { name: "Dr. John Smith", consultations: 156, rating: 4.8, patients: 450 },
    {
      name: "Dr. Sarah Johnson",
      consultations: 142,
      rating: 4.9,
      patients: 420,
    },
    { name: "Dr. Mike Brown", consultations: 138, rating: 4.7, patients: 400 },
    { name: "Dr. Emma Davis", consultations: 125, rating: 4.6, patients: 380 },
    {
      name: "Dr. Lisa Anderson",
      consultations: 118,
      rating: 4.8,
      patients: 350,
    },
  ];

  const COLORS = ["#0891b2", "#06b6d4", "#14b8a6", "#10b981", "#6366f1"];

  return (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div className="flex gap-2">
        {["day", "week", "month", "year"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === range
                ? "bg-teal-500 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">
              Total Consultations
            </h3>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.overview?.totalAppointments || 1243}
          </p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last week</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">
              Appointments Completed
            </h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.overview?.completedAppointments || 1182}
          </p>
          <p className="text-xs text-green-600 mt-2">95% completion rate</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">No-Show Rate</h3>
            <LineChart className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">2.1%</p>
          <p className="text-xs text-red-600 mt-2">↓ 0.3% from last week</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">
              Avg Patient Satisfaction
            </h3>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.7/5</p>
          <p className="text-xs text-green-600 mt-2">↑ 0.2 from last month</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Patients Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Daily Patients & Consultations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientDataWeek}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#0891b2" />
              <Bar dataKey="consultations" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Weekly Appointment Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={appointmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="scheduled" stroke="#0891b2" />
              <Line type="monotone" dataKey="completed" stroke="#10b981" />
              <Line type="monotone" dataKey="cancelled" stroke="#ef4444" />
              <Line type="monotone" dataKey="noShow" stroke="#f97316" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Department Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={departmentPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, patients }) => `${name}: ${patients}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="patients"
              >
                {departmentPerformance.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Doctors Leaderboard */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top Performing Doctors
          </h3>
          <div className="space-y-3">
            {topDoctors.map((doctor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-xs text-gray-500">
                      {doctor.consultations} consultations • {doctor.patients}{" "}
                      patients
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-500">⭐ {doctor.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-teal-100 text-sm">Total Patients Seen</p>
            <p className="text-3xl font-bold">4,250</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Revenue Generated</p>
            <p className="text-3xl font-bold">$124.5K</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Average Rating</p>
            <p className="text-3xl font-bold">4.75/5</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Staff Efficiency</p>
            <p className="text-3xl font-bold">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
