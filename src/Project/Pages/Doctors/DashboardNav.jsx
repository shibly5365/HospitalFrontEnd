import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Bell, Moon, ChevronDown } from "lucide-react";

const DashboardNav = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("user");
    if (storedDoctor) setDoctor(JSON.parse(storedDoctor));
    // console.log(storedDoctor); // log inside useEffect
  }, []);

  const doctorInitials = doctor
    ? doctor.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "DR";

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 w-full shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Left: Title + Welcome */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome, {doctor ? `Dr. ${doctor.fullName}` : "Doctor"}
          </p>
        </div>

        {/* Right Side Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-72 h-10 pl-9 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm bg-white placeholder-gray-500"
            />
          </div>

          {/* Quick Note */}
          <button className="px-5 py-2 rounded-full text-white font-medium bg-gradient-to-r from-blue-500 to-teal-400 flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200">
            <span className="text-lg">+</span>
            <span>Quick Note</span>
          </button>

          {/* Message Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-200">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
          </div>

          {/* Notification Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg font-medium">
              3
            </span>
          </div>

          {/* Theme Changer */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-200">
            <Moon className="w-5 h-5 text-gray-600" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {doctorInitials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {doctor?.fullName || "Dr. Sarah"}
              </p>
              <p className="text-xs text-gray-500">
                {doctor?.doctorDepartment || "Cardiologist"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
