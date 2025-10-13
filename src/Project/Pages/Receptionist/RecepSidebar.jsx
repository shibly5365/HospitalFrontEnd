// RecepSidebar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  UserPlus,
  Users,
  Phone,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { toast } from "react-hot-toast"; 
import { notify } from "../../../Units/notification";
import { useAuth } from "../../Components/AuthContext";

const RecepSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
    const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/receptionist/receptionist-dashboard" },
    { name: "Appointments", icon: <CalendarCheck size={20} />, path: "/receptionist/receptionist-appointments" },
    { name: "Registration", icon: <UserPlus size={20} />, path: "/receptionist/receptionist-registretion" },
    { name: "Doctor Schedule", icon: <CalendarCheck size={20} />, path: "/receptionist/receptionist-DoctorSchedule" },
    { name: "Visitor Management", icon: <Users size={20} />, path: "/receptionist/receptionist-patientlists" },
    { name: "Phone & Messages", icon: <Phone size={20} />, path: "/receptionist/receptionist-ReceptionHub" },
    { name: "Settings", icon: <Settings size={20} />, path: "/receptionist/settings" },
  ];

const handleLogout = () => {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">Are you sure you want to logout?</p>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              const response = await fetch(
                "http://localhost:4002/api/receptionist/receptionist-logout",
                {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (response.ok) {
                notify.success("You have been logged out successfully!");

                // ✅ Call your AuthContext logout
                logout(); // from useAuth()

                // ✅ Navigate after logout
                navigate("/login", { replace: true });
              } else {
                notify.error("Logout failed. Please try again.");
              }
            } catch (error) {
              notify.error("Something went wrong during logout.");
              console.error("Error logging out:", error);
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
  ));
};


  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen sticky top-0 bg-white text-black p-4 transition-all duration-300 shadow-lg flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className={`${!isOpen && "hidden"} text-xl font-bold`}>Receptionist</h1>
          <Menu className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        </div>

        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-2 rounded-xl transition 
                    ${isActive
                      ? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 shadow-md"
                      : "hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-700"
                    }`}
                >
                  <span
                    className={`${isActive ? "text-purple-700" : "text-gray-600"}`}
                  >
                    {item.icon}
                  </span>
                  <span className={`${!isOpen && "hidden"} text-sm font-medium`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-red-100 hover:text-red-600 cursor-pointer transition"
      >
        <LogOut size={20} />
        <span className={`${!isOpen && "hidden"} text-sm font-medium`}>Logout</span>
      </div>
    </div>
  );
};

export default RecepSidebar;
