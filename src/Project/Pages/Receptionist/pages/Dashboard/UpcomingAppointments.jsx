import React, { useState } from "react";
import { CalendarDays, Grid, List, PhoneCall, Send, Eye } from "lucide-react";

const UpcomingAppointments = ({ dashboardData }) => {
  const [viewMode, setViewMode] = useState("grid");
  const upcomingAppointments = dashboardData.appointments?.upcoming?.list || [];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            Upcoming Appointments
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <AppointmentsTable appointments={upcomingAppointments} />
      </div>
    </div>
  );
};

const AppointmentsTable = ({ appointments }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-gray-200">
          <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Patient</th>
          <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Doctor</th>
          <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Time</th>
          <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Status</th>
          <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.slice(0, 5).map((appt, idx) => (
          <AppointmentRow key={appt._id} appt={appt} index={idx} />
        ))}
      </tbody>
    </table>
  </div>
);

const AppointmentRow = ({ appt, index }) => (
  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
          index % 3 === 0 ? 'from-blue-500 to-cyan-500' :
          index % 3 === 1 ? 'from-purple-500 to-pink-500' :
          'from-emerald-500 to-teal-500'
        } flex items-center justify-center text-white font-bold shadow-md`}>
          {appt.patientInfo?.fullName?.charAt(0) || "U"}
        </div>
        <div>
          <p className="font-bold text-gray-900">{appt.patientInfo?.fullName || "Unknown"}</p>
          <p className="text-sm text-gray-500">Token: {appt.tokenNumber || "-"}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <p className="font-semibold text-gray-900">{appt.doctorInfo?.fullName || "N/A"}</p>
      <p className="text-sm text-gray-500">{appt.doctorInfo?.department?.name || "N/A"}</p>
    </td>
    <td className="py-4 px-4">
      <p className="font-semibold text-gray-900">
        {new Date(appt.appointmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </p>
      <p className="text-sm text-purple-600 font-medium">{appt.timeSlot?.start || "N/A"}</p>
    </td>
    <td className="py-4 px-4">
      <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold ${
        appt.status === "Confirmed"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}>
        {appt.status}
      </span>
    </td>
    <td className="py-4 px-4">
      <div className="flex gap-1">
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all hover:scale-110">
          <PhoneCall className="w-4 h-4" />
        </button>
        <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all hover:scale-110">
          <Send className="w-4 h-4" />
        </button>
        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all hover:scale-110">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

export default UpcomingAppointments;