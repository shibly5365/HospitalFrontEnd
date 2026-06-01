import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Eye,
  Calendar,
  CreditCard,
  MapPin,
  X,
  Loader2,
} from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../services/queryClient";

// API Call Functions
const fetchPayments = async () => {
  const { data } = await apiClient.get("/patient/payment");
  return data;
};

const fetchPaymentById = async (id) => {
  const { data } = await apiClient.get(`/patient/payment/${id}`);
  return data;
};

const statusColors = {
  Paid: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  Pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  Failed:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

const PatientPaymentHistory = () => {
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Fetch All Payments
  const { data, isLoading, error } = useQuery({
    queryKey: ["patientPayments"],
    queryFn: fetchPayments,
    staleTime: 1000 * 60 * 2,
  });

  const payments = Array.isArray(data) ? data : data?.payments || [];
  const patient = data?.patient;

  // Fetch Single Payment Details
  const { data: selectedPayment, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["paymentDetail", selectedPaymentId],
    queryFn: () => fetchPaymentById(selectedPaymentId),
    enabled: !!selectedPaymentId,
  });

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.doctor?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.paymentId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || payment.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const lastPayment = payments[0];
  window.console.log("faa", selectedPayment);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Failed to load payment history
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Payment History
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View all your consultation and treatment payments
            </p>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mt-4 md:mt-0">
            <Download size={20} />
            Export History
          </button>
        </div>

        {/* Patient Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* LEFT */}
            <div className="flex items-center gap-5 flex-1">
              <img
                src={
                  patient?.profileImage ||
                  "https://ui-avatars.com/api/?name=Patient"
                }
                alt=""
                className="w-24 h-24 rounded-3xl object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
              />

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {patient?.name || "Unknown Patient"}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Patient ID: {patient?.patientId || "N/A"}
                </p>
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full lg:w-auto">
              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl px-6 py-5 text-center border border-gray-100 dark:border-gray-800 min-w-[150px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Appointments
                </p>

                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  {payments.length}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl px-6 py-5 text-center border border-gray-100 dark:border-gray-800 min-w-[150px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Spent
                </p>

                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ₹{totalSpent}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl px-6 py-5 text-center border border-gray-100 dark:border-gray-800 min-w-[150px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Payment
                </p>

                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  {lastPayment?.appointment?.date
                    ? new Date(
                        lastPayment.appointment.date,
                      ).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by doctor or payment ID..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <button className="px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Calendar size={20} />
            Date Filter
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Payment ID
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Doctor
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Amount
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-5 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedPayments.map((payment) => (
                    <tr
                      key={payment._id || payment.id}
                      className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all duration-300"
                    >
                      {/* PAYMENT ID */}
                      <td className="px-6 py-6">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white tracking-wide">
                            {payment.paymentId}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Transaction ID
                          </p>
                        </div>
                      </td>

                      {/* DOCTOR */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={
                                payment.doctor?.profileImage ||
                                "https://ui-avatars.com/api/?name=Doctor"
                              }
                              alt=""
                              className="w-12 h-12 rounded-2xl object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                            />

                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {payment.doctor?.name}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                              {payment.doctor?.specialization}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DATE & TIME */}
                      <td className="px-6 py-6">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(
                              payment.appointment?.date,
                            ).toLocaleDateString()}
                          </p>

                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {payment.appointment?.time?.start} -{" "}
                            {payment.appointment?.time?.end}
                          </p>
                        </div>
                      </td>

                      {/* CONSULTATION TYPE */}
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-2xl text-xs font-semibold tracking-wide
          ${
            payment.appointment?.type === "Online"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
          }`}
                        >
                          {payment.appointment?.type}
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-6">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{payment.amount}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {payment.paymentMethod}
                          </p>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold border
          ${statusColors[payment.paymentStatus]}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current opacity-80" />

                          {payment.paymentStatus}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() =>
                              setSelectedPaymentId(payment._id || payment.id)
                            }
                            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200"
                          >
                            <Eye
                              size={18}
                              className="text-gray-600 dark:text-gray-300"
                            />
                          </button>

                          <button className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200">
                            <Download
                              size={18}
                              className="text-gray-600 dark:text-gray-300"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              {filteredPayments.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6 px-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredPayments.length,
                    )}{" "}
                    of {filteredPayments.length} payments
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all
          ${
            currentPage === index + 1
              ? "bg-indigo-600 text-white"
              : "border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {filteredPayments.length === 0 && !isLoading && (
          <div className="text-center py-20 text-gray-400">
            No payment records found
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {selectedPaymentId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold">Payment Details</h3>
                <p className="text-gray-500">
                  {selectedPayment?.doctor?.paymentId}
                </p>
              </div>
              <button
                onClick={() => setSelectedPaymentId(null)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl"
              >
                <X size={26} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {isLoadingDetails ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
              ) : selectedPayment ? (
                <>
                  {/* Doctor Info */}
                  <div className="flex gap-6 mb-8">
                    <img
                      src={selectedPayment?.payment?.doctor?.profileImage}
                      alt=""
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                    <div>
                      <h4 className="text-2xl font-semibold">
                        {selectedPayment?.payment?.doctor?.name}
                      </h4>
                      <p className="text-indigo-600">
                        {selectedPayment?.payment?.doctor?.specialization}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
                        <MapPin size={18} />
                        <span>{selectedPayment.hospitalName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 mb-8">
                    <h5 className="font-semibold mb-4">Payment Breakdown</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Consultation Fee</span>
                        <span>
                          ₹
                          {selectedPayment?.payment?.billBreakdown
                            ?.consultationFee || selectedPayment.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Charge</span>
                        <span>
                          ₹{selectedPayment.breakdown?.serviceCharge || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (GST)</span>
                        <span>₹{selectedPayment.breakdown?.tax || 0}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{selectedPayment.amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Appointment
                      </p>

                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(
                          selectedPayment?.payment?.appointment?.date,
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedPayment?.payment?.appointment?.time?.start} -{" "}
                        {selectedPayment?.payment?.appointment?.time?.end}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Payment Method</p>
                      <p className="flex items-center gap-2">
                        <CreditCard size={18} />{" "}
                        {selectedPayment?.payment?.paymentMethod}
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium">
                Download Invoice
              </button>
              <button
                onClick={() => setSelectedPaymentId(null)}
                className="flex-1 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPaymentHistory;
