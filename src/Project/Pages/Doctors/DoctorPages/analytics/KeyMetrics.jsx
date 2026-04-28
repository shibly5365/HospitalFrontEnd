import React from "react";
import { Activity, Users, DollarSign, Award } from "lucide-react";
import StatCard from "./StatCard";

const KeyMetrics = ({ dashboardData }) => {
  console.log(dashboardData);
  
  // safe fallback
  if (!dashboardData) return null;

  // 🔹 extract values safely
  const totalConsultations = dashboardData.totalConsultations || 0;
  const totalEarnings = dashboardData.totalEarnings || 0;
  const totalPatients = dashboardData.totalPatients || 0;
  const rating = dashboardData.rating || 0;

  // 🔹 calculate pending from breakdown (optional)
  const pendingAmount =
    dashboardData.earningsBreakdown?.find(
      (item) => item._id === "pending"
    )?.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      
      <StatCard
        icon={Activity}
        title="Total Consultations"
        value={totalConsultations}
        subtitle="Based on selected timeframe"
        color="#3b82f6"
        trend={0}
      />

      <StatCard
        icon={DollarSign}
        title="Total Earnings"
        value={`₹${totalEarnings.toLocaleString()}`}
        subtitle={`₹${pendingAmount} pending`}
        color="#10b981"
        trend={0}
      />

      <StatCard
        icon={Users}
        title="Total Patients"
        value={totalPatients}
        subtitle="Unique patients"
        color="#f59e0b"
        trend={0}
      />

      <StatCard
        icon={Award}
        title="Satisfaction Rating"
        value={rating.toFixed(1)}
        subtitle="Out of 5.0"
        color="#ec4899"
        trend={0}
      />
    </div>
  );
};

export default KeyMetrics;