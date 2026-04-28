import React, { useEffect, useState } from "react";
import { getLatestAppointments } from "../../../../../services/adminService";

const ITEMS_PER_PAGE = 10;

const LatestAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = async () => {
    try {
      const res = await getLatestAppointments(50); // 🔥 fetch more, paginate in UI
      const data = res.data.data || [];

      const formatted = data.map((item) => ({
        id: item.patientId,
        patient: item.patientName,
        patientImage: item.patientImage,
        session: item.consultationType,
        doctor: item.doctorName,
        doctorImage: item.doctorImage,
        date: `${new Date(item.date).toLocaleDateString()} | ${item.time}`,
        status: item.status,
      }));

      setAppointments(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ PAGINATION LOGIC
  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const paginatedData = appointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Latest Appointments</h3>
        <button className="text-sm text-blue-500 hover:underline">
          View All
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="pb-2">Patient ID</th>
                  <th className="pb-2">Patient Name</th>
                  <th className="pb-2">Session</th>
                  <th className="pb-2">Doctor</th>
                  <th className="pb-2">Date & Time</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((appt, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 font-medium text-gray-700">
                        {appt.id}
                      </td>

                      {/* PATIENT */}
                      <td className="py-3 flex items-center gap-2">
                        <img
                          src={appt.patientImage || "https://i.pravatar.cc/40"}
                          alt={appt.patient}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {appt.patient}
                      </td>

                      <td className="py-3">{appt.session}</td>

                      {/* DOCTOR */}
                      <td className="py-3 flex items-center gap-2">
                        <img
                          src={appt.doctorImage || "https://i.pravatar.cc/40"}
                          alt={appt.doctor}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {appt.doctor}
                      </td>

                      <td className="py-3 text-gray-600">{appt.date}</td>

                      {/* STATUS */}
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            appt.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : appt.status === "Confirmed"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {appt.status}
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
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestAppointments;
