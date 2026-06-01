import { apiClient } from "../../../../../services/queryClient";
import { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  Plus,
  Video,
  Search,
  Trash2,
  MapPin,
  User,
  CheckCircle,
  ArrowLeft,
  Home,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Edit3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoCallModal from "../dashboard/VideoCallModal";

const ITEMS_PER_PAGE = 6;

const History = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState({
    all: [],
    today: [],
    confirmed: [],
    upcoming: [],
    past: [],
    cancelled: [],
    pending: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navigate = useNavigate();

  const tabs = [
    { id: "today", label: "Today", color: "blue" },
    { id: "upcoming", label: "Upcoming", color: "indigo" },
    { id: "pending", label: "Pending", color: "amber" },
    { id: "confirmed", label: "Confirmed", color: "emerald" },
    { id: "all", label: "All", color: "gray" },
    { id: "past", label: "Past", color: "green" },
    { id: "cancelled", label: "Cancelled", color: "red" },
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setCurrentPage(1);

      const [todayRes, allRes] = await Promise.allSettled([
        apiClient.get("/patient/today-appointments", { withCredentials: true }),
        apiClient.get("/patient/my", { withCredentials: true }),
      ]);

      const today =
        todayRes.status === "fulfilled" &&
        Array.isArray(todayRes.value?.data?.appointments)
          ? todayRes.value.data.appointments
          : [];
      const all =
        allRes.status === "fulfilled" &&
        Array.isArray(allRes.value?.data?.appointments)
          ? allRes.value.data.appointments
          : [];

      const now = new Date();

      setAppointments({
        all,
        today,
        pending: all.filter((a) => a.status === "Pending"),
        confirmed: all.filter((a) => a.status === "Confirmed"),
        upcoming: all.filter(
          (a) => new Date(a.appointmentDate) > now && a.status !== "Cancelled",
        ),
        past: all.filter((a) => a.status === "Completed"),
        cancelled: all.filter((a) => a.status === "Cancelled"),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = useMemo(() => {
    return (
      appointments[activeTab]?.filter((appt) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          appt.doctor?.userId?.fullName?.toLowerCase().includes(q) ||
          appt.doctor?.department?.name?.toLowerCase().includes(q)
        );
      }) || []
    );
  }, [appointments, activeTab, search]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const stats = {
    total: appointments.all.length,
    pending: appointments.pending.length,
    upcoming: appointments.upcoming.length,
    completed: appointments.past.length,
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    await apiClient.put(
      `/patient/cancelappointments/${id}`,
      {},
      { withCredentials: true },
    );
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    await apiClient.delete(`/patient/appointmentsdeletes/${id}`, {
      withCredentials: true,
    });
    fetchAppointments();
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const getDaysLeft = (dateStr) => {
    const diff = Math.ceil(
      (new Date(dateStr) - new Date()) / (1000 * 3600 * 24),
    );
    return diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff} days`;
  };

  const StatusBadge = ({ status }) => {
const styles = {
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Completed: "bg-green-500/15 text-green-400 border-green-500/20",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};
    return (
      <span
        className={`px-4 py-1 text-xs font-semibold rounded-full border ${styles[status] || "bg-gray-100 theme-text-muted"}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-soft flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-soft pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Header + Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 hover:theme-surface rounded-2xl"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-semibold flex items-center gap-3 theme-text">
                <Calendar className="text-blue-600" size={32} /> My Appointments
              </h1>
              <p className="theme-text-muted">
                Professional healthcare management
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/patient/patient-Form")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium hover:shadow-xl transition-all active:scale-95"
          >
            <Plus size={20} /> New Appointment
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "blue" },
            { label: "Pending", value: stats.pending, color: "amber" },
            { label: "Upcoming", value: stats.upcoming, color: "indigo" },
            { label: "Completed", value: stats.completed, color: "emerald" },
          ].map((s) => (
            <div
              key={s.label}
              className="theme-card rounded-3xl p-6 soft-card"
            >
              <p className="text-sm theme-text-muted">{s.label}</p>
              <p className={`text-4xl font-semibold mt-2 text-${s.color}-600`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="theme-surface rounded-3xl soft-card p-1.5 flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
                setSearch("");
              }}
              className={`px-7 py-3.5 rounded-2xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? `bg-${tab.color}-600 text-white shadow-md`
                  : "hover:opacity-90 theme-text-muted"
              }`}
            >
              {tab.label}{" "}
              <span className="ml-1.5 text-xs opacity-70">
                ({appointments[tab.id]?.length || 0})
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-5 top-4 theme-text-muted" size={20} />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by doctor or department..."
            className="w-full pl-14 py-4 theme-surface border theme-border rounded-3xl theme-text focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base"
          />
        </div>

        {/* Tab Content */}
        {paginatedAppointments.length > 0 ? (
          <div
            className={
  ["confirmed", "upcoming"].includes(activeTab)
    ? "grid grid-cols-1 xl:grid-cols-2 gap-7"
    : "space-y-5"
}
          >
            {paginatedAppointments.map((appt) => {
              const { date, time } = formatDateTime(appt.appointmentDate);
              const daysLeft = getDaysLeft(appt.appointmentDate);

              // TODAY TAB - Compact Horizontal
              if (activeTab === "today") {
                return (
                  <div
                    key={appt._id}
                    className="bg-gradient-to-r theme-soft border border-blue-100 rounded-3xl p-5 hover:shadow-md transition-all flex items-center gap-5"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <User size={28} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          {appt.doctor?.userId?.fullName}
                        </h3>
                        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                          TODAY
                        </span>
                      </div>
                      <p className="theme-text-muted">
                        {appt.doctor?.department?.name}
                      </p>
                      <div className="flex gap-4 text-sm theme-text-muted mt-1">
                        <span>
                          {date} • {time}
                        </span>
                        <span>{appt.consultationType}</span>
                      </div>
                    </div>
                    {appt.consultationType === "Online" &&
                      appt.status === "Confirmed" && (
                        <button
                          onClick={() => {
                            setSelectedAppointment(appt);
                            setVideoModalOpen(true);
                          }}
                          className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                          <Video size={18} /> Join
                        </button>
                      )}
                  </div>
                );
              }

              // UPCOMING - Premium Grid
              if (activeTab === "upcoming") {
                return (
                  <div
                    key={appt._id}
                    className="theme-surface rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-indigo-100 overflow-hidden min-h-[220px]"
                  >
                    {/* Main Content */}
                    <div className="p-7">
                      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-7 flex items-start justify-between gap-6">
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl flex items-center justify-center flex-shrink-0">
                            <User size={28} className="text-indigo-600" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-[22px] font-semibold theme-text leading-tight truncate">
                              {appt.doctor?.userId?.fullName}
                            </h3>

                            <p className="text-[15px] theme-text-muted mt-1 truncate">
                              {appt.doctor?.department?.name}
                            </p>

                            <div className="flex items-center gap-1.5 mt-1.5 text-xs theme-text-muted">
                              <MapPin size={13} />
                              <span>{appt.consultationType}</span>
                            </div>
                          </div>
                        </div>

                        {/* CENTER */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                          {/* DATE */}
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                              <Calendar size={17} className="text-indigo-600" />
                            </div>

                            <div>
                              <p className="text-[10px] tracking-wider theme-text-muted">
                                DATE
                              </p>

                              <p className="text-sm font-medium theme-text leading-tight">
                                {date}
                              </p>
                            </div>
                          </div>

                          {/* TIME */}
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                              <Clock size={17} className="text-indigo-600" />
                            </div>

                            <div>
                              <p className="text-[10px] tracking-wider theme-text-muted">
                                TIME
                              </p>

                              <p className="text-sm font-medium theme-text leading-tight">
                                {time}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <StatusBadge status={appt.status} />

                          <div className="text-right">
                            <p className="text-[10px] theme-text-muted tracking-wide">
                              SCHEDULED
                            </p>

                            <p className="text-sm font-semibold text-indigo-600">
                              {daysLeft}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    {appt.consultationType === "Online" && (
                      <div className="border-t theme-soft px-5 py-4">
                        <button
                          onClick={() => {
                            setSelectedAppointment(appt);
                            setVideoModalOpen(true);
                          }}
                          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 font-medium text-sm shadow-sm hover:shadow-md transition-all"
                        >
                          <Video size={18} />
                          Join Call
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // CONFIRMED - Premium 3-Section + Bottom Bar
              // CONFIRMED - Clean & Modern Card (Matching Image Style)
              if (activeTab === "confirmed") {
                return (
                  <div
                    key={appt._id}
                    className="theme-card rounded-3xl soft-card hover:shadow-xl transition-all overflow-hidden"
                  >
                    {/* Top Info Section - Like in the image */}
                    <div className="p-7 border-b theme-border">
                      <div className="flex items-center justify-between">
                        {/* Date */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <Calendar size={18} className="text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-[10px] theme-text-muted tracking-widest">
                              DATE
                            </p>
                            <p className="text-sm font-medium theme-text">
                              {date}
                            </p>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <Clock size={18} className="text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-[10px] theme-text-muted tracking-widest">
                              TIME
                            </p>
                            <p className="text-sm font-medium theme-text">
                              {time}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <span className="px-4 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                            Confirmed
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm theme-text-muted">
                        <MapPin size={16} className="theme-text-muted" />
                        <span>{appt.consultationType} Consultation</span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="px-7 py-6 flex items-center gap-5 border-b theme-border">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <User size={28} className="text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg theme-text">
                          {appt.doctor?.userId?.fullName}
                        </h3>
                        <p className="theme-text-muted text-sm">
                          {appt.doctor?.department?.name}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="p-7 flex flex-col sm:flex-row gap-3 theme-soft">
                      {appt.consultationType === "Online" && (
                        <button
                          onClick={() => {
                            setSelectedAppointment(appt);
                            setVideoModalOpen(true);
                          }}
                          className="flex-1 theme-brand-bg hover:opacity-90 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
                        >
                          <Video size={18} />
                          Join Call
                        </button>
                      )}

                      <button
                        onClick={() => handleCancel(appt._id)}
                        className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-2xl font-medium transition-all"
                      >
                        Cancel
                      </button>

                      <button className="flex-1 border theme-border hover:opacity-90 py-3 rounded-2xl font-medium transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                );
              }

              // PENDING, PAST, CANCELLED, ALL - Handled with unique styling
              return (
                <div
                  key={appt._id}
                  className={`theme-surface rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all border ${
                    activeTab === "pending"
                      ? "border-amber-200"
                      : activeTab === "cancelled"
                        ? "border-red-100 opacity-95"
                        : "theme-border"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${activeTab === "pending" ? "bg-amber-100" : "bg-gradient-to-br from-blue-100 to-indigo-100"}`}
                    >
                      <User
                        size={32}
                        className={
                          activeTab === "pending"
                            ? "text-amber-600"
                            : "text-blue-600"
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-xl">
                            {appt.doctor?.userId?.fullName}
                          </h3>
                          <p className="theme-text-muted">
                            {appt.doctor?.department?.name}
                          </p>
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-6 text-sm theme-text-muted">
                        <div>
                          {date} • {time}
                        </div>
                        <div>{appt.consultationType}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {activeTab === "pending" && (
                      <>
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="flex-1 py-3 border border-red-300 text-red-600 rounded-2xl hover:bg-red-50"
                        >
                          Cancel
                        </button>
                        <button className="flex-1 py-3 bg-amber-600 text-white rounded-2xl flex items-center justify-center gap-2">
                          <Edit3 size={18} /> Edit
                        </button>
                      </>
                    )}
                    {activeTab === "past" && (
                      <button className="flex-1 py-3 bg-green-100 text-green-700 rounded-2xl font-medium">
                        View Summary
                      </button>
                    )}
                    {activeTab === "cancelled" && (
                      <button
                        onClick={() => handleDelete(appt._id)}
                        className="flex-1 py-3 bg-red-500 text-white rounded-2xl"
                      >
                        Delete Record
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="theme-surface rounded-3xl py-20 text-center border border-dashed theme-border">
            <AlertCircle size={70} className="mx-auto text-gray-300 mb-4" />
            <p className="text-2xl font-medium theme-text-muted">
              No appointments found
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-4 border rounded-2xl hover:opacity-90 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="px-8 py-4 theme-surface border theme-border rounded-2xl font-medium theme-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-4 border rounded-2xl hover:opacity-90 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <VideoCallModal
        open={videoModalOpen}
        appointment={selectedAppointment}
        role="patient"
        onClose={() => setVideoModalOpen(false)}
        onCallEnd={() => {
          setVideoModalOpen(false);
          fetchAppointments();
        }}
      />
    </div>
  );
};

export default History;
