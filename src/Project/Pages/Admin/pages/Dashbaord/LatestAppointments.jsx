import React, { useEffect, useMemo, useState } from "react";
import { getLatestAppointments } from "../../../../../services/adminService";

const ITEMS_PER_PAGE = 10;

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Confirmed: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const LatestAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLatestAppointments();
  }, []);

  const fetchLatestAppointments = async () => {
    try {
      setLoading(true);

      const res = await getLatestAppointments(50);

      const data = res?.data?.data || [];

      const formattedData = data.map((item) => ({
        id: item.patientId,
        patient: item.patientName,
        patientImage: item.patientImage,
        session: item.consultationType,
        doctor: item.doctorName,
        doctorImage: item.doctorImage,
        date: new Date(item.date).toLocaleDateString(),
        time: item.time,
        status: item.status,
      }));

      setAppointments(formattedData);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return appointments.slice(start, start + ITEMS_PER_PAGE);
  }, [appointments, currentPage]);

  return (
    <div className="mt-6 rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Latest Appointments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent patient booking activities
          </p>
        </div>

        <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
          View All
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4 p-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                </div>
              </div>

              <div className="h-8 w-24 animate-pulse rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Session</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 rounded-full bg-gray-100 p-4">
                          📅
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800">
                          No appointments found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          New appointments will appear here
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedAppointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 transition hover:bg-gray-50/70"
                    >
                      {/* PATIENT ID */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">
                          #{appointment.id}
                        </span>
                      </td>

                      {/* PATIENT */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              appointment.patientImage ||
                              "https://i.pravatar.cc/100"
                            }
                            alt={appointment.patient}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
                          />

                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.patient}
                            </p>

                            <p className="text-sm text-gray-500">Patient</p>
                          </div>
                        </div>
                      </td>

                      {/* SESSION */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                          {appointment.session}
                        </span>
                      </td>

                      {/* DOCTOR */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              appointment.doctorImage ||
                              "https://i.pravatar.cc/100"
                            }
                            alt={appointment.doctor}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
                          />

                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.doctor}
                            </p>

                            <p className="text-sm text-gray-500">Doctor</p>
                          </div>
                        </div>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {appointment.date}
                          </p>

                          <p className="text-sm text-gray-500">
                            {appointment.time}
                          </p>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[appointment.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row">
              <p className="text-sm text-gray-500">
                Showing page{" "}
                <span className="font-semibold text-gray-800">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white shadow-md"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestAppointments;
