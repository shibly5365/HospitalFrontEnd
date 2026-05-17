import React from "react";
import {
  Users,
  Activity,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
} from "lucide-react";
import StatCard from "./StatCard";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Patients"
        value={stats.totalPatients?.toLocaleString() || 0}
        icon={Users}
        color="bg-blue-500"
        trend={12}
      />
      <StatCard
        title="Patients This Month"
        value={stats.patientsThisMonth || 0}
        icon={Activity}
        color="bg-green-500"
        trend={8}
      />
      <StatCard
        title="Days Present"
        value={stats.daysPresentThisMonth || 0}
        icon={CalendarIcon}
        color="bg-purple-500"
      />
      <StatCard
        title="Total Leaves"
        value={stats.totalLeavesTaken || 0}
        icon={Clock}
        color="bg-orange-500"
      />
      <StatCard
        title="Pending Leaves"
        value={stats.pendingLeaveRequests || 0}
        icon={AlertCircle}
        color="bg-red-500"
      />
    </div>
  );
};

export default StatsCards;