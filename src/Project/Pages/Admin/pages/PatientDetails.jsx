import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Phone,
  Mail,
  CalendarDays,
  User,
  Stethoscope,
  Activity,
  ClipboardList,
  BadgeCheck,
  CircleAlert,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/getpatients/${id}`,
          { withCredentials: true },
        );
        console.log("faaa", res.data);

        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const appointments = patient?.appointments || [];
  const doctorsSeen = patient?.summary?.doctorsSeen || [];

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate),
    );
  }, [appointments]);

  const chartData = useMemo(() => {
    const monthlyMap = {};

    appointments.forEach((a) => {
      const date = new Date(a.appointmentDate);
      const key = date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });

      if (!monthlyMap[key]) {
        monthlyMap[key] = { month: key, visits: 0, cancelled: 0 };
      }

      monthlyMap[key].visits += 1;
      if (a.status === "Cancelled") {
        monthlyMap[key].cancelled += 1;
      }
    });

    return Object.values(monthlyMap);
  }, [appointments]);

  const uniqueDepartments = useMemo(() => {
    const deps = doctorsSeen
      .map((doc) => doc?.department?.name)
      .filter(Boolean);
    return [...new Set(deps)];
  }, [doctorsSeen]);

  const completionRate = useMemo(() => {
    if (!appointments.length) return 0;
    const completed = appointments.filter(
      (a) => a.status === "Confirmed" || a.status === "Completed",
    ).length;
    return Math.round((completed / appointments.length) * 100);
  }, [appointments]);

  const latestAppointment = sortedAppointments[0];
  const lastDoctor = latestAppointment?.doctor?.userId?.fullName || "N/A";
  const patientInitial = patient?.fullName?.charAt(0)?.toUpperCase() || "P";

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      case "Pending":
      case "Inprogress":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  console.log("doc",doctorsSeen);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 w-48 rounded-xl bg-slate-200" />
          <div className="h-40 rounded-3xl bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200" />
            ))}
          </div>
          <div className="h-72 rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center">
          <CircleAlert className="mx-auto mb-4 text-rose-500" size={42} />
          <h2 className="text-2xl font-bold text-slate-800">
            Patient not found
          </h2>
          <p className="text-slate-500 mt-2">
            The patient record could not be loaded.
          </p>
          <button
            onClick={() => navigate("/admin/admin-patient")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
          >
            <Home size={18} />
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/admin-patient")}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          <Home size={18} />
          Back to Patients
        </button>

        <div className="text-sm text-slate-500">
          Admin / Patients /{" "}
          <span className="font-semibold text-slate-700">
            {patient.fullName}
          </span>
        </div>
      </div>

      {/* Hero Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur border border-white/20 shadow-md">
              <img
                src={patient.profileImage}
                alt={patient.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-violet-200 mb-2">
                Patient Profile
              </p>
              <h1 className="text-3xl md:text-4xl font-bold">
                {patient.fullName}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm">
                  {patient.gender || "N/A"}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm">
                  {patient.age ? `${patient.age} years` : "Age N/A"}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/20 text-sm">
                  Active Patient
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 min-w-[220px]">
              <div className="flex items-center gap-2 text-violet-200 text-sm mb-1">
                <Phone size={16} />
                Phone
              </div>
              <p className="font-semibold">{patient.contact || "N/A"}</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 min-w-[220px]">
              <div className="flex items-center gap-2 text-violet-200 text-sm mb-1">
                <Mail size={16} />
                Email
              </div>
              <p className="font-semibold break-all">
                {patient.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm">Total Visits</p>
            <Activity className="text-violet-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            {patient.summary?.totalVisits || 0}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            All recorded patient visits
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm">Cancelled</p>
            <CircleAlert className="text-rose-500" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            {patient.summary?.cancelledCount || 0}
          </h2>
          <p className="text-sm text-slate-500 mt-2">Cancelled appointments</p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm">Completion Rate</p>
            <BadgeCheck className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            {completionRate}%
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Completed or confirmed visits
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm">Last Visit</p>
            <CalendarDays className="text-sky-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            {patient.summary?.lastVisitDate
              ? new Date(patient.summary.lastVisitDate).toLocaleDateString()
              : "N/A"}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Most recent recorded visit
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Activity chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Patient Activity
                </h2>
                <p className="text-sm text-slate-500">
                  Monthly visit and cancellation overview
                </p>
              </div>
            </div>

            {chartData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="visitsFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#7c3aed"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#7c3aed"
                          stopOpacity={0.03}
                        />
                      </linearGradient>
                      <linearGradient
                        id="cancelFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.03}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#7c3aed"
                      fill="url(#visitsFill)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="cancelled"
                      stroke="#ef4444"
                      fill="url(#cancelFill)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No activity data available
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Appointment History
                </h2>
                <p className="text-sm text-slate-500">
                  Visit date, doctor, department, and status
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm">
                <ClipboardList size={16} />
                {appointments.length} appointments
              </span>
            </div>

            {sortedAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200">
                      <th className="px-4 py-3 text-left font-semibold">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Doctor
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments.map((a) => (
                      <tr
                        key={a._id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-slate-700">
                          {new Date(a.appointmentDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-slate-800 font-medium">
                          {a.doctor?.userId?.fullName || "N/A"}
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {a.doctor?.department?.name || "N/A"}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(a.status)}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No appointments found
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Patient info */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <User className="text-violet-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">
                Patient Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Full Name
                </p>
                <p className="font-semibold text-slate-800">
                  {patient.fullName || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Age
                  </p>
                  <p className="font-semibold text-slate-800">
                    {patient.age || "N/A"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Gender
                  </p>
                  <p className="font-semibold text-slate-800">
                    {patient.gender || "N/A"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Phone Number
                </p>
                <p className="font-semibold text-slate-800">
                  {patient.contact || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Email
                </p>
                <p className="font-semibold text-slate-800 break-all">
                  {patient.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Doctors seen */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="text-emerald-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">Doctors Seen</h2>
            </div>

            {doctorsSeen.length > 0 ? (
              <div className="space-y-3">
                {doctorsSeen.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:shadow transition"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">
                      {/* 🔥 DOCTOR IMAGE */}
                      <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-200 bg-white">
                        <img
                          src={doc.profileImage || "/default-avatar.png"}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div>
                        <p className="font-semibold text-slate-800">
                          {doc.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {doc.specialization}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                      {doc.department?.name || "No department"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No doctors found</p>
            )}
          </div>

          {/* Admin insights */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <Users className="text-sky-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">
                Admin Summary
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-slate-500">Doctors consulted</span>
                <span className="font-bold text-slate-800">
                  {doctorsSeen.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-slate-500">Departments visited</span>
                <span className="font-bold text-slate-800">
                  {uniqueDepartments.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-slate-500">Last doctor seen</span>
                <span className="font-bold text-slate-800 text-right max-w-[140px]">
                  {lastDoctor}
                </span>
              </div>

              <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4">
                <p className="text-sm font-semibold text-violet-800 mb-2">
                  Departments
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueDepartments.length > 0 ? (
                    uniqueDepartments.map((dep, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-white text-violet-700 text-xs font-medium border border-violet-200"
                      >
                        {dep}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No departments found
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
