import React, { useEffect, useState } from "react";
import { FaUser, FaCalendarAlt, FaUserMd, FaDollarSign } from "react-icons/fa";
import { getDashboardCounts } from "../../../../../services/adminService.js";

const TopStats = () => {
  const [data, setData] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalDoctors: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await getDashboardCounts();

      console.log("API RESPONSE:", res.data); // 👈 DEBUG

      setData(res.data.data || res.data); // ✅ fallback safe
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Patients",
      value: data.totalPatients,
      icon: <FaUser className="text-blue-500 text-3xl" />,
    },
    {
      title: "Appointments",
      value: data.totalAppointments,
      icon: <FaCalendarAlt className="text-orange-500 text-3xl" />,
    },
    {
      title: "Doctors",
      value: data.totalDoctors,
      icon: <FaUserMd className="text-purple-500 text-3xl" />,
    },
    {
      title: "Transactions",
      value: data.totalRevenue,
      icon: <FaDollarSign className="text-pink-500 text-3xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition"
        >
          <div>
            <p className="text-gray-500 text-sm">{item.title}</p>

            {loading ? (
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <h2 className="text-2xl font-bold mt-1">{item.value ?? 0}</h2>
            )}
          </div>

          <div className="bg-gray-100 p-3 rounded-full">{item.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default TopStats;
