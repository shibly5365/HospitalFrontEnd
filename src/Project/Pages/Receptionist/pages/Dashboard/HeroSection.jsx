import React from "react";
import { Sparkles, Zap, Phone } from "lucide-react";

const HeroSection = ({ dashboardData }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Live Dashboard</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white">
              Welcome back, Rachel! 👋
            </h1>
            <p className="text-blue-100 text-base lg:text-lg max-w-2xl">
              You have{" "}
              <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">
                {dashboardData.appointments?.today?.count || 0} appointments
              </span>{" "}
              scheduled today.{" "}
              <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">
                {dashboardData.patients?.byStatus?.Pending?.length || 0} patients
              </span>{" "}
              are currently waiting.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="group bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Quick Check-in
              </button>
              <button className="group bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Answer Calls
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">
                {dashboardData.todayRegisteredPatients?.count || 0}
              </div>
              <div className="text-blue-100 text-sm">New Registrations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">
                {dashboardData.walkInPatients?.count || 0}
              </div>
              <div className="text-blue-100 text-sm">Walk-ins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;