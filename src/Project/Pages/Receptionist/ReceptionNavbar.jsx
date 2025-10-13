import {
  Bell,
  Search,
  AlertTriangle,
  Clock,
  Activity,
  Users,
  TrendingUp,
  Stethoscope,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ for routing

const ReceptionNavbar = ({ darkMode, setDarkMode }) => {
  const [receptionist, setReceptionist] = useState(null);
  useEffect(() => {
    const storedReceptionit = localStorage.getItem("user");
    if (storedReceptionit) setReceptionist(JSON.parse(storedReceptionit));
    // console.log("storedReceptionit", storedReceptionit); // log inside useEffect
  }, []);

  // console.log("sresdts",receptionist);
  
  const ReceptionistInitials = receptionist
    ? receptionist.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "REP";
  // console.log("nav", receptionist);
  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* 🔹 Top Section */}
      <div className="flex justify-between items-center px-0 py-5">
        {/* Left: Title + Live */}
        <div
          className={`flex items-center gap-3 px-6 py-2 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h1 className="text-xl font-bold">Reception Dashboard</h1>
          <span className="flex items-center text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full cursor-pointer hover:bg-green-200 hover:scale-105 transition">
            Live
          </span>
        </div>

        {/* Right: Search, Emergency, Notification, Theme, Profile */}
        <div className="flex items-center gap-5 px-6">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className={`pl-10 pr-4 py-2 rounded-md w-72 text-sm focus:outline-none border ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            />
          </div>

          {/* Emergency Button (with routing) */}
          <Link
            to="/emergency"
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
          >
            <AlertTriangle size={16} /> Emergency
          </Link>

          {/* Notifications (smaller, like theme toggle) */}
          <button
            className={`relative p-2 rounded-full border ${
              darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                : "bg-white border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border ${
              darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                : "bg-white border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Moon size={16} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold">
              {ReceptionistInitials}
            </div>
            <div className="hidden md:block text-sm leading-tight">
              <p className="font-medium">{receptionist?.fullName} </p>
              <p className="text-xs opacity-70">{receptionist?.employeeId} </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section (Status Cards) */}
      <div className="flex px-4 py-3 text-sm gap-4 overflow-x-auto">
        {[
          { icon: Clock, label: "Waiting", value: 12, color: "blue" },
          { icon: Activity, label: "In Progress", value: 8, color: "green" },
          { icon: Users, label: "Walk-ins", value: 3, color: "orange" },
          { icon: TrendingUp, label: "Today", value: 67, color: "purple" },
          {
            icon: Stethoscope,
            label: "Available Docs",
            value: 5,
            color: "teal",
          },
          { icon: AlertTriangle, label: "Priority", value: 2, color: "red" },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex flex-1 min-w-[160px] items-center justify-center gap-2 px-4 py-2 rounded-md bg-${item.color}-50 text-${item.color}-600 cursor-pointer transform transition hover:scale-105 hover:shadow-md`}
          >
            <item.icon size={18} /> {item.label}: <b>{item.value}</b>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default ReceptionNavbar;
