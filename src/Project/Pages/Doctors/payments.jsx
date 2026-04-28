import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  CreditCard,
  Wallet,
  TrendingUp,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  User,
  Phone,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  getAllPayments,
  getPaymentById,
  refundPayment,
  getStats,
  getWeeklyRevenue,
  getPaymentMethods,
} from "../../../services/doctorPaymentService";
const PaymentManagementSystem = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [methodData, setMethodData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [paymentsRes, statsRes, revenueRes, methodRes] = await Promise.all([
        getAllPayments({
          page: currentPage,
          limit: 8,
          search: searchTerm,
          status: filterStatus,
          method: filterMethod,
        }),
        getStats(),
        getWeeklyRevenue(),
        getPaymentMethods(),
      ]);

      setPayments(paymentsRes.data.data);
      setStats(statsRes.data.data || {});

      setRevenueData(
        revenueRes.data.data.map((d) => ({
          name: `Week ${d._id.week}`,
          revenue: d.revenue,
        })),
      );

      const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

      setMethodData(
        methodRes.data.data.map((m, index) => ({
          name: m._id,
          value: m.count,
          color: COLORS[index % COLORS.length],
        })),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentPage, searchTerm, filterStatus, filterMethod]);
  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Failed: "bg-red-100 text-red-700",
      Refunded: "bg-purple-100 text-purple-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Completed: <CheckCircle className="w-4 h-4" />,
      Pending: <Clock className="w-4 h-4" />,
      Failed: <XCircle className="w-4 h-4" />,
      Refunded: <RefreshCw className="w-4 h-4" />,
    };
    return icons[status];
  };

  const getMethodIcon = (method) =>
    method === "Cash" ? (
      <Wallet className="w-4 h-4" />
    ) : (
      <CreditCard className="w-4 h-4" />
    );

  // Filter and pagination

  const totalRevenue = stats.totalRevenue || 0;

  const todayEarnings = stats.totalEarnings || 0;

  const pendingPayments = stats.pendingPayments || 0;

  const totalTransactions = stats.totalTransactions || 0;

  const totalPages = Math.ceil((stats.totalTransactions || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments;

  {
    loading && <p className="text-center py-4 text-gray-500">Loading...</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Payment Management
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage all hospital transactions
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Revenue",
              value: `₹${totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "blue",
              trend: true,
            },
            {
              title: "Today's Earnings",
              value: `₹${todayEarnings.toLocaleString()}`,
              icon: Calendar,
              color: "green",
              trend: true,
            },
            {
              title: "Pending Payments",
              value: pendingPayments,
              icon: Clock,
              color: "yellow",
            },
            {
              title: "Total Transactions",
              value: totalTransactions,
              icon: CreditCard,
              color: "purple",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${card.color}-600 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`bg-${card.color}-100 rounded-full p-3`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                {card.trend && (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Methods</option>
                <option value="Online">Online</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  {[
                    "Patient",
                    "Payment ID",
                    "Date & Time",
                    "Type",
                    "Amount",
                    "Status",
                    "Method",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {payment.patientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {payment.patientId}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {payment.paymentId}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{payment.date}</p>
                      <p className="text-sm text-gray-500">{payment.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {payment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}
                      >
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">{payment.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-gray-700">
                        {getMethodIcon(payment.method)}
                        <span className="ml-2 text-sm font-medium">
                          {payment.method}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          try {
                            const res = await getPaymentById(payment._id);

                            setSelectedPayment({
                              ...payment,
                              ...res.data.data.patientInfo,
                              ...res.data.data.paymentInfo,
                              items: res.data.data.bill,
                              total: res.data.data.totalAmount,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && !loading && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No payments found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <span className="text-gray-600">
              Page{" "}
              <span className="font-bold text-blue-600">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Weekly Revenue Trend
            </h3>
            <div className="w-full h-[250px] sm:h-[300px] md:h-[320px]">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Payment Method Distribution
            </h3>
            <div className="w-full h-[250px] sm:h-[300px] md:h-[320px]">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={methodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 640 ? 30 : 50}
                    outerRadius={window.innerWidth < 640 ? 60 : 90}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false} 
                  >
                    {methodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      padding: "8px",
                    }}
                    formatter={(value, name) => [`${value} payments`, name]}
                  />

                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {selectedPayment.paymentId}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Patient Information */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Name", value: selectedPayment.patientName },
                    { label: "Patient ID", value: selectedPayment.patientId },
                    { label: "Gender", value: selectedPayment.gender },
                    {
                      label: "Contact",
                      value: selectedPayment.contact,
                      icon: Phone,
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-600 flex items-center">
                        {item.icon && <item.icon className="w-3 h-3 mr-1" />}
                        {item.label}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Payment ID", value: selectedPayment.paymentId },
                    { label: "Type", value: selectedPayment.type },
                    {
                      label: "Amount",
                      value: `₹${selectedPayment.amount.toLocaleString()}`,
                      bold: true,
                    },
                    {
                      label: "Date",
                      value: new Date(selectedPayment.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      ),
                    },
                    { label: "Method", value: selectedPayment.method },
                    {
                      label: "Status",
                      value: selectedPayment.status,
                      status: true,
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      {item.status ? (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPayment.status)}`}
                        >
                          {getStatusIcon(selectedPayment.status)}
                          <span className="ml-1">{item.value}</span>
                        </span>
                      ) : (
                        <p
                          className={`font-semibold text-gray-800 ${item.bold ? "text-lg font-bold" : ""}`}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Itemized Bill */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  Itemized Bill
                </h3>
                <div className="space-y-3">
                  {selectedPayment.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <span
                        className={`font-semibold ${item.amount < 0 ? "text-red-600" : "text-gray-800"}`}
                      >
                        {item.amount < 0 ? "-" : ""}₹
                        {Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg font-bold mt-4">
                    <span>Total Amount</span>
                    <span>₹{selectedPayment.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {selectedPayment.status === "Pending" && (
                  <>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve Payment
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject Payment
                    </button>
                  </>
                )}
                {selectedPayment.status === "Completed" && (
                  <button
                    onClick={async () => {
                      try {
                        await refundPayment(selectedPayment._id);
                        fetchAllData();
                        setSelectedPayment(null);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Process Refund
                  </button>
                )}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Receipt
                </button>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Footer */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {[
          { icon: Download, color: "green" },
          { icon: RefreshCw, color: "blue" },
          { icon: FileText, color: "purple" },
        ].map((action, index) => (
          <button
            key={index}
            className={`bg-${action.color}-600 hover:bg-${action.color}-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center`}
          >
            <action.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentManagementSystem;
