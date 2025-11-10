import React from "react";
import { Users, Clock, CalendarCheck, Stethoscope, TrendingUp } from "lucide-react";

const StatsGrid = ({ dashboardData }) => {
  const stats = [
    {
      title: "Confirmed Today",
      value: dashboardData.patients?.counts?.Confirmed || 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "In Waiting Room",
      value: dashboardData.appointments?.nextPatients?.count || 0,
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Scheduled Today",
      value: dashboardData.appointments?.today?.count || 0,
      icon: CalendarCheck,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Patients",
      value: dashboardData.patients?.total || 0,
      icon: Stethoscope,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      trend: "+15%",
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

const StatCard = ({ stat }) => {
  const IconComponent = stat.icon;
  
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-600 text-sm font-bold">{stat.trend}</span>
          </div>
        </div>
        
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {stat.value.toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm font-medium">{stat.title}</div>
      </div>
    </div>
  );
};

export default StatsGrid;