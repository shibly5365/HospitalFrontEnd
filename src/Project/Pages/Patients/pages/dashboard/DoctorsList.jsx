import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Star, Stethoscope } from "lucide-react";

export default function DoctorsList({ isVisible }) {
  const [lastVisited, setLastVisited] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastDoctor = async () => {
      try {
        const res = await apiClient.get(
          "/patient/dashboard",
          { withCredentials: true }
        );

        const doctors = res.data.lastVisitedDoctors || [];

        const last = doctors.length > 0 ? doctors[0] : null;

        // 🔥 FIX WRONG BACKEND URL PREFIX
        if (last && last.profileImage) {
          last.profileImage = cleanImageUrl(last.profileImage);
        }

        setLastVisited(last);
      } catch (err) {
        console.error("Error fetching last visited doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastDoctor();
  }, []);

  // 🔧 Function to fix backend image bug
  const cleanImageUrl = (url) => {
    const defaultFallback =
      "https://cdn-icons-png.flaticon.com/512/387/387561.png";
    if (!url) return defaultFallback;

    // If backend added "/uploads/.../https://"
    if (url.includes("/uploads/doctors/https")) {
      const parts = url.split("uploads/doctors/");
      return parts[1] || defaultFallback;
    }

    // If it's already a valid https URL
    if (url.startsWith("http")) return url;

    // Otherwise return fallback
    return defaultFallback;
  };

  if (loading) {
    return (
      <div className="theme-card rounded-2xl p-6 shadow-lg text-center text-gray-500">
        Loading doctor info...
      </div>
    );
  }

  return (
    <div
      className={`theme-card rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
    >
      <h2 className="text-2xl font-bold theme-text mb-4">
        Last Visited Doctor
      </h2>

      {!lastVisited ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No recent doctor visits found.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 theme-soft rounded-2xl border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">

          {/* Doctor Image */}
          <img
            src={lastVisited.profileImage}
            alt="Doctor profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 shadow-md"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/387/387561.png";
            }}
          />

          {/* Info Section */}
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold theme-text">
              Dr. {lastVisited.name || "Unknown"}
            </h3>

            <p className="text-blue-600 font-medium text-sm">
              {lastVisited.department || "General Medicine"}
            </p>

            {lastVisited.reaction && (
              <p className="text-sm theme-text-muted flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                Interaction: {lastVisited.reaction}
              </p>
            )}

            {lastVisited.lastVisited && (
              <p className="text-sm theme-text-muted flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Last Visit:{" "}
                {new Date(lastVisited.lastVisited).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            )}

            {lastVisited.nextAppointment && (
              <p className="text-sm theme-text-muted flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Next Appointment:{" "}
                {new Date(lastVisited.nextAppointment).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center bg-yellow-500/10 px-3 py-1 rounded-lg shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-semibold theme-text">
              {lastVisited.rating ?? "4.7"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
