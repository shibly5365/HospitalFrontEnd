import { apiClient } from "../../../services/queryClient";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Settings,
  Users,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "./pages/ShowDoctors/Toast";
import DeleteConfirmModal from "./pages/ShowDoctors/DeleteConfirmModal";
import StatsCard from "./pages/ShowDoctors/StatsCard";
import DoctorFilters from "./pages/ShowDoctors/DoctorFilters";
import TableSkeleton from "./pages/ShowDoctors/TableSkeleton";
import DoctorTable from "./pages/ShowDoctors/DoctorTable";
import Pagination from "./pages/ShowDoctors/Pagination";
import EmptyState from "./pages/ShowDoctors/EmptyState";
import MobileDoctorCard from "./pages/ShowDoctors/MobileDoctorCard";

// Import components

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [statuses] = useState(["available", "unavailable"]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    doctorId: null,
    doctorName: "",
  });

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;

  // Stats
  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(
    (d) => d.status === "available",
  ).length;
  const unavailableDoctors = doctors.filter(
    (d) => d.status === "unavailable",
  ).length;
  const totalAppointmentsToday = doctors.reduce(
    (sum, d) => sum + (d.todaysAppointments || 0),
    0,
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await apiClient.get(
          "/admin/getAll-Doctor",
          { withCredentials: true },
        );

        const doctorsData =
          res.data.Doctors || res.data.doctors || res.data || [];
        setDoctors(doctorsData);

        const deptList = [
          ...new Set(doctorsData.map((doc) => doc.department).filter(Boolean)),
        ];
        const specList = [
          ...new Set(
            doctorsData.map((doc) => doc.specialization).filter(Boolean),
          ),
        ];

        setDepartments(deptList);
        setSpecialists(specList);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleEdit = (id) => {
    navigate(`/admin/doctorForm/${id}`);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ isOpen: true, doctorId: id, doctorName: name });
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(
        `/admin/delete-Doctor/${deleteModal.doctorId}`,
        { withCredentials: true },
      );
      setDoctors(doctors.filter((doc) => doc._id !== deleteModal.doctorId));
      showToast("Doctor deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting doctor:", err);
      showToast("Failed to delete doctor", "error");
    } finally {
      setDeleteModal({ isOpen: false, doctorId: null, doctorName: "" });
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedDept("");
    setSelectedSpec("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const fullName = (doc.userId?.fullName || doc.name || "").toLowerCase();
    const specialization = (doc.specialization || "").toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      specialization.includes(search.toLowerCase());

    const matchesDept = selectedDept ? doc.department === selectedDept : true;
    const matchesSpec = selectedSpec
      ? doc.specialization === selectedSpec
      : true;
    const matchesStatus = selectedStatus ? doc.status === selectedStatus : true;

    return matchesSearch && matchesDept && matchesSpec && matchesStatus;
  });

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor,
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, doctorId: null, doctorName: "" })
        }
        onConfirm={handleDeleteConfirm}
        doctorName={deleteModal.doctorName}
      />

      {/* Doctor Details Drawer */}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Doctors
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all registered doctors and their availability
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="Admin"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200"
                />
                <span className="font-medium text-gray-700 hidden sm:inline">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Doctors"
            value={totalDoctors}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Available Doctors"
            value={availableDoctors}
            icon={UserCheck}
            color="green"
          />
          <StatsCard
            title="Unavailable Doctors"
            value={unavailableDoctors}
            icon={UserX}
            color="red"
          />
          <StatsCard
            title="Today's Appointments"
            value={totalAppointmentsToday}
            icon={Calendar}
            color="purple"
          />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <DoctorFilters
              search={search}
              setSearch={setSearch}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              selectedSpec={selectedSpec}
              setSelectedSpec={setSelectedSpec}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              departments={departments}
              specialists={specialists}
              statuses={statuses}
              clearFilters={clearFilters}
              onAddDoctor={() => navigate("/admin/doctorForm")}
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            {loading ? (
              <TableSkeleton />
            ) : filteredDoctors.length === 0 ? (
              <EmptyState onAdd={() => navigate("/admin/doctorForm")} />
            ) : (
              <>
                <DoctorTable
                  doctors={currentDoctors}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {loading ? (
              <TableSkeleton />
            ) : filteredDoctors.length === 0 ? (
              <EmptyState onAdd={() => navigate("/admin/doctorForm")} />
            ) : (
              <>
                {currentDoctors.map((doc) => (
                  <MobileDoctorCard
                    key={doc._id}
                    doctor={doc}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
                {/* Mobile Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 pt-4">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDoctors;
