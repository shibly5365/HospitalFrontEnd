import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { apiClient } from "../../../../../services/queryClient"; // adjust path

const TodaySchedule = () => {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const res = await apiClient.get(
          "/doctor/todyaAppointmen",
          {
            withCredentials: true,
          }
        );

        console.log("Today's Appointments:", res.data);

        const mappedData = res.data.appointments.map((appt) => ({
          id: appt._id,
          patientName: appt.patient?.fullName || "Unknown Patient",
          patientAvatar:
            appt.patient?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              appt.patient?.fullName || "Patient"
            )}`,
          type: appt.consultationType || "Consultation",
          time: appt.timeSlot?.start,
          status: appt.status,
          duration: appt.timeSlot?.duration || "30 min",
          email: appt.patient?.email,
          contact: appt.patient?.contact,
          gender: appt.patient?.gender,
        }));

        setTodayAppointments(mappedData);
      } catch (error) {
        console.error(
          "Failed to fetch today's appointments:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  if (loading) {
    return (
      <div className="bg-[var(--surface)] rounded-3xl p-6">
        Loading appointments...
      </div>
    );
  }

  window.console.log("todayAppointments", todayAppointments)
  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] overflow-hidden">
      <div className="px-7 py-5 border-b border-[var(--line)] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Today's Schedule
          </h2>

          <p className="text-sm text-[var(--muted)] mt-0.5">
            You have {todayAppointments.length} appointments today
          </p>
        </div>

        <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {todayAppointments.length > 0 ? (
          todayAppointments.map((appt) => (
            <div
              key={appt.id}
              className="px-7 py-5 hover:bg-[var(--surface-soft)] transition-all group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appt.patientAvatar}
                  className="w-14 h-14 rounded-xl object-cover"
                  alt={appt.patientName}
                />

                <div className="flex-1">
                  <p className="font-semibold">
                    {appt.patientName}
                  </p>

                  <p className="text-sm text-[var(--muted)]">
                    {appt.type} • {appt.duration}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono font-medium">
                    {appt.time
                      ? new Date(
                        `1970-01-01T${appt.time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "--:--"}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${appt.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                      }`}
                  >
                    {appt.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-[var(--muted)]">
            No appointments scheduled for today
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;