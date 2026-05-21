import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // ✅ lightweight arrow icon
import CommonLoading from "../../../../../skeletons/CommonLoading";

export default function StatsGrid({ isVisible }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get(
          "/patient/dashboard",
          {
            withCredentials: true,
          },
        );

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
            route: "/patient/consultation",
          },
          {
            title: "Prescriptions",
            icon: "💊",
            color: "green",
            sub: "Active",
            main: data.prescriptions?.length ?? "0",
            desc: "Current",
            route: "/patient/prescrption-history",
          },
          {
            title: "Payments",
            icon: "💳",
            color: "purple",
            sub: "Recent Transactions",
            main: data.payments?.summary?.count ?? "0",
            desc: "This Month",
            route: "/patient/payment-history",
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
    <div
      className={`
        grid grid-cols-1 md:grid-cols-3 gap-4
        transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="
            bg-white dark:bg-gray-900
            rounded-3xl
            border border-gray-100 dark:border-gray-800
            p-5
            animate-pulse
          "
          style={{
            animationDelay: `${i * 120}ms`,
          }}
        >
          {/* Top */}
          <div className="flex items-center justify-between mb-5">
            <CommonLoading className="h-10 w-10 rounded-2xl" />
            <CommonLoading className="h-4 w-4 rounded-full" />
          </div>

          {/* Title */}
          <CommonLoading className="h-4 w-24 mb-3" />

          {/* Number */}
          <CommonLoading className="h-8 w-32 mb-4" />

          {/* Bottom */}
          <CommonLoading className="h-3 w-20 rounded-full" />
        </div>
      ))}
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
