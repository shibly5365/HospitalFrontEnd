// import { useEffect, useState } from "react";
// import {
//   Calendar,
//   Plus,
//   Video,
//   Search,
//   SlidersHorizontal,
//   Trash2,
//   MapPin,
//   User,
//   CheckCircle,
//   AlertCircle,
//   ArrowLeft,
//   Home,
// } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const History = () => {
//   const [activeTab, setActiveTab] = useState("today");
//   const [appointments, setAppointments] = useState({
//     all: [],
//     today: [],
//     confirmed: [],
//     upcoming: [],
//     past: [],
//     cancelled: [],
//   });
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const navigate = useNavigate();

//   const tabs = [
//     { id: "today", label: "Today" },
//     { id: "all", label: "All" },
//     { id: "confirmed", label: "Confirmed" },
//     { id: "upcoming", label: "Upcoming" },
//     { id: "past", label: "Past" },
//     { id: "cancelled", label: "Cancelled" },
//   ];

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   /* ---------------- FETCH DATA ---------------- */
//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);

//       // 🔹 1. TODAY APPOINTMENTS
//       let today = [];
//       try {
//         const todayRes = await axios.get(
//           "http://localhost:4002/api/patient/today-appointments",
//           { withCredentials: true }
//         );
//         today = Array.isArray(todayRes.data.appointments)
//           ? todayRes.data.appointments
//           : [];
//       } catch (err) {
//         console.warn("Today appointments endpoint failed:", err.message);
//       }

//       // 🔹 2. ALL APPOINTMENTS
//       let all = [];
//       try {
//         const allRes = await axios.get(
//           "http://localhost:4002/api/patient/my",
//           { withCredentials: true }
//         );
//         // console.log(allRes);
        
//         all = Array.isArray(allRes.data.appointments)
//           ? allRes.data.appointments
//           : [];
//       } catch (err) {
//         console.warn("All appointments endpoint failed:", err.message);
//       }

//       const now = new Date();

//       const confirmed = all.filter((a) => a.status === "Confirmed");
//       const upcoming = all.filter(
//         (a) => new Date(a.appointmentDate) > now && a.status !== "Cancelled"
//       );
//       const past = all.filter((a) => a.status === "Completed");
//       const cancelled = all.filter((a) => a.status === "Cancelled");

//       setAppointments({
//         all,
//         today,
//         confirmed,
//         upcoming,
//         past,
//         cancelled,
//       });
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log("sfdafda",appointments);
  

//   /* ---------------- FILTER ---------------- */
//   const filtered = appointments[activeTab]?.filter((a) => {
//     if (!search) return true;
//     return a.doctor?.userId?.fullName
//       ?.toLowerCase()
//       .includes(search.toLowerCase());
//   });

//   console.log("filter",filtered);
  
//   /* ---------------- ACTIONS ---------------- */
//   const handleCancel = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:4002/api/patient/cancelappointments/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       setShowModal(false);
//       setSelected(null);
//       fetchAppointments();
//     } catch (err) {
//       console.error("Cancel failed:", err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this appointment?")) return;
//     try {
//       await axios.delete(
//         `http://localhost:4002/api/patient/appointmentsdeletes/${id}`,
//         { withCredentials: true }
//       );
//       fetchAppointments();
//     } catch (err) {
//       console.error("Delete failed:", err.message);
//     }
//   };

//   const StatusBadge = ({ status }) => {
//     const map = {
//       Pending: "bg-yellow-100 text-yellow-700",
//       Confirmed: "bg-blue-100 text-blue-700",
//       Completed: "bg-green-100 text-green-700",
//       Cancelled: "bg-red-100 text-red-700",
//     };
//     return (
//       <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>
//         {status}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent animate-spin rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* HEADER */}
//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div className="flex gap-3 items-center">
//             <button onClick={() => navigate(-1)}>
//               <ArrowLeft />
//             </button>
//             <button onClick={() => navigate("/")}>
//               <Home />
//             </button>
//             <h1 className="text-xl font-bold flex gap-2">
//               <Calendar /> Appointments
//             </h1>
//           </div>
//           <button
//             onClick={() => navigate("/patient/patient-Form")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg flex gap-2"
//           >
//             <Plus /> New
//           </button>
//         </div>

//         {/* TABS */}
//         <div className="bg-white p-2 rounded-xl shadow flex gap-2">
//           {tabs.map((t) => (
//             <button
//               key={t.id}
//               onClick={() => setActiveTab(t.id)}
//               className={`flex-1 py-2 rounded-lg ${
//                 activeTab === t.id ? "bg-blue-500 text-white" : "bg-gray-100"
//               }`}
//             >
//               {t.label} ({appointments[t.id]?.length || 0})
//             </button>
//           ))}
//         </div>

//         {/* SEARCH */}
//         <div className="bg-white p-4 rounded-xl shadow flex gap-3">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 text-gray-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search doctor..."
//               className="w-full pl-10 py-2 border rounded-lg"
//             />
//           </div>
//         </div>

