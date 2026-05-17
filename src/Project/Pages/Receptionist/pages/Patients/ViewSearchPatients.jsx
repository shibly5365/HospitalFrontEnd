import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { notify } from "../../../../../Units/notification";
import PatientDetails from "./PatientDetails";
import EditPatient from "./EditPatient";
import RegisterPatient from "./RegisterPatient";

export default function ViewSearchPatients() {
  const PAGE_SIZE = 8;
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const delay = setTimeout(fetchPatients, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, page]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: PAGE_SIZE,
        ...(searchQuery && { search: searchQuery }),
      };
      const res = await apiClient.get(
        "/receptionist/patients",
        { params, withCredentials: true },
      );
      if (res.data.success) {
        const patientList = res.data.data.patients || [];
        const pagination = res.data.data.pagination || {};

        setPatients(patientList);
        setTotalPages(pagination.totalPages || 1);
        setTotalPatients(
          pagination.totalPatients ||
            pagination.totalItems ||
            pagination.total ||
            patientList.length,
        );
      }
    } catch (err) {
      notify.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) =>
    status === "critical"
      ? "bg-red-100 text-red-800"
      : status === "admitted"
        ? "bg-blue-100 text-blue-800"
        : "bg-green-100 text-green-800";

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowEdit(true);
  };
  const closeModal = () => {
    setShowDetails(false);
    setShowEdit(false);
    setSelectedPatient(null);
  };
  const onSuccess = (type) => {
    closeModal();
    if (type === "register") notify.success("Patient registered!");
    else notify.success("Updated!");
    fetchPatients();
  };

  const startItem = totalPatients === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = totalPatients === 0
    ? 0
    : Math.min((page - 1) * PAGE_SIZE + patients.length, totalPatients);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Patient Records
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Reception Desk • All Registered Patients
              </p>
            </div>
            <button
              onClick={() => setShowRegister(true)}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md transition"
            >
              <UserPlus size={18} /> Register New Patient
            </button>
          </div>
          <div className="mt-6 relative max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search patient by name, phone, email, or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-10 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading patient records...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <User size={40} className="text-gray-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              No Patients Found
            </h3>
            <p className="mt-2 text-gray-500">
              {searchQuery
                ? `No match for "${searchQuery}"`
                : "Start by registering your first patient"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr
                      key={patient._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {patient.fullName?.charAt(0).toUpperCase() || "P"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {patient.fullName || "Unknown Patient"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {patient.patientId || patient._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-400" />
                            {patient.contact || "—"}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            {patient.email || "—"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <div>{patient.age || "—"}</div>
                        <div className="text-gray-400">
                          {patient.gender || ""}
                        </div>
                        {patient.bloodGroup && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            {patient.bloodGroup}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {patient.lastVisit
                          ? new Date(patient.lastVisit).toLocaleDateString()
                          : "First Visit"}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}
                        >
                          {patient.status
                            ? patient.status.charAt(0).toUpperCase() +
                              patient.status.slice(1)
                            : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleView(patient)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(patient)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
                <span className="text-sm text-gray-600">
                  Showing {startItem}–{endItem} of {totalPatients} patients
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-4 py-2 font-medium">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <RegisterPatient
            onClose={() => setShowRegister(false)}
            onSuccess={() => {
              setShowRegister(false);
              fetchPatients();
              notify.success("Patient registered!");
            }}
          />
        </div>
      )}
      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <PatientDetails
            patient={selectedPatient}
            onClose={closeModal}
            onEdit={() => {
              setShowDetails(false);
              setShowEdit(true);
            }}
          />
        </div>
      )}
      {showEdit && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <EditPatient
            patient={selectedPatient}
            onClose={closeModal}
            onSuccess={() => {
              setShowEdit(false);
              fetchPatients();
              notify.success("Updated!");
            }}
          />
        </div>
      )}
    </div>
  );
}
