import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, Download } from "lucide-react";

const DailyAppointmentReports = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [appointments, setAppointments] = useState([]);

  // -------- Fetch backend appointments --------
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/receptionist/reports/appointments?date=${date}`,
        { withCredentials: true }
      );

      const data = res.data;

      console.log("API Response:", data);

      // Universal safe parsing (works for all backend formats)
      let parsed = [];

      if (Array.isArray(data)) parsed = data;
      else if (Array.isArray(data.data)) parsed = data.data;
      else if (Array.isArray(data.appointments)) parsed = data.appointments;
      else if (data.data && Array.isArray(data.data.appointments)) {
        parsed = data.data.appointments;
      }

      setAppointments(parsed);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  // -------- Stats --------
  const stats = {
    total: appointments?.length || 0,
    completed: appointments?.filter(a => a.status === "Completed").length || 0,
    pending: appointments?.filter(a => a.status === "Pending").length || 0,
    noShow: appointments?.filter(a => a.status === "No-show").length || 0,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Daily Appointment Reports
          </h2>
          <p className="text-gray-600">
            Overview of daily appointments and status
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-600 font-bold text-2xl">{stats.total}</div>
          <div className="text-gray-600">Total Appointments</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-600 font-bold text-2xl">
            {stats.completed}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-600 font-bold text-2xl">
            {stats.pending}
          </div>
          <div className="text-gray-600">Pending</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-600 font-bold text-2xl">{stats.noShow}</div>
          <div className="text-gray-600">No-shows</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id || appt.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{appt.patientName || appt.patient}</td>

                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {appt.time}
                  </div>
                </td>

                <td className="p-3">{appt.doctorName || appt.doctor}</td>

                <td className="p-3">{appt.type || "N/A"}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      appt.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No appointments found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyAppointmentReports;
