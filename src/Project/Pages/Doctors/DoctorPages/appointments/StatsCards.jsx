// components/StatsCards.jsx
import React from 'react';
import { CalendarCheck, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      label: "Total Today",
      value: stats.total,
      color: "blue",
      icon: CalendarCheck
    },
    {
      label: "Confirmed",
      value: stats.confirmed,
      color: "green",
      icon: CheckCircle
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "yellow",
      icon: Clock
    },
    {
      label: "Completed",
      value: stats.completed,
      color: "blue",
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

const StatCard = ({ label, value, color, icon: Icon }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
  };

  const { bg, text } = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold ${text} mt-2`}>{value}</p>
        </div>
        <div className={`${bg} p-4 rounded-xl`}>
          <Icon className={text} size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;