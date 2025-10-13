import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Building2, Calendar, MessageSquare, Video, FileText, User,
  Settings, Moon, Sun, LogOut, Menu, X, Shield, Activity
} from "lucide-react";
import toast from "react-hot-toast";
import { notify } from "../../../Units/notification";
import { useAuth } from "../../Components/AuthContext";

const PatientSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [active, setActive] = useState("");

  const menuItems = [
    { name: "Dashboard", sub: "Overview", icon: <Home />, to: "/patient/patient-dashboard", gradient: "from-blue-500 to-cyan-500" },
    { name: "Departments", sub: "Find Specialists", icon: <Building2 />, to: "/patient/patient-departments", gradient: "from-emerald-500 to-teal-500" },
    { name: "Appointments", sub: "Schedule & History", icon: <Calendar />, to: "/patient/patient-appointments", gradient: "from-violet-500 to-purple-500" },
    { name: "Messages", sub: "Chat with Doctors", icon: <MessageSquare />, badge: 3, to: "/patient/chatPage", gradient: "from-amber-500 to-orange-500" },
    { name: "Consultation", sub: "Video Calls", icon: <Video />, to: "/patient/consultation", gradient: "from-rose-500 to-pink-500" },
    { name: "Medical Records", sub: "Health History", icon: <FileText />, to: "/patient/records", gradient: "from-indigo-500 to-blue-500" },
    { name: "Profile", sub: "Personal Information", icon: <User />, to: "/patient/chatPage", gradient: "from-cyan-500 to-sky-500" },
    { name: "Settings", sub: "Preferences", icon: <Settings />, to: "/patient/settings", gradient: "from-gray-600 to-gray-700" },
  ];

  useEffect(() => {
    const found = menuItems.find(m => location.pathname.includes(m.to.replace("/patient/", "")));
    setActive(found?.name || "Dashboard");
  }, [location]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    notify.success(`${newMode ? "Dark" : "Light"} mode enabled`);
  };

  const confirmLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1 ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <LogOut size={16} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Confirm Logout</p>
            <p className="text-xs text-gray-600">Are you sure you want to log out?</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <button onClick={() => { toast.dismiss(t.id); notify.info("Logout cancelled"); }}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
          <button onClick={() => {
            toast.dismiss(t.id);
            localStorage.clear();
            notify.success("You have been logged out successfully!");
            logout();
            navigate("/");
          }}
            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg">Yes, Logout</button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl shadow-lg">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-screen w-72 bg-white dark:bg-gray-900 shadow-xl p-6 flex flex-col transition-all z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 border-b pb-6 border-gray-100 dark:border-gray-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">HealthCare+</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Patient Portal</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">Secure</span>
              <Shield size={12} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30">
          <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back,</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{user?.name || "Patient"}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            return (
              <NavLink key={item.name} to={item.to}
                onClick={() => { setActive(item.name); if (window.innerWidth < 768) setIsOpen(false); }}
                className={({ isActive: linkActive }) =>
                  `group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                    linkActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`
                }>
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-cyan-500"}`}>{item.icon}</span>
                  <div className="leading-tight">
                    <p className="font-semibold text-sm">{item.name}</p>
                    {item.sub && <p className="text-xs">{item.sub}</p>}
                  </div>
                </div>
                {item.badge && <span className={`text-xs px-2 py-1 rounded-full font-semibold ${isActive ? "bg-white text-cyan-600" : "bg-cyan-500 text-white"}`}>{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Controls */}
        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <button onClick={toggleDarkMode}
            className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
            <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </div>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button onClick={confirmLogout}
            className="flex items-center gap-3 w-full p-2 text-red-500 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <LogOut size={16} />
            </div>
            Logout
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4 border-t pt-4">v2.1.0 • Secure & Encrypted</p>
      </aside>
    </>
  );
};

export default PatientSidebar;
