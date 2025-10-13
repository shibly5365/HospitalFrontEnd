import React, { useEffect, useState } from "react";
import {
  Phone,
  UserPlus,
  CalendarCheck,
  CreditCard,
  Send,
  UserCheck,
  Users,
  CalendarDays,
  PhoneCall,
  Calendar,
  Activity,
  Check,
  Clock,
  FileCheck,
  Search,
  Flashlight,
} from "lucide-react";
import ReceptionNavbar from "./ReceptionNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReceptionDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4002/api/receptionist/dashboard",
          {
            withCredentials: true, // This ensures cookies are sent
          }
        );
        setDashboardData(response.data);
        // console.log(dashboardData);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("fdfd", dashboardData);
  // console.log("fd", dashboardData?.availableDoctors);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const doctors = dashboardData?.availableDoctors?.list || [];
  // console.log("doct",doctors);

  console.log("next", dashboardData.appointments?.nextPatients.list);
  console.log("dadh", dashboardData.appointments?.upcoming.list);
  return (
    <div className="min-h-screen transition-colors">
      <ReceptionNavbar />
      <div className="p-6 space-y-6 flex-1 bg-gray-50 mt-6">
        {/* 1️⃣ Top single div */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-xl text-white shadow-md">
          {/* Heading */}
          <h2 className="text-2xl font-bold">Good morning, Rachel!</h2>

          {/* Subtext */}
          <p className="mt-2 text-sm">
            You have {dashboardData.appointments.today.count} appointments
            scheduled today. {dashboardData.patients.byStatus.Pending.length}{" "}
            patients are currently waiting.
          </p>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition">
              Quick Check-in
            </button>
            <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition">
              Answer Calls
            </button>
          </div>
        </div>

        {/* 2️⃣ Four divs left to right */}
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative p-6 h-40 rounded-xl border shadow-sm bg-white flex items-center justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300">
            {/* Left colored strip */}
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-gradient-to-b from-blue-400 to-blue-600"></div>

            {/* Content */}
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Patients Confirmed
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.patients.counts.Confirmed}{" "}
              </p>
            </div>

            {/* Icon */}
            <div className="bg-blue-500 p-3 rounded-lg text-white flex items-center justify-center">
              <Users className="h-7 w-7" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative p-6 h-40 rounded-xl border shadow-sm bg-white flex items-center justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-gradient-to-b from-orange-400 to-orange-600"></div>

            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Waiting Patients
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.appointments.nextPatients.count}{" "}
              </p>
            </div>

            <div className="bg-orange-500 p-3 rounded-lg text-white flex items-center justify-center">
              <Clock className="h-7 w-7" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative p-6 h-40 rounded-xl border shadow-sm bg-white flex items-center justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-gradient-to-b from-green-400 to-green-600"></div>

            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Appointments Today
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {" "}
                {dashboardData.appointments.today.count}
              </p>
            </div>

            <div className="bg-green-500 p-3 rounded-lg text-white flex items-center justify-center">
              <CalendarCheck className="h-7 w-7" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative p-6 h-40 rounded-xl border shadow-sm bg-white flex items-center justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-gradient-to-b from-purple-400 to-purple-600"></div>

            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total patients
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {" "}
                {dashboardData.patients.total}
              </p>
            </div>

            <div className="bg-purple-500 p-3 rounded-lg text-white flex items-center justify-center">
              <Phone className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* 3️⃣ Two-part (Left + Right) with right having 2 stacked parts */}
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Left: Waiting Room (75%) */}
          <div className="col-span-9 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-purple-200 rounded"></div>
              </div>
            </div>

            {/* Patient list placeholders */}
            {/* Patient list with real data */}
            <div className="space-y-3">
              {dashboardData.appointments?.nextPatients.list.length > 0 ? (
                dashboardData.appointments?.nextPatients.list.map((appt) => (
                  <div
                    key={appt._id}
                    className="flex items-center justify-between bg-white border rounded-lg p-3"
                  >
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                        {appt.list?.patientInfo.fullName.charAt(0) || "P"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {appt.patient?.fullName || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appt.patient?.email || "No email"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(appt.appointmentDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long", // 👉 Monday, Tuesday
                              day: "numeric", // 👉 16
                              month: "short", // 👉 Sep
                              year: "numeric", // 👉 2025 (remove if not needed)
                            }
                          )}{" "}
                          • {appt.timeSlot.start || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-3">
                      {/* Status */}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          appt.status === "Confirmed"
                            ? "bg-green-100 text-green-600"
                            : appt.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {appt.status}
                      </span>

                      {/* Action Icons */}
                      <PhoneCall className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition" />
                      <Send className="w-5 h-5 text-green-500 cursor-pointer hover:scale-110 transition" />
                      <Calendar className="w-5 h-5 text-purple-500 cursor-pointer hover:scale-110 transition" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  No upcoming appointments
                </p>
              )}
            </div>
          </div>

          {/* Right: Quick Actions + Doctors (equal height) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Quick Actions */}
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Flashlight className="w-5 h-5 text-black" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Quick Actions
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                  onClick={() =>
                    navigate("/receptioninst/receptioninst-registretion")
                  }
                >
                  <UserPlus className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Register New Patient
                  </span>
                </div>

                <div
              onClick={() => navigate("/receptioninst/receptioninst-details")}

                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                >
                  <Search className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Search Patients
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                >
                  <CalendarDays className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Schedule Appointment
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                >
                  <CreditCard className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Process Payment
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                >
                  <Send className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Send Message
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer 
      transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg 
      active:translate-y-0 active:shadow-md"
                >
                  <FileCheck className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-gray-700">
                    Patient History
                  </span>
                </div>
              </div>
            </div>

            {/* Available Doctors */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Doctors ({doctors.length})
              </h2>

              {/* 🔹 Main container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center">
                    No doctors found
                  </p>
                ) : (
                  doctors.map((doc) => (
                    <div
                      key={doc._id}
                      className="p-4 rounded-xl border shadow-sm bg-gray-50 flex flex-col"
                    >
                      <span className="text-base font-medium text-gray-700">
                        {doc.fullName || "Doctor"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {doc.specialization || "General"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {doc.department?.name || "N/A"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {doc.email || ""}
                      </span>

                      <span
                        className={`mt-2 text-xs px-2 py-1 rounded-full w-fit ${
                          doc.isAvailableToday
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {doc.isAvailableToday
                          ? "Available Today"
                          : "Not Available Today"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4️⃣ Three boxes */}
        <div className="grid grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-6 h-40 rounded-xl border shadow-sm bg-purple-50 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-purple-700">
                Today's Registrations
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {dashboardData.todayRegisteredPatients.count}{" "}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600 flex items-center justify-center">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 h-40 rounded-xl border shadow-sm bg-orange-50 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-orange-700">
                Walk-in Queue
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {dashboardData.walkInPatients.count}{" "}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 h-40 rounded-xl border shadow-sm bg-teal-50 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-teal-700">
                Pending Registrations
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {dashboardData.patients.counts.Pending}{" "}
              </p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg text-teal-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 5️⃣ Two-part (Left + Right) */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Left Card - Upcoming Appointments */}
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Upcoming Appointments
              </h2>
            </div>

            {dashboardData?.appointments?.upcoming?.list?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2">Patient Name</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Token</th>
                      <th className="px-4 py-2">Doctor</th>
                      <th className="px-4 py-2">Department</th>
                      <th className="px-4 py-2">Date & Time</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.appointments?.upcoming?.list.map((appt) => (
                      <tr
                        key={appt._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {console.log(appt)}
                        {/* Patient Name */}
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {appt.patientInfo?.fullName || "Unknown"}
                        </td>

                        {/* Age */}
                        <td className="px-4 py-2">
                          {appt.patientInfo?.age || "-"}
                        </td>

                        {/* Token Number */}
                        <td className="px-4 py-2">{appt.tokenNumber || "-"}</td>

                        {/* Doctor */}
                        <td className="px-4 py-2">
                          {appt.doctorInfo?.fullName || "N/A"}
                        </td>

                        {/* Department */}
                        <td className="px-4 py-2">
                          {appt.doctorInfo?.department?.name || "N/A"}
                        </td>

                        {/* Date & Time */}
                        <td className="px-4 py-2">
                          {new Date(appt.appointmentDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}{" "}
                          • {appt.timeSlot?.start || "N/A"}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              appt.status === "Confirmed"
                                ? "bg-green-100 text-green-600"
                                : appt.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2 flex gap-2">
                          <PhoneCall className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition" />
                          <Send className="w-4 h-4 text-green-500 cursor-pointer hover:scale-110 transition" />
                          <Activity className="w-4 h-4 text-purple-500 cursor-pointer hover:scale-110 transition" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No upcoming appointments
              </p>
            )}
          </div>

          {/* Right Card - Recent Activity */}
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {/* Boxes without visible borders */}
              <div className="h-12 rounded-lg bg-gray-100"></div>
              <div className="h-12 rounded-lg bg-gray-100"></div>
              <div className="h-12 rounded-lg bg-gray-100"></div>
              <div className="h-12 rounded-lg bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
