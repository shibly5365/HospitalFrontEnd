import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Appointments({ isVisible }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/dashboard-summary",
          { withCredentials: true }
        );

        const data = res.data;
        const upcoming = data.appointments.upcoming ?? [];

        const sortedAppointments = upcoming
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);

        setAppointments(sortedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  // console.log(appointments);
  

  const isJoinTime = (appointment) => {
    if (appointment.status !== "approved") return false;
    if (!appointment.date || !appointment.time) return false;

    try {
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
      const now = new Date();
      const diffMinutes = (appointmentDateTime - now) / (1000 * 60);
      return diffMinutes <= 30 && diffMinutes >= -30; // 30 min before or after
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center text-gray-500">
        Loading appointments...
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 delay-400 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Upcoming Appointments
        </h2>
        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105">
          View All
        </button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No upcoming appointments.
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a, i) => {
            const canJoin = isJoinTime(a);

            return (
              <div
                key={a.id || i}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-md"
              >
                {/* Left: doctor info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Dr{" "}
                      {a?.doctor?.name
                        ? a.doctor.name.charAt(0).toUpperCase() +
                          a.doctor.name.slice(1)
                        : "Unknown Doctor"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {a.doctor?.department ?? "General Consultation"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {a.date ?? "N/A"} • {a.time ?? "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right: dynamic buttons */}
                <div className="flex items-center space-x-2">
                  {canJoin ? (
                    <button className="px-3 py-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200">
                      Join
                    </button>
                  ) : (
                    <>
                      <button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200">
                        Result
                      </button>
                      <button className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200">
                        Cancel
                      </button>
                    </>
                  )}
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
