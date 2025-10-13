import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaEye } from "react-icons/fa";
import axios from "axios";
import PatientDrawer from "./DoctorPages/PatientDrawer";
import DashboardNav from "./DashboardNav"; // Navbar
import { useNavigate } from "react-router-dom";

const DoctoresPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4002/api/doctor/allPatients",
          { withCredentials: true }
        );
        console.log("res", data);

        if (data.success) {
          setPatients(data.patients);
        } else {
          setError(data.message || "Failed to fetch patients");
        }
      } catch (err) {
        console.error("Fetch Patients Error:", err);
        setError("Server error or network issue");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading patients...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <DashboardNav />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
            <p className="text-gray-500">
              Manage your patient records and medical history
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow"
            onClick={() => navigate("/doctors/patients-add")}
          >
            + Add Patient
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search by name, condition, or phone..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
            <option>All Conditions</option>
          </select>
          <button className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            More Filters
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Age / Gender</th>
                <th className="py-3 px-4 text-left">Condition</th>
                <th className="py-3 px-4 text-left">Last Visit</th>
                <th className="py-3 px-4 text-left">Next Appointment</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((appt, index) => (
                <tr
                  key={appt._id || index}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {appt.fullName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {appt.age || "N/A"} yrs, {appt.gender || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full border">
                      {typeof appt.reason === "string" ? appt.reason : "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {appt.lastVisit
                      ? new Date(appt.lastVisit).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {appt.nextAppointment
                      ? new Date(appt.nextAppointment).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 shadow">
                      <FaPhone />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 shadow">
                      <FaEnvelope />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 shadow"
                      onClick={() => {
                        setSelectedPatient(appt);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <FaEye />
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition shadow text-sm">
                      Schedule
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <PatientDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default DoctoresPatients;
