import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Stethoscope,
  Clock,
  BarChart2,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Components/AuthContext";


const DoctorSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
   const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/doctors/doctors-dashboard",
    },
    {
      name: "Appointments",
      icon: <CalendarCheck size={20} />,
      path: "/doctors/doctors-appointments",
    },
    { name: "Patients", icon: <Users size={20} />, path: "/doctors/doctors-patients" },
    {
      name: "Consultation",
      icon: <Stethoscope size={20} />,
      path: "/doctors/doctors-consuletion ",
    },
    {
      name: "Availability",
      icon: <Clock size={20} />,
      path: "/doctors/doctors-availability",
    },
    {
      name: "Analytics",
      icon: <BarChart2 size={20} />,
      path: "/doctors/analytics",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/doctors/settings",
    },
  ];

  // ✅ Logout handler with confirmation
  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Are you sure you want to logout?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await fetch("http://localhost:4002/api/doctor/doctor-logout", {
                    method: "POST",
                    credentials: "include",
                  });

                  toast.success("Logged out successfully!", {
                    className:
                      "bg-green-500 text-white px-4 py-2 rounded-lg shadow",
                  });

                  localStorage.clear();
                    logout(); 
                  navigate("/") ; 
                } catch (error) {
                  toast.error("Logout failed!", {
                    className:
                      "bg-red-500 text-white px-4 py-2 rounded-lg shadow",
                  });
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        className: "bg-white text-black shadow-lg p-4 rounded-lg",
      }
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 flex flex-col z-50`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold text-gray-700 ${!isOpen && "hidden"}`}
          >
            Doctor
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 my-1 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span className={`${!isOpen && "hidden"} text-sm font-medium`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-2 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={20} />
            <span className={`${!isOpen && "hidden"} text-sm font-medium`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Content wrapper with margin to avoid overlap */}
      <div className={`${isOpen ? "ml-64" : "ml-20"} flex-1 transition-all`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default DoctorSideBar;
