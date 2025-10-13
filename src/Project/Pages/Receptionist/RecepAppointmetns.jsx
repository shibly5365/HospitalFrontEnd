import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  "With-Doctor": "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function ReceptionDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4002/api/receptionist/dashboard",
        { withCredentials: true }
      );
      const data = res.data || {};
      const allAppointments = Array.isArray(data?.appointments?.all?.list)
        ? data.appointments.all.list
        : [];
      setAppointments(allAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleAddAppointment = () => {
    navigate("/receptionist/AddNewAppointments");
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:4002/api/receptionist/appointments/${editAppointment._id}`,
        editAppointment,
        { withCredentials: true }
      );
      setEditAppointment(null);
      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Summary */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Appointments</h1>
          <p className="text-gray-500">
            Total Appointments: {appointments.length}
          </p>
        </div>
        <button
          onClick={handleAddAppointment}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Appointment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Doctor Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-600">
                    {a.patientInfo?.patientId || "-"}
                  </td>
                  <td className="p-3 font-medium">
                    <div className="flex items-center gap-3">
                      {a.patientInfo?.profileImage ? (
                        <img
                          src={a.patientInfo.profileImage}
                          alt="profile"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                          {a.patientInfo?.fullName
                            ? a.patientInfo.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "NA"}
                        </div>
                      )}
                      <span>{a.patientInfo?.fullName || "-"}</span>
                    </div>
                  </td>

                  <td className="p-3">{a.doctorInfo?.fullName || "-"}</td>
                  <td className="p-3">{a.doctorInfo?.department || "-"}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(a.appointmentDate).toLocaleDateString()}{" "}
                    {a.timeSlot?.start || ""}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[a.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-center relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === a._id ? null : a._id)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === a._id && (
                      <div className="absolute right-6 top-10 w-32 bg-white border rounded-lg shadow-md z-10">
                        <button
                          onClick={() => {
                            setSelectedAppointment(a);
                            setOpenMenu(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setEditAppointment(a);
                            setOpenMenu(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setEditAppointment(null)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Appointment</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  value={
                    new Date(editAppointment.appointmentDate)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setEditAppointment({
                      ...editAppointment,
                      appointmentDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Time</label>
                <input
                  type="text"
                  value={editAppointment.timeSlot?.start || ""}
                  onChange={(e) =>
                    setEditAppointment({
                      ...editAppointment,
                      timeSlot: {
                        ...editAppointment.timeSlot,
                        start: e.target.value,
                      },
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Start Time"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select
                  value={editAppointment.status}
                  onChange={(e) =>
                    setEditAppointment({
                      ...editAppointment,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>With-Doctor</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Reason</label>
                <textarea
                  value={editAppointment.reason || ""}
                  onChange={(e) =>
                    setEditAppointment({
                      ...editAppointment,
                      reason: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <button
                onClick={handleSaveEdit}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedAppointment(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600">Patient</h3>
                <div className="flex items-center gap-3 mt-1">
                  {selectedAppointment.patientInfo?.profileImage ? (
                    <img
                      src={selectedAppointment.patientInfo.profileImage}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {selectedAppointment.patientInfo?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "NA"}
                    </div>
                  )}
                  <span>{selectedAppointment.patientInfo?.fullName || "-"}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ID: {selectedAppointment.patientInfo?.patientId || "-"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-600">Doctor</h3>
                <p className="mt-1">{selectedAppointment.doctorInfo?.fullName || "-"}</p>
                <p className="text-sm text-gray-500">
                  Department: {selectedAppointment.doctorInfo?.department || "-"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-600">Date & Time</h3>
                <p className="mt-1">
                  {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}{" "}
                  {selectedAppointment.timeSlot?.start || ""}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-600">Status</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[selectedAppointment.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              <div className="col-span-2">
                <h3 className="font-medium text-gray-600">Reason</h3>
                <p className="mt-1 text-gray-700">{selectedAppointment.reason || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
