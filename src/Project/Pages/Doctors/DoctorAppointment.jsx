import { apiClient } from "../../../services/queryClient";
// ModernDoctorAppointments.jsx
import React, { useState, useEffect } from "react";
import { Users, Calendar } from "lucide-react";
import Header from "./DoctorPages/appointments/Header";
import StatsCards from "./DoctorPages/appointments/StatsCards";
import SearchFilters from "./DoctorPages/appointments/SearchFilters";
import ViewToggle from "./DoctorPages/appointments/ViewToggle";
import AppointmentCard from "./DoctorPages/appointments/AppointmentCard";
import NewAppointmentModal from "./DoctorPages/appointments/NewAppointmentModal";

const ITEMS_PER_PAGE = 10;

const ModernDoctorAppointments = () => {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("Today");
  const [showForm, setShowForm] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* --------------------------------------------------
     FETCH APPOINTMENTS
  -------------------------------------------------- */
  const fetchAppointments = async () => {
    try {
      const res = await apiClient.get(
        "/doctor/allAppointment",
        { withCredentials: true },
      );

      const formatted = res.data.appointments.map((a) => ({
        _id: a._id,
        patient: {
          fullName: a.patient?.fullName || "Unknown",
          age: a.patient?.age,
          gender: a.patient?.gender,
          phone: a.patient?.contact,
          avatar: a.patient?.fullName
            ? a.patient.fullName
                .split(" ")
                .map((w) => w[0])
                .join("")
            : "P",
        },
        reason: a.reason,
        timeSlot: a.timeSlot,
        status: a.status,
        consultationType: a.consultationType,
        date: a.appointmentDate,
        notes: a.notes || "",
        isUrgent: false,

        // ✅ ADD THIS
        videoCallEnabled: a.videoCallEnabled,
      }));

      setAppointments(formatted);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter]);

  /* --------------------------------------------------
     STATS
  -------------------------------------------------- */
  const stats = {
    total: appointments.length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  /* --------------------------------------------------
     UPDATE STATUS
  -------------------------------------------------- */
  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const res = await apiClient.put(
        `/doctor/statusAppo/${appointmentId}`,
        { status: newStatus },
        { withCredentials: true },
      );
      console.log(res.data);
      const updated = res.data.appointment;

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? {
                ...appt,

                // ✅ important fields
                status: updated.status,
                videoCallEnabled: updated.videoCallEnabled,
                videoCallStatus: updated.videoCallStatus,
                tokenNumber: updated.tokenNumber,
                paymentStatus: updated.paymentStatus,
              }
            : appt,
        ),
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update appointment status");
    }
  };

  /* --------------------------------------------------
     FILTER
  -------------------------------------------------- */

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.patient?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appt.reason?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || appt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* --------------------------------------------------
     🔥 SORT: ONLY Pending first (NO time-based sorting)
  -------------------------------------------------- */
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return 0; // keep original order
  });

  /* --------------------------------------------------
     PAGINATION
  -------------------------------------------------- */
  const totalPages = Math.ceil(sortedAppointments.length / ITEMS_PER_PAGE);

  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onNewAppointment={() => setShowForm(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          statusFilter={statusFilter}
          onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
          dateFilter={dateFilter}
          onDateFilterChange={(e) => setDateFilter(e.target.value)}
        />

        <ViewToggle
          view={view}
          onViewChange={setView}
          appointmentCount={sortedAppointments.length}
        />

        {view === "list" && (
          <div className="space-y-4">
            {paginatedAppointments.length > 0 ? (
              paginatedAppointments.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appointment={appt}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                <Users className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-blue-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {view === "calendar" && (
          <div className="bg-white rounded-2xl p-16 text-center shadow-md">
            <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Calendar View
            </h3>
            <p className="text-gray-500">Coming soon</p>
          </div>
        )}
      </div>

      <NewAppointmentModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
};

export default ModernDoctorAppointments;
