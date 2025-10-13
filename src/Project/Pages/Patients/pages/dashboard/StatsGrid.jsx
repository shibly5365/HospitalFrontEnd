import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // ✅ lightweight arrow icon

export default function StatsGrid({ isVisible }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4002/api/patient/dashboard-summary", {
          withCredentials: true,
        });

        const data = res.data;
        // console.log(data);

        const formattedStats = [
          {
            title: "Consultations",
            icon: "👨‍⚕️",
            color: "blue",
            sub: "Recent Activity",
            main: data.consultations?.total ?? "0",
            desc: "All Time",
            route: "/consultations",
          },
          {
            title: "Prescriptions",
            icon: "💊",
            color: "green",
            sub: "Active",
            main: data.prescriptions?.length ?? "0",
            desc: "Current",
            route: "/prescriptions",
          },
          {
            title: "Payments",
            icon: "💳",
            color: "purple",
            sub: "Recent Transactions",
            main: data.payments?.summary?.count ?? "0",
            desc: "This Month",
            route: "/payments",
          },
        ];

        setStats(formattedStats);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
        Loading stats...
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 transform transition-all duration-700 delay-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          onClick={() => navigate(s.route)}
          className={`relative bg-gradient-to-br from-${s.color}-500 to-${s.color}-600 
            rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 
            hover:scale-[1.03] cursor-pointer group`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <span className="text-2xl">{s.icon}</span>
          </div>

          <div className="space-y-1">
            <p className="text-sm opacity-90">{s.sub}</p>
            <p className="text-3xl font-bold">{s.main}</p>
            <p className="text-sm opacity-90">{s.desc}</p>
          </div>

          {/* ➡️ arrow icon in the corner */}
          <div className="absolute bottom-4 right-4 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
