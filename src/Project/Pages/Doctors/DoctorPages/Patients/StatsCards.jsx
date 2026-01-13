import React from "react";
import { User, Calendar, Clock } from "lucide-react";

const StatsCards = ({ patients }) => {
  console.log(patients);
  
  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: User,
      bgColor: "bg-slate-100",
      iconColor: "text-slate-700"
    },
    {
      title: "Upcoming",
      value: patients.filter(p => p.nextAppointment).length,
      icon: Calendar,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-700"
    },
    {
      title: "Recent Visits",
      value: patients.filter(p => p.lastVisit).length,
      icon: Clock,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <div>
              <p className="text-slate-600 text-xs font-medium uppercase tracking-wide">
                {stat.title}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;