import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Search,
  Download,
  Calendar,
  Eye,
  Send,
  CheckCircle,
  X,
} from "lucide-react";

const PaymentDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Mock Data
  const stats = {
    totalRevenue: 1248500,
    thisPeriod: 248500,
    pending: 87500,
    transactions: 342,
    avgPerPatient: 3650,
    growth: 18.4,
  };

  const transactions = [
    {
      id: "INV-7842",
      patient: "Rahul Sharma",
      department: "Cardiology",
      amount: 12500,
      date: "2026-05-04",
      status: "paid",
      method: "UPI",
      doctor: "Dr. Vikram Rao",
    },
    {
      id: "INV-7841",
      patient: "Meera Nair",
      department: "Orthopedics",
      amount: 8900,
      date: "2026-05-04",
      status: "paid",
      method: "Card",
      doctor: "Dr. Anjali Menon",
    },
    {
      id: "INV-7840",
      patient: "Arjun Menon",
      department: "General Medicine",
      amount: 4500,
      date: "2026-05-03",
      status: "pending",
      method: "Cash",
      doctor: "Dr. Suresh Kumar",
    },
    {
      id: "INV-7839",
      patient: "Priya Sharma",
      department: "Gynecology",
      amount: 15600,
      date: "2026-05-03",
      status: "paid",
      method: "UPI",
      doctor: "Dr. Lakshmi Nair",
    },
    {
      id: "INV-7838",
      patient: "Sanjay Patel",
      department: "Neurology",
      amount: 28900,
      date: "2026-05-02",
      status: "paid",
      method: "Card",
      doctor: "Dr. Rajesh Iyer",
    },
  ];

  const topDepartments = [
    { name: "Cardiology", revenue: 285000, patients: 78, growth: 12 },
    { name: "Orthopedics", revenue: 198000, patients: 65, growth: -3 },
    { name: "Gynecology", revenue: 167000, patients: 52, growth: 22 },
    { name: "Neurology", revenue: 98000, patients: 28, growth: 8 },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const openInvoice = (invoice) => setSelectedInvoice(invoice);
  const closeInvoice = () => setSelectedInvoice(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Payments Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive Revenue Management
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50">
              <Download className="w-5 h-5" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
              <Calendar className="w-5 h-5" />
              New Invoice
            </button>
          </div>
        </div>

        {/* Period Filters */}
        <div className="flex gap-2 mb-8">
          {["week", "month", "year"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                activeFilter === f
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f === "week"
                ? "This Week"
                : f === "month"
                  ? "This Month"
                  : "This Year"}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total Revenue",
              value: stats.totalRevenue,
              color: "text-green-600",
              icon: DollarSign,
              trend: "+18.4%",
            },
            {
              title: "This Period",
              value: stats.thisPeriod,
              color: "text-blue-600",
              icon: TrendingUp,
              trend: "Current",
            },
            {
              title: "Pending",
              value: stats.pending,
              color: "text-orange-600",
              icon: Clock,
              trend: "32 Due",
            },
            {
              title: "Avg/Patient",
              value: stats.avgPerPatient,
              color: "text-purple-600",
              icon: Users,
              trend: "Stable",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className={`text-4xl font-bold mt-3 ${stat.color}`}>
                    {formatCurrency(stat.value)}
                  </p>
                </div>
                <stat.icon className={`w-12 h-12 ${stat.color}`} />
              </div>
              <p className="text-sm text-gray-500 mt-4">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Revenue Trend Chart */}
          <div className="xl:col-span-8 bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Revenue Trend • Last 30 Days
            </h2>
            <div className="h-96 flex items-end gap-3">
              {[45, 65, 55, 80, 70, 85, 75, 90, 82, 95, 88, 92, 78, 85, 91].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end group relative"
                  >
                    <div
                      className="bg-blue-500 hover:bg-blue-600 rounded-t-2xl transition-all"
                      style={{ height: `${h}%` }}
                    />
                    <p className="text-center text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition">
                      {i + 1}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="xl:col-span-4 bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Payment Breakdown</h2>
            <div className="space-y-6 mt-4">
              {[
                {
                  name: "UPI",
                  percent: 42,
                  amount: 456000,
                  color: "bg-green-500",
                },
                {
                  name: "Card",
                  percent: 35,
                  amount: 378000,
                  color: "bg-blue-500",
                },
                {
                  name: "Cash",
                  percent: 18,
                  amount: 189000,
                  color: "bg-amber-500",
                },
                {
                  name: "Insurance",
                  percent: 5,
                  amount: 54000,
                  color: "bg-purple-500",
                },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${m.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{m.name}</span>
                      <span className="font-semibold">
                        {formatCurrency(m.amount)}
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${m.color}`}
                        style={{ width: `${m.percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-medium text-gray-600 w-12">
                    {m.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Departments */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Top Performing Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topDepartments.map((dept, i) => (
              <div
                key={i}
                className="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition"
              >
                <p className="font-semibold text-lg">{dept.name}</p>
                <p className="text-2xl font-bold mt-2">
                  {formatCurrency(dept.revenue)}
                </p>
                <p className="text-sm text-gray-500">
                  {dept.patients} patients
                </p>
                <div
                  className={`text-sm mt-2 flex items-center gap-1 ${dept.growth > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {dept.growth > 0 ? "↑" : "↓"} {Math.abs(dept.growth)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-semibold">All Transactions</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patient or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-80 bg-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 border border-gray-200"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-5 py-3 bg-gray-100 border border-gray-200 rounded-2xl"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-600 text-sm">
                  <th className="px-6 py-5 text-left">Invoice</th>
                  <th className="px-6 py-5 text-left">Patient</th>
                  <th className="px-6 py-5 text-left">Department</th>
                  <th className="px-6 py-5 text-left">Doctor</th>
                  <th className="px-6 py-5 text-right">Amount</th>
                  <th className="px-6 py-5 text-left">Date</th>
                  <th className="px-6 py-5 text-center">Method</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-5 font-medium">{t.id}</td>
                    <td className="px-6 py-5 font-medium">{t.patient}</td>
                    <td className="px-6 py-5 text-gray-600">{t.department}</td>
                    <td className="px-6 py-5 text-gray-600">{t.doctor}</td>
                    <td className="px-6 py-5 text-right font-semibold text-lg">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-5 text-gray-600">{t.date}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">
                        {t.method}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`px-5 py-1 rounded-full text-sm font-medium ${
                          t.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => openInvoice(t)}
                        className="p-2 hover:bg-gray-200 rounded-xl transition"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold">
                    Invoice #{selectedInvoice.id}
                  </h2>
                  <p className="text-gray-500 mt-1">{selectedInvoice.date}</p>
                </div>
                <button
                  onClick={closeInvoice}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Patient</p>
                    <p className="font-semibold text-xl">
                      {selectedInvoice.patient}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Department</p>
                    <p className="font-semibold">
                      {selectedInvoice.department}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Treating Doctor</p>
                  <p className="font-medium">{selectedInvoice.doctor}</p>
                </div>

                <div className="border-t border-b py-6 my-6">
                  <div className="flex justify-between text-xl">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-3xl">
                      {formatCurrency(selectedInvoice.amount)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition">
                    Download PDF
                  </button>
                  {selectedInvoice.status === "pending" && (
                    <button className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition">
                      Send Payment Reminder
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
