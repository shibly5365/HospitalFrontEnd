import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart2Icon,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users2,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext";

function SuperAdminSidebar() {
  const navigate = useNavigate();
   const { logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    try {
      const response = await axios.post(
        "http://localhost:4002/api/superadmin/Superadmin-logout",
        {},
        { withCredentials: true } // needed for cookies
      );

      localStorage.clear();
      // notify.success("Logged out successfully!");
        logout(); 
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-screen w-64 bg-[#0b132b] text-gray-300 flex flex-col">
      {/* Logo + Role */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <div className="bg-[#12182f] p-3 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <h2 className="text-white text-sm font-semibold mt-2">MediCare Pro</h2>
        <p className="text-xs text-gray-400">Super Admin</p>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mt-6 space-y-2">
        <MenuItem
          to="/super-admin/super-admin-dashboard"
          icon={<LayoutDashboard size={18} />}
          text="Dashboard"
        />
        <MenuItem
          to="/super-admin/admin-management"
          icon={<Users2 size={18} />}
          text="Admin Management"
        />
        <MenuItem
          to="/payments"
          icon={<CreditCard size={18} />}
          text="Payments"
        />
        <MenuItem
          to="/analytics"
          icon={<BarChart2Icon size={18} />}
          text="Analytics"
        />
        <MenuItem
          to="/activity"
          icon={<ClipboardList size={18} />}
          text="Activity Logs"
        />
        <MenuItem
          to="/settings"
          icon={<Settings size={18} />}
          text="Settings / Profile"
        />
      </div>

      {/* Collapse Button */}
      <div className="border-t border-gray-700 py-3 flex justify-center">
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white"
        >
          <span className="text-lg">Log Out</span>
        </button>
      </div>
    </div>
  );
}

// Reusable Menu Item
const MenuItem = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-2 rounded-lg mx-2 text-sm font-medium cursor-pointer 
         ${
           isActive
             ? "bg-[#0f1a40] text-white"
             : "hover:bg-[#1a254d] hover:text-white"
         }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default SuperAdminSidebar;
