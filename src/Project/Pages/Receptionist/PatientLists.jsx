import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, Calendar, User } from "lucide-react";

// Single Patient Card
const PatientCard = ({ patient, onClick, isSelected }) => (
  <div
    className={`bg-white rounded-xl shadow p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer transition hover:bg-gray-50 ${
      isSelected ? "ring-2 ring-blue-500" : ""
    }`}
    onClick={() => onClick(patient)}
  >
    {/* Part 1: Profile + Name + ID */}
    <div className="flex items-center gap-3 w-full md:w-1/4">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
        {patient.fullName
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{patient.fullName}</p>
        <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
      </div>
    </div>

    {/* Part 2: Contact */}
    <div className="flex items-center text-sm text-gray-600 gap-2 w-full md:w-1/4">
      <Phone size={14} className="text-gray-400" />
      <span>{patient.contact || patient.phone || "N/A"}</span>
    </div>

    {/* Part 3: Appointment */}
    <div className="flex items-center text-sm text-gray-600 gap-2 w-full md:w-1/4">
      <Calendar size={14} className="text-gray-400" />
      <span>
        {patient.summary?.upcomingAppointment
          ? new Date(
              patient.summary.upcomingAppointment.appointmentDate
            ).toLocaleString()
          : "No upcoming"}
      </span>
    </div>

    {/* Part 4: Doctor + Department + Status */}
    <div className="flex items-center justify-between gap-3 w-full md:w-1/4">
      <p className="text-sm text-gray-700 flex items-center gap-1">
        <User size={14} className="text-gray-400" />
        {patient.summary?.upcomingAppointment?.doctor?.userId?.fullName ||
          "N/A"}{" "}
        <span className="text-gray-500">
          (
          {patient.summary?.upcomingAppointment?.doctor?.department?.name ||
            "—"}
          )
        </span>
      </p>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          patient.summary?.upcomingAppointment?.status === "Upcoming" ||
          patient.summary?.upcomingAppointment?.status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {patient.summary?.upcomingAppointment?.status || "N/A"}
      </span>
    </div>
  </div>
);

// Right-side Patient Details
// Right-side Patient Details (Redesigned)
const PatientDetails = ({ patient, onClose }) => {
  return (
    <div className="h-full bg-gray-50 shadow-lg border-l w-[35%] min-w-[320px] overflow-y-auto flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-sm text-red-500 hover:underline"
        >
          ✕ Close
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-6 pb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 mb-3">
          {patient.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h2 className="text-xl font-semibold">{patient.fullName}</h2>
        <p className="text-gray-500 text-sm">PAT-{patient.patientId}</p>
      </div>

      {/* Patient Demographics */}
      <div className="px-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-semibold mb-2">Patient Demographics</h3>
          <p>
            <strong>Age:</strong> {patient.age || "—"}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender || "—"}
          </p>
          <p>
            <strong>Phone:</strong> {patient.contact || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {patient.email || "N/A"}
          </p>
        </div>

        {/* Next Appointment */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <h3 className="font-semibold mb-2">Next Appointment</h3>
          {patient.summary?.upcomingAppointment ? (
            <div>
              <p className="text-sm text-gray-600">
                {new Date(
                  patient.summary.upcomingAppointment.appointmentDate
                ).toDateString()}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(
                  patient.summary.upcomingAppointment.appointmentDate
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-2 font-medium text-blue-700">
                {patient.summary.upcomingAppointment.doctor?.userId?.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {patient.summary.upcomingAppointment.doctor?.department?.name}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointment</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-semibold mb-3">Visit History</h3>
          {patient.appointments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border text-left">Date</th>
                    <th className="p-2 border text-left">Doctor</th>
                    <th className="p-2 border text-left">Department</th>
                    <th className="p-2 border text-left">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.appointments.map((visit, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-2 border">
                        {visit?.appointmentDate
                          ? new Date(visit.appointmentDate).toDateString()
                          : "—"}
                      </td>
                      <td className="p-2 border">
                        {visit?.doctor?.userId?.fullName || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {visit?.doctor?.department?.name || "—"}
                      </td>
                      <td className="p-2 border">{visit?.reason || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No history records available
            </p>
          )}
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-semibold mb-3">Recent Visits</h3>
          {patient.summary?.recentVisits?.length > 0 ? (
            <ul className="space-y-3">
              {patient.summary.recentVisits.map((visit, i) => (
                <li key={i} className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">
                      {visit.doctorName}
                    </p>
                    <p className="text-sm text-gray-500">{visit.department}</p>
                    <p className="text-xs text-gray-400">{visit.reason}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(visit.date).toDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No past visits found</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto p-6 space-y-3">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          View Full Profile
        </button>
        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
          Book New Appointment
        </button>
        <div className="flex gap-3">
          <button className="flex-1 border py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            Call
          </button>
          <button className="flex-1 border py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PatientLists() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/receptionist/getAll-patients",
          {
            withCredentials: true,
          }
        );
        console.log("res", res.data);

        setPatients(res.data || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    [p.fullName, p._id, p.contact, p.email]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-screen transition-all duration-300">
      {/* Patient List */}
      <div
        className={`transition-all duration-300 p-6 overflow-y-auto ${
          selectedPatient ? "w-[65%]" : "w-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Patients</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add Patient
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search patient by name, ID, or contact"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Patient Cards */}
        {loading ? (
          <p>Loading patients...</p>
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onClick={setSelectedPatient}
              isSelected={selectedPatient?._id === patient._id}
            />
          ))
        ) : (
          <p className="text-gray-500">No patients found</p>
        )}
      </div>

      {/* Details Panel */}
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
