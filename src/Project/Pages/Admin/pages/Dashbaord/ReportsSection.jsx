import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import {
  getPatientGenderStats,
  getTodayDoctors,
} from "../../../../../services/adminService";

const ReportsSection = () => {
  const [genderStats, setGenderStats] = useState({
    male: 0,
    female: 0,
    other: 0,
    total: 0,
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchGenderStats();
    fetchDoctors();
  }, []);

  // ===============================
  // ✅ PATIENT GENDER STATS
  // ===============================
  const fetchGenderStats = async () => {
    try {
      const res = await getPatientGenderStats();
      const data = res.data.data || [];

      let male = 0,
        female = 0,
        other = 0;

      data.forEach((item) => {
        if (item._id === "Male") male = item.count;
        else if (item._id === "Female") female = item.count;
        else other = item.count;
      });

      const total = male + female + other || 1;

      setGenderStats({
        male: Math.round((male / total) * 100),
        female: Math.round((female / total) * 100),
        other: Math.round((other / total) * 100),
        total: male + female + other, // ✅ real count
      });
    } catch (error) {
      console.error("Gender stats error:", error);
    }
  };

  // ===============================
  // ✅ TODAY DOCTORS
  // ===============================
  const fetchDoctors = async () => {
    try {
      const res = await getTodayDoctors();
      setDoctors(res.data.data || []);
    } catch (error) {
      console.error("Doctors error:", error);
    }
  };

  // ===============================
  // STATIC REPORTS (UNCHANGED)
  // ===============================
  const patientReports = [
    { name: "David Marshall", test: "Hemoglobin" },
    { name: "Thomas McLean", test: "X Ray" },
    { name: "Greta Kinney", test: "MRI Scan" },
    { name: "Larry Wilburn", test: "Blood Test" },
    { name: "Reyan Verol", test: "CT Scan" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* ================= PATIENT REPORTS ================= */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex justify-between">
          Patient Reports
          <button className="text-sm text-blue-500">View All</button>
        </h3>

        <div className="space-y-3">
          {patientReports.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.test}</p>
              </div>
              <FaDownload className="text-gray-500 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= PATIENT VISITS ================= */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex justify-between">
          Patient Visits
          <button className="text-sm text-blue-500">View All</button>
        </h3>

        <div className="flex flex-col items-center">
          
          {/* 🔥 TOTAL COUNT */}
          <div className="w-32 h-32 rounded-full border-8 border-dashed border-blue-400 flex items-center justify-center">
            <span className="text-xl font-bold">
              {genderStats.total}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">Total Patients</p>

          {/* 🔥 PERCENTAGE BREAKDOWN */}
          <div className="mt-4 space-y-2">
            <p className="text-sm text-blue-600">
              Male - {genderStats.male}%
            </p>
            <p className="text-sm text-purple-600">
              Female - {genderStats.female}%
            </p>
            {genderStats.other > 0 && (
              <p className="text-sm text-yellow-600">
                Other - {genderStats.other}%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= DOCTORS ================= */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex justify-between">
          Doctors
          <button className="text-sm text-blue-500">View All</button>
        </h3>

        <div className="space-y-3">
          {doctors.length === 0 ? (
            <p className="text-sm text-gray-500">
              No doctors available today
            </p>
          ) : (
            doctors.slice(0, 5).map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">
                    {doc?.userId?.fullName || "Doctor"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doc?.department?.name || "Department"}
                  </p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  Available
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;