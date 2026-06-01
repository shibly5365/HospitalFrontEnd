import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Stethoscope,
  Clock,
  BarChart2,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  Menu,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Components/AuthContext";
import { apiClient } from "../../../services/queryClient";
import { useTheme } from "../../../context/ThemeContext";

const DoctorSideBar = ({ isOpen, setIsOpen }) => {
  const { doctorTheme, setDoctorTheme } = useTheme();

  const darkMode = doctorTheme === "dark";

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // ✅ Sidebar menu items
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
    {
      name: "Patients",
      icon: <Users size={20} />,
      path: "/doctors/doctors-patients",
    },
    {
      name: "Consultations",
      icon: <Stethoscope size={20} />,
      path: "/doctors/doctors-consuletion",
    },
    {
      name: "Prescriptions",
      icon: <FileText size={20} />,
      path: "/doctors/doctors-prescription",
    },
    {
      name: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/doctors/doctors-messages",
    },
    {
      name: "Availability",
      icon: <Clock size={20} />,
      path: "/doctors/doctors-availability",
    },
    {
      name: "Payments",
      icon: <CreditCard size={20} />,
      path: "/doctors/doctors-payment",
    },
    {
      name: "Analytics",
      icon: <BarChart2 size={20} />,
      path: "/doctors/doctors-analytics",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/doctors/appointments-settings",
    },
  ];

  // ✅ Logout handler with confirmation toast
  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await apiClient.post("/auth/logout");

                  toast.success("Logged out successfully!", {
                    className:
                      "bg-green-500 text-white px-4 py-2 rounded-lg shadow",
                  });

                  localStorage.clear();
                  logout();
                  navigate("/");
                } catch {
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
      },
    );
  };

  return (
    <div
      className={`${isOpen ? "w-72" : "w-20"} fixed top-0 left-0 h-screen bg-[var(--surface)]  text-[var(--text)] border-r border-[var(--line)] shadow-sm transition-all duration-300 flex flex-col z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
        <h1
          className={`text-lg font-semibold tracking-tight text-[var(--text)] ${
            !isOpen && "hidden"
          }`}
        >
          Doctor Panel
        </h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
        p-2 rounded-xl
        hover:bg-[var(--surface-soft)]
        dark:hover:bg-slate-800
        transition-all duration-200
      "
        >
          <Menu size={20} className="text-[var(--text)]" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`
            group flex items-center gap-3
            px-4 py-3 rounded-2xl
            transition-all duration-200
            hover:scale-[1.02]

            ${
              isActive
                ? `
                  bg-slate-900 text-white
                  dark:bg-white dark:text-black
                  shadow-lg shadow-black/5 dark:shadow-white/5
                `
                : `
                  text-slate-600 dark:text-slate-300
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                  hover:text-slate-900
                  dark:hover:text-white
                `
            }
          `}
            >
              <div
                className={`
              transition-all duration-200
              ${isActive ? "scale-105" : "group-hover:scale-105"}
            `}
              >
                {item.icon}
              </div>

              <span
                className={`text-[15px] font-medium ${!isOpen && "hidden"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setDoctorTheme(darkMode ? "light" : "dark")}
          className="
        w-full flex items-center gap-3
        px-4 py-3 rounded-2xl

        text-[var(--text)]

        hover:bg-slate-100
        dark:hover:bg-slate-800

        hover:text-slate-900
        dark:hover:text-white

        transition-all duration-200
      "
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}

          <span className={`text-sm font-medium ${!isOpen && "hidden"}`}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
        w-full flex items-center gap-3
        px-4 py-3 rounded-2xl

        text-red-500

        hover:bg-red-50
        dark:hover:bg-red-500/10

        transition-all duration-200
      "
        >
          <LogOut size={20} />

          <span className={`text-sm font-medium ${!isOpen && "hidden"}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSideBar;
