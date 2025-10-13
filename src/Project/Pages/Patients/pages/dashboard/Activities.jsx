import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  CreditCard,
  ClipboardCheck,
  Stethoscope,
  Pill,
} from "lucide-react";

export default function Activities({ isVisible }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/dashboard-summary",
          { withCredentials: true }
        );

        const data = res.data;
        const recent = data.recentActivity ?? [];
        // console.log("Fetched activities:", recent);

        // 🧹 1. Sort by newest first
        const sorted = recent.sort(
          (a, b) =>
            new Date(b.timestamp || b.time) - new Date(a.timestamp || a.time)
        );

        // 🧩 2. Remove duplicates by activity type
        const uniqueByType = [];
        const seenTypes = new Set();

        for (const activity of sorted) {
          if (!seenTypes.has(activity.type)) {
            uniqueByType.push(activity);
            seenTypes.add(activity.type);
          }
        }

        // 🧮 3. Keep only top 3
        setActivities(uniqueByType.slice(0, 3));
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "Payment":
        return <CreditCard className="text-blue-500" size={24} />;
      case "Medical Record":
        return <FileText className="text-purple-500" size={24} />;
      case "Prescription":
        return <Pill className="text-green-500" size={24} />;
      case "Appointment":
        return <Stethoscope className="text-pink-500" size={24} />;
      default:
        return <ClipboardCheck className="text-gray-400" size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center text-gray-500">
        Loading activities...
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 delay-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recent Activities
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No recent activities.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md hover:scale-[1.02] transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div>{getActivityIcon(a.type)}</div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{a.title}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {a.type} • {a.status}
                </p>
                <p className="text-xs text-gray-400">
                  {a.date
                    ? new Date(a.date).toLocaleString()
                    : "No time available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
