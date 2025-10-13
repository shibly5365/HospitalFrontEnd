import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home } from "lucide-react";

const ReceptionistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receptionist, setReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceptionist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/getAll-Receptionist/${id}`,
          { withCredentials: true }
        );
        setReceptionist(res.data); // <-- res.data is the receptionist object now
        console.log("res", res.data);
      } catch (err) {
        console.error("Error fetching receptionist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReceptionist();
  }, [id]);

  console.log("rcpt", receptionist);
  console.log(receptionist?.data);

  if (loading) return <p className="p-6">Loading receptionist details...</p>;
  if (!receptionist) return <p className="p-6">Receptionist not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Top Bar */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/admin-receptionist")}
          className="flex items-center px-4 py-2 bg-white rounded-xl shadow hover:bg-gray-100 text-gray-700"
        >
          <Home size={18} className="mr-2" />
          Back to Receptionists
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Receptionist Details -{" "}
        <span className="text-blue-600">{receptionist?.fullName}</span>
        {/* {console.log("res",receptionist?.fullName) } */}
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column – Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Basic Information
            </h2>
            <p>
              <strong>Name: </strong> {receptionist?.fullName}
            </p>
            <p>
              <strong>Age: </strong> {receptionist.age || "N/A"}
            </p>
            <p>
              <strong>Gender: </strong> {receptionist.gender || "N/A"}
            </p>
            <p>
              <strong>Contact: </strong> {receptionist.contact}
            </p>
            <p>
              <strong>Email: </strong> {receptionist.email}
            </p>
            <p>
              <strong>Unique ID: </strong> {receptionist.employeeId}
            </p>
          </div>
        </div>

        {/* Right Column – Patients + Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booked Patients Table */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Booked Patients
            </h2>

            {receptionist.length > 0 ||
            receptionist.appointments?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Patient Name</th>
                      <th className="px-4 py-2 text-left">Doctor Name</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receptionist.appointments?.map((a) => (
                      <tr key={a._id} className="border-t">
                        <td className="px-4 py-2">{a.fullName || "N/A"}</td>
                        <td className="px-4 py-2">
                          {a.doctor?.userId?.fullName || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {a.doctor?.department || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(a.appointmentDate).toLocaleString()}
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

                    {/* If you want to also list patients added without appointments */}
                    {receptionist.data
                      .filter(
                        (p) =>
                          !receptionist.appointments?.some(
                            (a) => a.patient?._id === p._id
                          )
                      )
                      .map((p) => (
                        <tr key={p._id} className="border-t">
                          <td className="px-4 py-2">{p.fullName}</td>
                          <td className="px-4 py-2">N/A</td>
                          <td className="px-4 py-2">N/A</td>
                          <td className="px-4 py-2">N/A</td>
                          <td className="px-4 py-2">
                            <span className="px-3 py-1 rounded-xl text-sm font-medium bg-gray-100 text-gray-700">
                              Not Booked
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No booked patients</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Activity
        </h2>
        {receptionist.recentActivity?.length > 0 ? (
          <ul className="space-y-3">
            {receptionist.recentActivity.map((a, i) => (
              <li key={i} className="p-3 bg-gray-50 rounded-xl border">
                <span className="font-medium text-gray-800">{a.action}</span>
                <span className="block text-xs text-gray-500">
                  {new Date(a.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700">
          <p>
            <strong>Total Patients Added:</strong>{" "}
            {receptionist.summary?.patientsAdded || 0}
          </p>
          <p>
            <strong>Total Appointments Booked:</strong>{" "}
            {receptionist.summary?.appointmentsBooked || 0}
          </p>
          <p>
            <strong>Revenue Added:</strong> ₹
            {receptionist.summary?.revenue || 0}
          </p>
          <p>
            <strong>Today’s Appointments:</strong>{" "}
            {receptionist.summary?.todayAppointments || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDetails;
