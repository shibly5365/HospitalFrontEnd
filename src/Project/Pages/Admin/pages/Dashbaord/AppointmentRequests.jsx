import React, { useEffect, useState } from "react";
import {
  getPendingAppointments,
  updateAppointmentStatus,
} from "../../../../../services/adminService";
import { notify } from "../../../../../units/notification";
import { confirmToast } from "../../../../../units/confirmToast";

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getPendingAppointments();
      console.log("Appointments:", res.data);

      setAppointments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatus = async (id, status) => {
    const confirmed = await confirmToast(
      status === "Confirmed"
        ? "Accept this appointment?"
        : "Reject this appointment?",
    );

    if (!confirmed) return;

    try {
      await updateAppointmentStatus(id, status);

      setAppointments((prev) => prev.filter((item) => item._id !== id));

      notify.success(
        status === "Confirmed"
          ? "Appointment accepted"
          : "Appointment rejected",
      );
    } catch (error) {
      notify.error("Failed to update appointment",error);
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Appointment Requests</h3>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow">
          View All
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-sm">No pending appointments</p>
          ) : (
            appointments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // ✅ latest first
              .slice(0, 4) // ✅ only 4 items
              .map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50 rounded-lg p-3 hover:shadow transition"
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-medium">
                      {item?.patient?.fullName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.appointmentDate).toLocaleDateString()} -{" "}
                      {item?.timeSlot?.start}
                    </p>
                  </div>

                  {/* DEPARTMENT */}
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {item?.doctor?.department?.name || "Dept"}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(item._id, "Confirmed")}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => handleStatus(item._id, "Cancelled")}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;
