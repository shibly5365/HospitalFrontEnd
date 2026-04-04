import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import { notify } from "../../../Units/notification";
import { useAuth } from "../../Components/AuthContext";
import { useTheme } from "../../../context/ThemeContext"; // ✅ NEW
import axios from "axios";

const PatientSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme(); // ✅ GLOBAL THEME

  const [active, setActive] = useState("");

  const menuItems = [
    {
      name: "Dashboard",
      sub: "Overview",
      icon: <Home />,
      to: "/patient/patient-dashboard",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Departments",
      sub: "Find Specialists",
      icon: <Building2 />,
      to: "/patient/patient-departments",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Appointments",
      sub: "Schedule & History",
      icon: <Calendar />,
      to: "/patient/patient-appointments",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      name: "Messages",
      sub: "Chat with Doctors",
      icon: <MessageSquare />,
      badge: 3,
      to: "/patient/chatPage",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Consultation",
      sub: "Video Calls",
      icon: <Video />,
      to: "/patient/consultation",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      name: "Medical Records",
      sub: "Health History",
      icon: <FileText />,
      to: "/patient/records",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: "Settings",
      sub: "Preferences",
      icon: <Settings />,
      to: "/patient/settings",
      gradient: "from-gray-600 to-gray-700",
    },
  ];

  useEffect(() => {
    const found = menuItems.find((m) =>
      location.pathname.includes(m.to.replace("/patient/", "")),
    );
    setActive(found?.name || "Dashboard");
  }, [location]);

  const confirmLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut size={16} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">Confirm Logout</p>
              <p className="text-xs text-gray-600">
                Are you sure you want to log out?
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                notify.info("Logout cancelled");
              }}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.post(
                    "http://localhost:4002/api/auth/logout",
                    {},
                    { withCredentials: true },
                  );

                  localStorage.clear();
                  logout();
                  notify.success("Logged out successfully!");
                  navigate("/");
                } catch (error) {
                  console.error(error);
                  notify.error("Logout failed");
                }
              }}
              className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 shadow-xl p-6 flex flex-col transition-all z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ background: "var(--bg)", color: "var(--text)" }} // ✅ THEME APPLIED
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 border-b pb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              HealthCare+
            </h1>
            <p className="text-xs opacity-70">Patient Portal</p>
          </div>
        </div>

        {/* User */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50">
          <p className="text-sm opacity-70">Welcome back,</p>
          <p className="text-lg font-bold truncate">
            {user?.name || "Patient"}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => {
                  setActive(item.name);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={({ isActive: linkActive }) =>
                  `group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                    linkActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "opacity-80 hover:bg-white/10"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    {item.sub && <p className="text-xs">{item.sub}</p>}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Switcher */}
        <div className="mt-auto pt-6 border-t space-y-3">
          <p className="text-xs opacity-60 px-2">Theme</p>

          <div className="flex gap-2 px-2">
            {["light", "dark", "blue"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  notify.success(`${t} mode enabled`);
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  theme === t ? "border-white" : "border-transparent"
                } ${
                  t === "dark"
                    ? "bg-black"
                    : t === "blue"
                      ? "bg-blue-500"
                      : "bg-white"
                }`}
              />
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={confirmLogout}
            className="flex items-center gap-3 w-full p-2 text-red-500 rounded-xl border border-red-200 hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default PatientSidebar;
