import React from "react";
import StatCard from "./StatCard";
import { DollarSign, Clock, CheckCircle, TrendingUp } from "lucide-react";

export default function Stats({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Revenue"
        value={summary.totalRevenue}
        change={12.5}
        icon={DollarSign}
        color="blue"
        trend={12.5}
      />
      <StatCard
        title="Pending Amount"
        value={summary.pendingAmount}
        change={-8.2}
        icon={Clock}
        color="yellow"
        trend={-8.2}
      />
      <StatCard
        title="Completed"
        value={summary.completedAmount}
        change={18.3}
        icon={CheckCircle}
        color="green"
        trend={18.3}
      />
      <StatCard
        title="Today's Revenue"
        value={summary.todayRevenue}
        icon={TrendingUp}
        color="purple"
      />
    </div>
  );
}