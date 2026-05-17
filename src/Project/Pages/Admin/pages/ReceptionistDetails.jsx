import { apiClient } from "../../../../services/queryClient";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  User2,
  BadgeCheck,
  CalendarCheck2,
  Wallet,
  Activity,
  Users,
  Clock3,
  BriefcaseMedical,
  Search,
} from "lucide-react";

const ReceptionistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receptionist, setReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchReceptionist = async () => {
      try {
        const res = await apiClient.get(
          `/admin/getAll-Receptionist/${id}`,
          { withCredentials: true }
        );
        setReceptionist(res.data);
      } catch (err) {
        console.error("Error fetching receptionist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionist();
  }, [id]);

  const appointments = receptionist?.appointments || [];
  const patients = receptionist?.data || [];
  const recentActivity = receptionist?.recentActivity || [];
  const summary = receptionist?.summary || {};

  const initials =
    receptionist?.fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "RC";

  const mergedRecords = useMemo(() => {
    const booked = appointments.map((a) => ({
      id: a._id,
      patientName: a?.patient?.fullName || a?.fullName || "N/A",
      doctorName: a?.doctor?.userId?.fullName || "N/A",
      department: a?.doctor?.department?.name || a?.doctor?.department || "N/A",
      appointmentDate: a?.appointmentDate,
      status: a?.status || "Pending",
      source: "appointment",
    }));

    const notBooked = patients
      .filter(
        (p) =>
          !appointments.some(
            (a) => a?.patient?._id === p?._id || a?.patient === p?._id
          )
      )
      .map((p) => ({
        id: p._id,
        patientName: p?.fullName || "N/A",
        doctorName: "Not assigned",
        department: "-",
        appointmentDate: null,
        status: "Not Booked",
        source: "patient",
      }));

    return [...booked, ...notBooked];
  }, [appointments, patients]);

  const filteredRecords = useMemo(() => {
    return mergedRecords.filter((item) => {
      const matchesSearch =
        item.patientName.toLowerCase().includes(search.toLowerCase()) ||
        item.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [mergedRecords, search, statusFilter]);

  const statusStyles = (status) => {
    switch (status) {
      case "Confirmed":
      case "Completed":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
      case "Not Booked":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
      default:
        return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 w-56 rounded-2xl bg-slate-200" />
          <div className="h-52 rounded-[32px] bg-slate-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-[24px] bg-slate-200" />
            ))}
          </div>
          <div className="h-96 rounded-[32px] bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!receptionist) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-10 border border-slate-200 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-slate-900">Receptionist not found</h2>
          <p className="text-slate-500 mt-2">
            The requested receptionist record could not be loaded.
          </p>
          <button
            onClick={() => navigate("/admin/admin-receptionist")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Back to Receptionists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6">
      {/* Top action */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <button
          onClick={() => navigate("/admin/admin-receptionist")}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="text-sm text-slate-500">
          Admin / Staff / <span className="font-semibold text-slate-700">{receptionist.fullName}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#0f172a] text-white p-6 md:p-8 mb-6 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%)]" />
        <div className="relative grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-6 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sky-300 mb-3">
              Receptionist Overview
            </p>

            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-[24px] bg-white/10 border border-white/10 backdrop-blur flex items-center justify-center text-2xl font-bold">
                {initials}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {receptionist.fullName}
                </h1>
                <p className="text-slate-300 mt-2 max-w-2xl">
                  Staff profile, booking performance, patient registration activity,
                  and operational history for admin review.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm border border-white/10">
                    {receptionist.gender || "N/A"}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm border border-white/10">
                    {receptionist.age ? `${receptionist.age} years` : "Age N/A"}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-400/15 text-emerald-200 text-sm border border-emerald-300/10">
                    Active Employee
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-sky-300 text-sm mb-1">
                <Phone size={16} />
                Contact
              </div>
              <p className="font-semibold text-white">{receptionist.contact || "N/A"}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-sky-300 text-sm mb-1">
                <Mail size={16} />
                Email
              </div>
              <p className="font-semibold text-white break-all">{receptionist.email || "N/A"}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-sky-300 text-sm mb-1">
                <BadgeCheck size={16} />
                Employee ID
              </div>
              <p className="font-semibold text-white">{receptionist.employeeId || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Patients Added"
          value={summary.patientsAdded || 0}
          note="Total patient entries created"
          icon={<Users size={18} />}
          tone="cyan"
        />
        <MetricCard
          title="Appointments Booked"
          value={summary.appointmentsBooked || 0}
          note="Total bookings managed"
          icon={<CalendarCheck2 size={18} />}
          tone="violet"
        />
        <MetricCard
          title="Revenue Added"
          value={`₹${summary.revenue || 0}`}
          note="Booking-linked revenue"
          icon={<Wallet size={18} />}
          tone="emerald"
        />
        <MetricCard
          title="Today's Appointments"
          value={summary.todayAppointments || 0}
          note="Scheduled for today"
          icon={<Activity size={18} />}
          tone="amber"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 2xl:grid-cols-[1.55fr_0.85fr] gap-6">
        {/* Left */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Bookings and Patients</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Search and review patient records, doctor assignments, and booking status.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search patient, doctor, department..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full sm:w-72 rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-200"
                  >
                    <option value="All">All status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Not Booked">Not Booked</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-slate-500">
                      <th className="px-5 py-4 text-left font-semibold">Patient</th>
                      <th className="px-5 py-4 text-left font-semibold">Doctor</th>
                      <th className="px-5 py-4 text-left font-semibold">Department</th>
                      <th className="px-5 py-4 text-left font-semibold">Date</th>
                      <th className="px-5 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-slate-800">{item.patientName}</p>
                            <p className="text-xs text-slate-400 mt-1">{item.source}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{item.doctorName}</td>
                        <td className="px-5 py-4 text-slate-600">{item.department}</td>
                        <td className="px-5 py-4 text-slate-600">
                          {item.appointmentDate
                            ? new Date(item.appointmentDate).toLocaleString()
                            : "Not scheduled"}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-slate-500">
                No matching patient or booking records found.
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <User2 size={18} className="text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900">Profile Details</h2>
            </div>

            <div className="space-y-3">
              <InfoRow label="Full Name" value={receptionist.fullName || "N/A"} />
              <InfoRow label="Age" value={receptionist.age || "N/A"} />
              <InfoRow label="Gender" value={receptionist.gender || "N/A"} />
              <InfoRow label="Phone" value={receptionist.contact || "N/A"} />
              <InfoRow label="Email" value={receptionist.email || "N/A"} />
              <InfoRow label="Employee ID" value={receptionist.employeeId || "N/A"} />
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Clock3 size={18} className="text-violet-600" />
              <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            </div>

            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-sky-500 mt-2" />
                      {index !== recentActivity.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 mt-2" />
                      )}
                    </div>

                    <div className="pb-4">
                      <p className="font-medium text-slate-800">{item.action}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {item.date ? new Date(item.date).toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No recent activity available.</p>
            )}
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BriefcaseMedical size={18} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Quick Insights</h2>
            </div>

            <div className="space-y-3">
              <InsightPill
                label="Unbooked patients"
                value={mergedRecords.filter((x) => x.status === "Not Booked").length}
              />
              <InsightPill
                label="Confirmed bookings"
                value={mergedRecords.filter((x) => x.status === "Confirmed").length}
              />
              <InsightPill
                label="Cancelled bookings"
                value={mergedRecords.filter((x) => x.status === "Cancelled").length}
              />
              <InsightPill
                label="Activity logs"
                value={recentActivity.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, note, icon, tone = "cyan" }) => {
  const tones = {
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">{title}</p>
        <div className={`rounded-2xl px-3 py-2 border ${tones[tone]}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
      <p className="text-sm text-slate-500 mt-2">{note}</p>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-1">{label}</p>
    <p className="font-semibold text-slate-800 break-all">{value}</p>
  </div>
);

const InsightPill = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default ReceptionistDetails;