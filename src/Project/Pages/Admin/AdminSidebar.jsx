// AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  Stethoscope,
  Building2,
  CalendarClock,
  CreditCard,
  Package,
  MessageSquare,
  LogOut,
  Headset,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
   const { logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await axios.post(
        "http://localhost:4002/api/admin/admin-logout",
        {},
        { withCredentials: true }
      );

      localStorage.clear();
        logout(); 
      
      // notify.success("Logged out successfully!");
      navigate("/"); // 🔒 prevent going back
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-2 border-b flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
          W
        </div>
        <h1 className="text-xl font-bold text-teal-600">WellNest</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <SidebarItem
          to="/admin/admin-dashboard"
          icon={<LayoutDashboard />}
          text="Dashboard"
        />
        <SidebarItem
          to="/admin/admin-appointments"
          icon={<CalendarDays />}
          text="Appointments"
        />
        <SidebarItem
          to="/admin/admin-patient"
          icon={<User />}
          text="Patients"
        />
        <SidebarItem
          to="/admin/admin-receptionist"
          icon={<Headset />}
          text="Receptionists"
        />
        <SidebarItem
          to="/admin/admin-doctorDetails"
          icon={<Stethoscope />}
          text="Doctors"
        />
        <SidebarItem
          to="/admin/admin-department"
          icon={<Building2 />}
          text="Departments"
        />
        <SidebarItem
          to="/admin/doctor-schedule"
          icon={<CalendarClock />}
          text="Doctors’ Schedule"
        />
        <SidebarItem
          to="/admin/payments"
          icon={<CreditCard />}
          text="Payments"
        />
        <SidebarItem
          to="/admin/inventory"
          icon={<Package />}
          text="Inventory"
        />
        <SidebarItem
          to="/admin/messages"
          icon={<MessageSquare />}
          text="Messages"
          badge={7}
        />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// SidebarItem component
const SidebarItem = ({ to, icon, text, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
        isActive
          ? "bg-teal-100 text-teal-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <div className="flex items-center gap-3">
      <div className="w-5 h-5">{icon}</div>
      <span>{text}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </NavLink>
);

export default AdminSidebar;