//         {/* LIST */}
//         {filtered?.length ? (
//           filtered.map((a) => (
//             <div
//               key={a._id}
//               className="bg-white p-5 rounded-xl shadow flex justify-between"
//             >
//               <div>
//                 <h3 className="font-bold flex gap-2">
//                   {a.doctor?.userId?.fullName}
//                   <StatusBadge status={a.status} />
//                 </h3>
//                 <p className="text-sm flex gap-2">
//                   <User /> {a.doctor?.department?.name}
//                 </p>
//                 <p className="text-sm flex gap-2">
//                   <MapPin /> {a.consultationType} •{" "}
//                   {new Date(a.appointmentDate).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 {(activeTab === "today" ||
//                   activeTab === "upcoming" ||
//                   activeTab === "confirmed") &&
//                   a.consultationType === "Online" && (
//                     <button className="bg-blue-500 text-white px-3 py-2 rounded-lg">
//                       <Video /> Join
//                     </button>
//                   )}

//                 {activeTab === "cancelled" && (
//                   <button
//                     onClick={() => handleDelete(a._id)}
//                     className="bg-red-500 text-white px-3 py-2 rounded-lg"
//                   >
//                     <Trash2 /> Delete
//                   </button>
//                 )}

//                 {activeTab === "past" && (
//                   <span className="bg-green-100 text-green-600 px-3 py-2 rounded-lg">
//                     <CheckCircle /> Completed
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-white p-10 rounded-xl text-center shadow">
//             <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
//             <p>No {activeTab} appointments found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default History;


import { useEffect, useState } from "react";
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
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoCallModal from "../dashboard/VideoCallModal";

const History = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [appointments, setAppointments] = useState({
    all: [],
    today: [],
    confirmed: [],
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Video Call Modal states
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navigate = useNavigate();

  const tabs = [
    { id: "today", label: "Today" },
    { id: "all", label: "All" },
    { id: "confirmed", label: "Confirmed" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      let today = [];
      try {
        const todayRes = await axios.get(
          "http://localhost:4002/api/patient/today-appointments",
          { withCredentials: true }
        );
        today = Array.isArray(todayRes.data.appointments)
          ? todayRes.data.appointments
          : [];
      } catch (err) {
        console.warn("Today appointments endpoint failed:", err.message);
      }

      let all = [];
      try {
        const allRes = await axios.get(
          "http://localhost:4002/api/patient/my",
          { withCredentials: true }
        );
        all = Array.isArray(allRes.data.appointments)
          ? allRes.data.appointments
          : [];
      } catch (err) {
        console.warn("All appointments endpoint failed:", err.message);
      }

      const now = new Date();
      const confirmed = all.filter((a) => a.status === "Confirmed");
      const upcoming = all.filter(
        (a) => new Date(a.appointmentDate) > now && a.status !== "Cancelled"
      );
      const past = all.filter((a) => a.status === "Completed");
      const cancelled = all.filter((a) => a.status === "Cancelled");

      setAppointments({
        all,
        today,
        confirmed,
        upcoming,
        past,
        cancelled,
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filtered = appointments[activeTab]?.filter((a) => {
    if (!search) return true;
    return a.doctor?.userId?.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  /* ---------------- ACTIONS ---------------- */
  const handleCancel = async (id) => {
    try {
      await axios.put(
        `http://localhost:4002/api/patient/cancelappointments/${id}`,
        {},
        { withCredentials: true }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Cancel failed:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(
        `http://localhost:4002/api/patient/appointmentsdeletes/${id}`,
        { withCredentials: true }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const StatusBadge = ({ status }) => {
    const map = {
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div className="flex gap-3 items-center">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
            <button onClick={() => navigate("/")}>
              <Home />
            </button>
            <h1 className="text-xl font-bold flex gap-2">
              <Calendar /> Appointments
            </h1>
          </div>
          <button
            onClick={() => navigate("/patient/patient-Form")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex gap-2"
          >
            <Plus /> New
          </button>
        </div>

        {/* TABS */}
        <div className="bg-white p-2 rounded-xl shadow flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-lg ${
                activeTab === t.id ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {t.label} ({appointments[t.id]?.length || 0})
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor..."
              className="w-full pl-10 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* LIST */}
        {filtered?.length ? (
          filtered.map((a) => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold flex gap-2">
                  {a.doctor?.userId?.fullName}
                  <StatusBadge status={a.status} />
                </h3>
                <p className="text-sm flex gap-2">
                  <User /> {a.doctor?.department?.name}
                </p>
                <p className="text-sm flex gap-2">
                  <MapPin /> {a.consultationType} •{" "}
                  {new Date(a.appointmentDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                {(activeTab === "today" ||
                  activeTab === "upcoming" ||
                  activeTab === "confirmed") &&
                  a.consultationType === "Online" && (
                    <button
                      onClick={() => {
                        setSelectedAppointment(a);
                        setVideoModalOpen(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Video /> Join
                    </button>
                  )}

                {activeTab === "cancelled" && (
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                  >
                    <Trash2 /> Delete
                  </button>
                )}

                {activeTab === "past" && (
                  <span className="bg-green-100 text-green-600 px-3 py-2 rounded-lg">
                    <CheckCircle /> Completed
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-10 rounded-xl text-center shadow">
            <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
            <p>No {activeTab} appointments found</p>
          </div>
        )}
      </div>

      {/* ---------------- VIDEO CALL MODAL ---------------- */}
      <VideoCallModal
        open={videoModalOpen}
        appointment={selectedAppointment}
        onClose={() => setVideoModalOpen(false)}
        onCallEnd={() => {
          setVideoModalOpen(false);
          setSelectedAppointment(null);
        }}
      />
    </div>
  );
};

export default History;
