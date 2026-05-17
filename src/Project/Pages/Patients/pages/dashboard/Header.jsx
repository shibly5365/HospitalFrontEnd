import { apiClient } from "../../../../../services/queryClient";
import React, { useEffect, useState } from "react";

export default function Header({ isVisible }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await apiClient.get(
          "/patient/dashboard",
          {
            withCredentials: true, // important if you're using cookies for auth
          },
        );
    

        setPatient(res.data);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (loading) {
    return (
      <div className="animate-pulse p-4 text-gray-400">
        Loading patient info...
      </div>
    );
  }

  if (!patient) {
    return <div className="p-4 text-red-500">Failed to load patient info.</div>;
  }

  return (
    <div
      className={`mb-8 transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {/* Patient profile image */}
          {patient.patientInfo.profileImage ? (
            <img
              src={patient.patientInfo.profileImage}
              alt={patient.patientInfo.fullName}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {patient.patientInfo.fullName}
            </div>
          )}

          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome {patient.patientInfo.fullName || "Patient"}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Here's your health overview for today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-white/20">
          {/* Profile Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-400">
            <img
              src={
                patient.patientInfo.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Patient ID */}
          <div>
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="font-semibold text-gray-800">
              #{patient?._id?.slice(-6).toUpperCase() || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
