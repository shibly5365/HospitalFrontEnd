import React, { useEffect, useState } from "react";
import { Search, UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Units/notification";
import toast from "react-hot-toast";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getAll-patients",
          { withCredentials: true }
        );
        setPatients(res.data.patients || res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        notify.error("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // ✅ Confirm delete with toast
  const handleDeletePatient = async (id, name) => {
    toast(
      (t) => (
        <div className="flex flex-col">
          <p>
            Are you sure you want to delete <strong>{name}</strong>?
          </p>
          <div className="flex justify-end mt-2 space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                try {
                  const res = await axios.delete(
                    `http://localhost:4002/api/admin/deletePatients/${id}`,
                    { withCredentials: true }
                  );
                  if (res.data.success) {
                    setPatients((prev) => prev.filter((p) => p._id !== id));
                    notify.success("Patient deleted successfully");
                  } else {
                    notify.error("Failed to delete patient");
                  }
                } catch (err) {
                  console.error(err);
                  notify.error("Server error");
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // console.log("patintesss",patients);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Patients</h1>

      {/* 🔹 Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-200 rounded-xl text-sm">
            All Departments
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-xl text-sm">
            All Types
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-xl bg-white px-3 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search patients..."
              className="outline-none text-sm"
            />
          </div>

          <button className="flex items-center px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">
            <UserPlus size={18} className="mr-2" /> Add Patient
          </button>
        </div>
      </div>

      {/* 🔹 Patients Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        {loading ? (
          <p className="p-4 text-gray-500">Loading patients...</p>
        ) : patients.length === 0 ? (
          <p className="p-4 text-gray-500">No patients found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">Age</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Patient Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total Visits
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  {" "}
                  Visit Mode
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.map((p, i) => {
                // 🔹 Compute next upcoming appointment dynamically
                const upcomingAppointments = p.appointments
                  ?.filter((a) => ["Pending", "Confirmed"].includes(a.status))
                  .sort(
                    (a, b) =>
                      new Date(a.appointmentDate) - new Date(b.appointmentDate)
                  );
                const nextAppointment = upcomingAppointments?.[0];

                return (
                  <tr key={p._id || i}>
                    <td className="px-6 py-4">{p.fullName}</td>
                    <td className="px-6 py-4">{p.age || "N/A"}</td>
                    <td className="px-6 py-4">{p.gender || "N/A"}</td>
                    <td className="px-6 py-4">{p.contact || "N/A"}</td>
                    <td className="px-6 py-4">{p.email}</td>
                    <td className="px-6 py-4">{p.patientType || "General"}</td>
                    <td className="px-6 py-4">{p.summary?.totalVisits || 0}</td>
                    <td className="px-6 py-4">
                      {p.appointments && p.appointments.length > 0 ? (
                        <div>
                          <p className="font-medium">
                            {p.appointments[0]?.consultationType || "N/A"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/admin/patients/${p.id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeletePatient(p._id, p.fullName)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPatients;
