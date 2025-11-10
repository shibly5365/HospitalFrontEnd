import React from "react";
import { TrendingUp, Clock, Phone, PiIcon } from "lucide-react";

const AdditionalStats = ({ dashboardData }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Today's Registrations"
          value={dashboardData.todayRegisteredPatients?.count || 0}
          gradient="from-purple-500 via-pink-500 to-rose-500"
          trend="+18% from yesterday"
          icon={TrendingUp}
        />
        <StatCard
          title="Walk-in Queue"
          value={dashboardData.walkInPatients?.count || 0}
          gradient="from-orange-500 via-red-500 to-pink-500"
          trend="Avg wait: 15 min"
          icon={Clock}
        />
      </div>

      <EmergencyContactCard />
    </>
  );
};

const StatCard = ({ title, value, gradient, trend,  }) => (
  <div
    className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
    <div className="relative">
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-purple-100 text-sm font-medium">{title}</div>
      <div className="mt-3 flex items-center gap-1">
        <PiIcon className="w-4 h-4" />
        <span className="text-xs font-bold">{trend}</span>
      </div>
    </div>
  </div>
);

const EmergencyContactCard = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Emergency</h3>
          <p className="text-red-100 text-sm">24/7 Available</p>
        </div>
      </div>
      <button className="w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
        <Phone className="w-5 h-5" />
        Call Now: 911
      </button>
    </div>
  </div>
);

export default AdditionalStats;
