import React, { useEffect, useState } from "react";
import { apiClient } from "../../../../../services/queryClient"; // adjust path

const AppointmentRequests = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;



  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const res = await apiClient.get(
          "/doctor/pendingAppointmentsCount",
          {
            withCredentials: true,
          }
        );

        console.log("Pending Appointments:", res.data);

        const mappedData =
          res.data?.appointments?.map((appt) => ({
            id: appt.appointmentId,

            patientName:
              appt.patient?.fullName || "Unknown Patient",

            patientAvatar: appt.patient?.profileImage
              ? appt.patient.profileImage
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                appt.patient?.fullName || "Patient"
              )}`,

            preferredDate: appt.appointmentDate
              ? new Date(
                appt.appointmentDate
              ).toLocaleDateString()
              : "N/A",

            reason: appt.reason || "No reason provided",

            consultationType:
              appt.consultationType || "Offline",

            status: appt.status || "Pending",
          })) || [];

        setAppointmentRequests(mappedData);
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAppointments();
  }, []);

  const paginatedAppointments = appointmentRequests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(
    appointmentRequests.length / itemsPerPage
  );
  if (loading) {
    return (
      <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] p-5">
        Loading appointment requests...
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--line)] flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Appointment Requests
        </h2>

        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
          {appointmentRequests.length} New
        </span>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {appointmentRequests.length > 0 ? (
          paginatedAppointments.map((req) => (
            <div
              key={req.id}
              className="px-5 py-4 hover:bg-[var(--surface-soft)] transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.patientAvatar}
                  className="w-12 h-12 rounded-xl object-cover"
                  alt={req.patientName}
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {req.patientName}
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {req.reason}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-[var(--muted)]">
                      {req.preferredDate}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${req.consultationType === "Online"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                        }`}
                    >
                      {req.consultationType}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${req.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : req.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                    Accept
                  </button>

                  <button className="px-3 py-1.5 border border-[var(--line)] text-xs rounded-lg hover:bg-[var(--surface-soft)]">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-[var(--muted)]">
            No appointment requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequests;