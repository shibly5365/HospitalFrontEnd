import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { UserPlus, Users, UserCheck, Calendar, Download } from "lucide-react";

const PatientRegistrationReports = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------
  // Fetch Data From Backend
  // -------------------------
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await apiClient.get(
        "/receptionist/reports/patient-registrations",
        {
          params: { startDate, endDate },
          withCredentials: true,
        }
      );

      console.log("Response data:", res.data.data);

      // Get the patients array from backend response
      setRegistrations(res.data?.data?.patients || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  // -------------------------
  // Stats
  // -------------------------
  const stats = {
    total: registrations.length,
    active: registrations.filter((r) => r.status === "Active").length,
    newToday: registrations.filter(
      (r) =>
        new Date(r.createdAt).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0]
    ).length,
    averageAge:
      registrations.length === 0
        ? 0
        : Math.round(
            registrations.reduce((sum, r) => sum + (r.age || 0), 0) /
              registrations.length
          ),
  };

  const genderDistribution = {
    Male: registrations.filter((r) => r.gender === "Male").length,
    Female: registrations.filter((r) => r.gender === "Female").length,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Patient Registration Reports
          </h2>
          <p className="text-gray-600">
            Patient registration statistics and details
          </p>
        </div>

        {/* Date Filters + Export */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-blue-600">Loading reports...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div className="text-blue-600 font-bold text-2xl">{stats.total}</div>
          </div>
          <div className="text-gray-600">Total Patients</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            <div className="text-green-600 font-bold text-2xl">{stats.active}</div>
          </div>
          <div className="text-gray-600">Active Patients</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-600 font-bold text-2xl">{stats.newToday}</div>
          <div className="text-gray-600">New Today</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-orange-600 font-bold text-2xl">{stats.averageAge}</div>
          <div className="text-gray-600">Average Age</div>
        </div>
      </div>

      {/* Gender Distribution & Recent Registrations */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-3">Gender Distribution</h3>
          <div className="space-y-2">
            {Object.entries(genderDistribution).map(([gender, count]) => (
              <div key={gender} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      gender === "Male" ? "bg-blue-500" : "bg-pink-500"
                    }`}
                  ></div>
                  {gender}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{count}</span>
                  <span className="text-gray-500">
                    ({stats.total > 0 ? Math.round((count / stats.total) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Recent Registrations</h3>
          <div className="space-y-2">
            {registrations.slice(0, 3).map((patient) => (
              <div
                key={patient._id || patient.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div>
                  <div className="font-medium">{patient.fullName}</div>
                  <div className="text-sm text-gray-500">ID: {patient.patientId}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {patient.createdAt?.split("T")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Patient ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Registration Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((patient) => (
              <tr key={patient._id || patient.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{patient.patientId}</td>
                <td className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                  </div>
                  {patient.fullName}
                </td>
                <td className="p-3">{patient.age} years</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.gender === "Male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-3 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {patient.createdAt?.split("T")[0]}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {patient.status || "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRegistrationReports;
