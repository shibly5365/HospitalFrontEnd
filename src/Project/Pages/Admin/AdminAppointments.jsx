import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import NewAppointmentForm from "./pages/AddAppointment";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All"); // All, Confirmed, Pending, Cancelled
  const [selectAll, setSelectAll] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4002/api/admin/allAppointments",
        { withCredentials: true }
      );
      const data = (res.data.appointments || []).map((appt) => ({
        ...appt,
        selected: false,
      }));
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter appointments by tab and search
  const filteredAppointments = appointments.filter((appt) => {
    const statusMatch = tab === "All" ? true : appt.status === tab;
    const searchMatch = appt.patientName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Add Appointments
  // Pass the form data from the modal
  const handleAddAppointment = async (formData) => {
    try {
      // Build timeSlot object for backend
      const dataToSend = {
        ...formData,
        appointmentDate: formData.date,
        timeSlot: {
          start: formData.startTime,
          end: formData.endTime,
        },
      };

      // POST request to backend
      const res = await axios.post(
        "http://localhost:4002/api/admin/book",
        dataToSend,
        { withCredentials: true }
      );

      // Update local appointments list
      setAppointments((prev) => [
        ...prev,
        { ...res.data.appointment, selected: false },
      ]);

      alert("Appointment added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add appointment");
    }
  };

  // Select/deselect all
  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setAppointments((prev) =>
      prev.map((appt) => ({ ...appt, selected: newValue }))
    );
  };

  // Toggle row selection
  const toggleSelect = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt._id === id ? { ...appt, selected: !appt.selected } : appt
      )
    );
  };

  // Delete selected appointments
  // Delete selected appointments
  const handleDeleteSelected = async () => {
    const selectedAppointments = appointments.filter((a) => a.selected);
    if (selectedAppointments.length === 0) return;
    if (
      !window.confirm("Are you sure you want to delete selected appointments?")
    )
      return;

    try {
      for (const appt of selectedAppointments) {
        await axios.delete(
          `http://localhost:4002/api/admin/deleteAppointments/${appt._id}`,
          { withCredentials: true }
        );
      }
      setAppointments((prev) =>
        prev.filter((a) => !selectedAppointments.some((sa) => sa._id === a._id))
      );
      alert("Selected appointments deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting selected appointments");
    }
  };

  // Reschedule/Edit
const handleReschedule = (appt) => {
  setSelectedAppointment(appt); // Pass appointment to modal
  setIsModalOpen(true);
};

  // Cancel appointment
  const handleCancel = async (_id) => {
    console.log(_id);

    try {
      await axios.put(
        `http://localhost:4002/api/admin/cancelappointments/${_id}`,
        {}, // no body needed
        { withCredentials: true } // 🔥 send cookies with request
      );

      setAppointments((prev) =>
        prev.map((a) => (a._id === _id ? { ...a, status: "Cancelled" } : a))
      );

      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment");
    }
  };

  // Check if any appointment is selected
  const anySelected = appointments.some((a) => a.selected);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments To-Do List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add New Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setTab(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status}{" "}
            {status !== "All" &&
              `(${appointments.filter((a) => a.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Search + Delete Icon */}
      <div className="flex justify-between mb-4 items-center">
        <input
          type="text"
          placeholder="Search by patient name"
          className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {anySelected && (
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <Trash2 size={16} /> Delete Selected
          </button>
        )}
      </div>

      {/* Appointments Table */}
      {loading ? (
        <p className="text-center py-4">Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-4">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Treatment
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className={`hover:bg-gray-50 ${
                      appt.selected ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={appt.selected}
                        onChange={() => toggleSelect(appt._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">{appt.patientName || "N/A"}</td>
                    <td className="px-6 py-4">
                      {appt.appointmentDate
                        ? new Date(appt.appointmentDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {appt.appointmentDate
                        ? new Date(appt.appointmentDate).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">{appt.doctorName || "N/A"}</td>
                    <td className="px-6 py-4">
                      {appt.departmentName || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          appt.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appt.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appt.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {/* Reschedule always visible */}
                      <button
                        onClick={() => handleReschedule(appt._id)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Reschedule
                      </button>

                      {/* Cancel only visible if status is Pending or Confirmed */}
                      {(appt.status === "Pending" ||
                        appt.status === "Confirmed") && (
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* New Appointment Modal */}
      <NewAppointmentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};

export default AdminAppointments;
