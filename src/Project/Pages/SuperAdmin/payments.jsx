import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Search,
  ArrowLeft,
  Stethoscope,
  TrendingUp,
  Calendar,
  CreditCard,
  BarChart3,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
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
import { notify } from "../../../units/notification";

const COLORS = ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"];

function Payments() {
  const [view, setView] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorPayments, setDoctorPayments] = useState([]);
  const [doctorStats, setDoctorStats] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    method: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(
        "/superadmin/payments?limit=1000",
        { withCredentials: true }
      );
      setStatistics(res.data.data.statistics);
      setDoctors(res.data.data.statistics.topDoctors || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      notify.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorPayments = async (doctorId, page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (filters.status) params.append("status", filters.status);
      if (filters.method) params.append("method", filters.method);

      const res = await apiClient.get(
        `/superadmin/payments/doctor/${doctorId}?${params.toString()}`,
        { withCredentials: true }
      );
      setSelectedDoctor(res.data.data.doctor);
      setDoctorPayments(res.data.data.payments);
      setDoctorStats(res.data.data.statistics);
      setPagination(res.data.data.pagination);
      setView("doctor-details");
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching doctor payments:", err);
      notify.error("Failed to load doctor payments");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      method: "",
      dateFrom: "",
      dateTo: "",
    });
    setSearchTerm("");
    if (selectedDoctor) {
      fetchDoctorPayments(selectedDoctor._id, 1);
    }
  };

  const exportPayments = () => {
    const data = selectedDoctor ? doctorPayments : [];
    if (data.length === 0) {
      notify.error("No data to export");
      return;
    }
    
    const csv = [
      ["Patient", "Amount", "Method", "Status", "Date"].join(","),
      ...data.map((p) =>
        [
          p.patient?.fullName || "N/A",
          p.amount,
          p.method,
          p.status,
          new Date(p.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${selectedDoctor?.name || "all"}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    notify.success("Payments exported successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-gray-100 text-gray-800 border border-gray-300";
      case "Pending":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      case "Failed":
        return "bg-gray-200 text-gray-900 border border-gray-400";
      case "Refunded":
        return "bg-gray-100 text-gray-600 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = doctorPayments.filter((payment) => {
    if (filters.dateFrom && new Date(payment.createdAt) < new Date(filters.dateFrom)) {
      return false;
    }
    if (filters.dateTo && new Date(payment.createdAt) > new Date(filters.dateTo)) {
      return false;
    }
    return true;
  });

  if (loading && view === "doctors") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  // Doctor Details View
  if (view === "doctor-details" && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => {
              setView("doctors");
              setSelectedDoctor(null);
              clearFilters();
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Doctors</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {selectedDoctor.image ? (
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedDoctor.name}</h1>
              <p className="text-gray-600 mt-1">{selectedDoctor.specialization}</p>
              <p className="text-sm text-gray-500 mt-1">ID: {selectedDoctor.doctorId}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={exportPayments}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => {
                  clearFilters();
                  fetchDoctorPayments(selectedDoctor._id, 1);
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Filter Payments</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
              <select
                value={filters.method}
                onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                <option value="">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
                <option value="NetBanking">Net Banking</option>
              </select>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="From Date"
              />
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="To Date"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  fetchDoctorPayments(selectedDoctor._id, 1);
                }}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {doctorStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                ₹{doctorStats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {doctorStats.totalPayments}
              </p>
              <p className="text-sm text-gray-600">Total Payments</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                ₹{Math.round(doctorStats.totalRevenue / (doctorStats.totalPayments || 1)).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Average Payment</p>
            </div>
          </div>
        )}

        {/* Monthly Revenue Chart */}
        {doctorStats?.monthlyRevenue && doctorStats.monthlyRevenue.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={doctorStats.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f2937" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1f2937" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
                  stroke="#1f2937"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Payment History Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Payment History</h2>
            <p className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {pagination?.totalItems || 0} payments
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {payment.patient?.profileImage ? (
                            <img
                              src={payment.patient.profileImage}
                              alt={payment.patient.fullName}
                              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800 text-sm md:text-base">
                              {payment.patient?.fullName || "N/A"}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {payment.patient?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <p className="font-bold text-gray-800 text-sm md:text-base">
                          ₹{payment.amount.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className="text-gray-700 text-sm md:text-base">{payment.method}</span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">No payments found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * pagination.itemsPerPage) + 1} to{" "}
                {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                {pagination.totalItems} payments
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newPage = Math.max(1, currentPage - 1);
                    setCurrentPage(newPage);
                    fetchDoctorPayments(selectedDoctor._id, newPage);
                  }}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    const newPage = Math.min(pagination.totalPages, currentPage + 1);
                    setCurrentPage(newPage);
                    fetchDoctorPayments(selectedDoctor._id, newPage);
                  }}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Doctors List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Payment Analytics</h1>
        <p className="text-gray-600">View payments by doctor and analyze revenue</p>
      </div>

      {/* Overall Statistics */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </div>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
              ₹{statistics.totalRevenue.total.toLocaleString()}
            </p>
            <p className="text-xs md:text-sm text-gray-600">Total Revenue</p>
            <p className="text-xs text-gray-500 mt-1">
              {statistics.totalRevenue.count} payments
            </p>
          </div>

          {statistics.byStatus.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {stat._id === "Paid" ? (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                  ) : stat._id === "Pending" ? (
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                  ) : (
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                  )}
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                ₹{stat.total.toLocaleString()}
              </p>
              <p className="text-xs md:text-sm text-gray-600">{stat._id}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.count} payments</p>
            </div>
          ))}
        </div>
      )}

      {/* Payment Methods Chart */}
      {statistics?.byMethod && statistics.byMethod.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Revenue by Payment Method
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statistics.byMethod}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ _id, percent }) =>
                  `${_id}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="total"
              >
                {statistics.byMethod.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          Doctors Payment Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => fetchDoctorPayments(doctor.doctorId)}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  {doctor.doctorImage ? (
                    <img
                      src={doctor.doctorImage}
                      alt={doctor.doctorName}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-base md:text-lg">{doctor.doctorName}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Total Revenue</span>
                    <span className="text-base md:text-lg font-bold text-gray-800">
                      ₹{doctor.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Payments</span>
                    <span className="text-xs md:text-sm font-semibold text-gray-700">
                      {doctor.paymentCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs md:text-sm text-gray-600">Average</span>
                    <span className="text-xs md:text-sm font-semibold text-gray-700">
                      ₹{Math.round(doctor.totalRevenue / (doctor.paymentCount || 1)).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors text-xs md:text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No doctors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payments;
