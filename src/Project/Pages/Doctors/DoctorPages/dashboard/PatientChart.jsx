import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const PatientChart = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:4002/api/doctor/summary",{withCredentials:true});
        
        const data = response.data;

        const chartData = [
          { name: "Male Patients", value: data.newPatients, color: "#3B82F6" },
          { name: "Femle Patients", value: data.oldPatients, color: "#FBBF24" },
          { name: "Total Patients", value: data.totalPatients, color: "#E5E7EB" },
        ];

        setPieData(chartData);
      } catch (error) {
        console.error("Error fetching patient summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">
        Patients Summary December 2021
      </h3>
      <div className="flex flex-col items-center">
        <div className="w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientChart;
