import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, Star, Stethoscope } from "lucide-react";

export default function DoctorsList({ isVisible }) {
  const [lastVisited, setLastVisited] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastDoctor = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/dashboard-summary",
          { withCredentials: true }
        );

        const data = res.data;
        console.log(data);
        
        // ✅ Adjust key based on your backend response
        const doctors = data.lastVisitedDoctors ?? data.doctors ?? [];

        // ✅ Get only the most recent doctor (last in array)
        const last = doctors.length > 0 ? doctors[doctors.length - 1] : null;

        setLastVisited(last);
      } catch (err) {
        console.error("Error fetching last visited doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastDoctor();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center text-gray-500">
        Loading doctor info...
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 delay-900 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Last Visited Doctor
      </h2>

      {!lastVisited ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No recent doctor visits found.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
          {/* 👨‍⚕️ Doctor Image */}
          <img
            src={
              lastVisited.image ||
              lastVisited.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/387/387561.png"
            }
            alt={lastVisited.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 shadow-md"
          />

          {/* 🧠 Info Section */}
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold text-gray-800">
              Dr.{" "}
              {lastVisited.name
                ? lastVisited.name.charAt(0).toUpperCase() +
                  lastVisited.name.slice(1)
                : "Unknown"}
            </h3>

            <p className="text-blue-600 font-medium text-sm">
              {lastVisited.department || "General Medicine"}
            </p>

            {/* 💬 Interaction */}
            {lastVisited.reaction && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                Interaction: {lastVisited.reaction}
              </p>
            )}

            {/* 🕒 Last Visit */}
            {lastVisited.lastVisited && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Last Visit:{" "}
                {new Date(lastVisited.lastVisited).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            )}

            {/* 📅 Next Schedule */}
            {lastVisited.nextAppointment && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Next Appointment:{" "}
                {new Date(lastVisited.nextAppointment).toLocaleString(
                  "en-IN",
                  { dateStyle: "medium", timeStyle: "short" }
                )}
              </p>
            )}
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-semibold text-gray-700">
              {lastVisited.rating ?? "4.7"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
