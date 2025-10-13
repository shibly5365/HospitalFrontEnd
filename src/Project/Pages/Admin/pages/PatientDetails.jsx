import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home } from "lucide-react";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/getAllpatients/${id}`,
          { withCredentials: true }
        );
        console.log("Patient details response:", res.data);
        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <p className="p-6">Loading patient details...</p>;
  if (!patient) return <p className="p-6">Patient not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Top Bar with Home Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/admin-patient")}
          className="flex items-center px-4 py-2 bg-white rounded-xl shadow hover:bg-gray-100 text-gray-700"
        >
          <Home size={18} className="mr-2" />
          Back to Patients
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Patient Details –{" "}
        <span className="text-purple-600">{patient.fullName}</span>
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Basic Information
            </h2>
            <p><strong>Patient Name:</strong> {patient.fullName}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Phone:</strong> {patient.contact}</p>
            <p><strong>Email:</strong> {patient.email}</p>
          </div>

          {/* Doctors Seen */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Doctors Seen
            </h2>
            {patient.summary?.doctorsSeen?.length > 0 ? (
              <ul className="space-y-3">
                {patient.summary.doctorsSeen.map((doc) => (
                  <li key={doc.id} className="p-3 bg-gray-50 rounded-xl border">
                    <span className="font-medium text-gray-800">
                      {doc.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {doc.specialization} – {doc.department?.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No doctors found</p>
            )}
          </div>
        </div>

        {/* Right Column – Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Appointments
            </h2>
            {patient.appointments?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Doctor</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.appointments.map((a) => (
                      <tr key={a._id} className="border-t">
                        <td className="px-4 py-2">
                          {new Date(a.appointmentDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          {a.doctor?.userId?.fullName || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {a.doctor?.department?.name || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-3 py-1 rounded-xl text-sm font-medium
                              ${
                                a.status === "Confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : a.status === "Cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No appointments found</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <p><strong>Total Visits:</strong> {patient.summary?.totalVisits || 0}</p>
          <p><strong>Last Visit:</strong>{" "}
            {patient.summary?.lastVisitDate
              ? new Date(patient.summary.lastVisitDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p><strong>Cancelled:</strong> {patient.summary?.cancelledCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
