import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPatientMonthlyStats } from "../../../../../services/adminService";

const PatientStatistics = () => {
  const [patientStats, setPatientStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getPatientMonthlyStats();
      const apiData = res.data.data || [];

      // ✅ Generate last 6 months
      const months = [];
      const now = new Date();

      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const name = d.toLocaleString("default", { month: "short" });

        months.push({
          name,
          new: 0,
          old: 0,
        });
      }

      // ✅ Merge API data
      const finalData = months.map((m) => {
        const found = apiData.find((d) => d.name === m.name);
        return found ? found : m;
      });

      setPatientStats(finalData);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // ✅ Fix Y-axis scaling (important)
  const maxValue = Math.max(
    ...patientStats.map((d) => d.new + d.old),
    5, // minimum scale for good UI
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Patients Statistics</h3>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow">
          View All Patients
        </button>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={patientStats}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} domain={[0, maxValue]} tickCount={6} />

          <Tooltip
            formatter={(value, name) => [
              value,
              name === "new" ? "New Patients" : "Returning Patients",
            ]}
          />

          <Bar dataKey="new" stackId="a" fill="#0088FE" barSize={30} />
          <Bar dataKey="old" stackId="a" fill="#00C49F" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientStatistics;
