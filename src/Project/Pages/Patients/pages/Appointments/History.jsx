import { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Video,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Trash2,
  Clock,
  MapPin,
  User,
  Stethoscope,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Home,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [appointments, setAppointments] = useState({
    all: [],
    confirmed: [],
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    { id: "all", label: "All", color: "purple" },
    { id: "confirmed", label: "Confirmed", color: "blue" },
    { id: "upcoming", label: "Upcoming", color: "green" },
    { id: "past", label: "Past", color: "gray" },
    { id: "cancelled", label: "Cancelled", color: "red" },
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4002/api/patient/getAllappointments",
        { withCredentials: true }
      );

      if (!data.appointments) return;

      const today = new Date();
      const upcoming = data.appointments.filter(
        (a) => a.status !== "Cancelled" && new Date(a.appointmentDate) >= today
      );
      const past = data.appointments.filter((a) => a.status === "Completed");
      const cancelled = data.appointments.filter(
        (a) => a.status === "Cancelled"
      );
      const confirmed = data.appointments.filter(
        (a) => a.status === "Confirmed"
      );

      setAppointments({
        all: data.appointments,
        confirmed,
        upcoming,
        past,
        cancelled,
      });
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    await axios.put(
      `http://localhost:4002/api/patient/cancelappointments/${id}`,
      {},
      { withCredentials: true }
    );
    setShowModal(false);
    setSelected(null);
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    await axios.delete(
      `http://localhost:4002/api/patient/appointmentsdeletes/${id}`,
      { withCredentials: true }
    );
    fetchAppointments();
  };

  const filtered = appointments[activeTab]?.filter((a) =>
    a.doctor?.userId?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (d) => {
    const date = new Date(d);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const StatusBadge = ({ status }) => {
    const cfg =
      {
        Pending: "bg-yellow-100 text-yellow-700",
        Confirmed: "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
      }[status] || "bg-gray-100 text-gray-700";
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cfg}`}>
        {status}
      </span>
    );
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent animate-spin rounded-full" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with Back + Home */}
        <div className="bg-white p-5 rounded-2xl shadow flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Home className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 ml-2 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" /> Appointments
            </h1>
          </div>

          <button
            onClick={() => navigate("/patient/patient-Form")}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow hover:scale-105 transition"
          >
            <Plus className="w-5 h-5" /> New Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow p-3 flex gap-2 justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-xl font-medium capitalize transition-all ${
                activeTab === t.id
                  ? `bg-gradient-to-r from-${t.color}-500 to-${t.color}-600 text-white shadow`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label} ({appointments[t.id]?.length || 0})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </button>
        </div>

        {/* Appointment List */}
        {filtered?.length > 0 ? (
          filtered.map((a) => {
            const { date, time } = formatDate(a.appointmentDate);
            return (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={
                      a.doctor?.userId.profileImage || "/api/placeholder/80/80"
                    }
                    alt="doctor"
                    className="w-16 h-16 rounded-xl object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      {a.doctor?.userId.fullName || "Unknown"}{" "}
                      <StatusBadge status={a.status} />
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                      <User className="w-4 h-4" />{" "}
                      {a.doctor?.department?.name || "General"}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {a.consultationType} •{" "}
                      {new Date(a.appointmentDate).toLocaleDateString()} •{" "}
                      {a.timeSlot
                        ? `${a.timeSlot.start} - ${a.timeSlot.end}`
                        : "Time not set"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* Upcoming actions */}
                  {activeTab === "upcoming" && (
                    <>
                      {a.consultationType === "Online" && (
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                          <Video className="w-4 h-4" /> Join
                        </button>
                      )}
                      <button
                        onClick={() =>
                          navigate(
                            `/patient/patient-appointmenSchedule/${a._id}`
                          )
                        }
                        className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                      >
                        <RefreshCcw className="w-4 h-4" /> Reschedule
                      </button>
                      {(a.status === "Pending" || a.status === "Confirmed") && (
                        <button
                          onClick={() => {
                            setSelected(a);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      )}
                    </>
                  )}

                  {/* Confirmed tab actions */}
                  {activeTab === "confirmed" &&
                    a.consultationType === "Online" && (
                      <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Video className="w-4 h-4" /> Join
                      </button>
                    )}

                  {/* Cancelled actions */}
                  {activeTab === "cancelled" && (
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}

                  {/* Past actions */}
                  {activeTab === "past" && (
                    <button className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-600 rounded-lg">
                      <CheckCircle className="w-4 h-4" /> Completed
                    </button>
                  )}

                  {/* All tab: show status */}
                  {activeTab === "all" && <StatusBadge status={a.status} />}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-10 rounded-2xl text-center shadow">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No {activeTab} appointments found</p>
            <button
              onClick={() => navigate("/patient/patient-Form")}
              className="mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Book New Appointment
            </button>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-800">
                Cancel Appointment
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              Cancel appointment with <b>{selected.doctor?.userId?.fullName}</b>{" "}
              on <b>{formatDate(selected.appointmentDate).date}</b>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-100 rounded-lg"
              >
                Keep
              </button>
              <button
                onClick={() => handleCancel(selected._id)}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
