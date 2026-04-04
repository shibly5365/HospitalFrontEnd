import React from "react";
import { Activity, Users, DollarSign, Award } from "lucide-react";
import StatCard from "./StatCard";

const KeyMetrics = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      
      <StatCard
        icon={Activity}
        title="Total Consultations"
        value={dashboardData.monthlyConsultations}
        subtitle="This month"
        color="#3b82f6"
        trend={0}
      />

      <StatCard
        icon={DollarSign}
        title="Total Earnings"
        value={`₹${dashboardData.totalEarnings.toLocaleString()}`}
        subtitle={`₹${dashboardData.pendingAmount} pending`}
        color="#10b981"
        trend={0}
      />

      <StatCard
        icon={Users}
        title="Total Patients"
        value={dashboardData.totalPatients}
        subtitle={`${dashboardData.newPatients} new patients`}
        color="#f59e0b"
        trend={0}
      />

      <StatCard
        icon={Award}
        title="Satisfaction Rating"
        value={dashboardData.averageRating}
        subtitle="Out of 5.0"
        color="#ec4899"
        trend={0}
      />
    </div>
  );
};

export default KeyMetrics;