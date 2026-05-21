import { apiClient } from "../../../services/queryClient";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserPlus,
  Users,
  CalendarPlus,
  CalendarCheck,
  CalendarClock,
  Stethoscope,
  Receipt,
  FileText,
  Building2,
  UserCircle2,
  LogOut,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  HelpCircle,
  Search,
  Edit,
  Clock,
  DollarSign,
  Printer,
  Shield,
  Megaphone,
  KeyRound,
  Eye,
} from "lucide-react";
import { notify } from "../../../UnitsTemp/notification";
import { useAuth } from "../../Components/AuthContext";
import toast from "react-hot-toast";

const RecepSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    toast((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 w-72">
        <p className="text-gray-800 mb-3">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>

          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await apiClient.post(
                  "/receptionist/receptionist-logout",
                  {},
                  { withCredentials: true }
                );
                logout();
                navigate("/login");
                notify.success("Logged out successfully");
              } catch (error) {
                console.error("Logout error:", error);
                logout();
                navigate("/");
              }
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ), { position: "top-right" });
  };




  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const menuGroups = [
    {
      title: "Patient Management",
      icon: <Users size={20} />,
      menuKey: "patient",
      items: [
        {
          title: "View / Search Patients",
          icon: <Search size={18} />,
          path: "/receptionist/patients/view-search",
        },
        {
          title: "Register New Patient",
          icon: <UserPlus size={18} />,
          path: "/receptionist/patients/register",
        },
        {
          title: "Book Appointment",
          icon: <CalendarPlus size={18} />,
          path: "/receptionist/patients/book-appointment",
        },


      ],
    },
    {
      title: "Appointment Management",
      icon: <CalendarCheck size={20} />,
      menuKey: "appointment",
      items: [

        {
          title: "Today's Appointments",
          icon: <CalendarClock size={18} />,
          path: "/receptionist/receptionist-appointments",
        },

        {
          title: "Doctor Availability",
          icon: <Clock size={18} />,
          path: "/receptionist/receptionist-DoctorSchedule",
        },

      ],
    },
    {
      title: "Billing & Payments",
      icon: <Receipt size={20} />,
      menuKey: "billing",
      items: [
        {
          title: "Generate Bill",
          icon: <FileText size={18} />,
          path: "/receptionist/billing/generate-bill",
        },
      ],
    },
    {
      title: "Doctor & Department Directory",
      icon: <Stethoscope size={20} />,
      menuKey: "doctor",
      items: [
        {
          title: "List of Doctors",
          icon: <Stethoscope size={18} />,
          path: "/receptionist/doctors",
        },
        {
          title: "Doctor Timings",
          icon: <Clock size={18} />,
          path: "/receptionist/receptionist-DoctorSchedule",
        },
        {
          title: "Department List",
          icon: <Building2 size={18} />,
          path: "/receptionist/departments",
        },

      ],
    },
    {
      title: "Visitor / Attender Management",
      icon: <UserPlus size={20} />,
      menuKey: "visitor",
      items: [
        {
          title: "Register Visitor",
          icon: <UserPlus size={18} />,
          path: "/receptionist/visitors/register",
        },
        {
          title: "Visitor Pass Printing",
          icon: <Printer size={18} />,
          path: "/receptionist/visitors/pass",
        },
        {
          title: "Visitor Log History",
          icon: <FileText size={18} />,
          path: "/receptionist/visitors/history",
        },
      ],
    },
    {
      title: "Enquiries / Help Desk",
      icon: <HelpCircle size={20} />,
      menuKey: "helpdesk",
      items: [
        {
          title: "General Enquiries",
          icon: <HelpCircle size={18} />,
          path: null, // To be implemented
        },
        {
          title: "Room / Doctor Info Requests",
          icon: <Stethoscope size={18} />,
          path: null, // To be implemented
        },
        {
          title: "Lost & Found Management",
          icon: <FileText size={18} />,
          path: null, // To be implemented
        },
        {
          title: "Announcements",
          icon: <Megaphone size={18} />,
          path: null, // To be implemented
        },
      ],
    },
    {
      title: "Reports",
      icon: <ClipboardList size={20} />,
      menuKey: "reports",
      items: [
        {
          title: "Daily Appointments Report",
          icon: <FileText size={18} />,
          path: "/receptionist/reports/appointments",
        },
        {
          title: "Daily Billing Report",
          icon: <FileText size={18} />,
          path: "/receptionist/reports/billing",
        },
        {
          title: "New Patient Registrations",
          icon: <FileText size={18} />,
          path: "/receptionist/reports/patient-registrations",
        }
      ],
    },
    {
      title: "Profile / Settings",
      icon: <UserCircle2 size={20} />,
      menuKey: "profile",
      items: [
        {
          title: "My Profile",
          icon: <UserCircle2 size={18} />,
          path: "/receptionist/profile",
        },
        {
          title: "Change Password",
          icon: <KeyRound size={18} />,
          path: "/receptionist/settings",
        },
        {
          title: "Logout",
          icon: <LogOut size={18} />,
          path: "/",
          action: handleLogout,
        },
      ],
    }

  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen p-6 overflow-y-auto fixed shadow-2xl border-r border-slate-700">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white text-center">Hospital Reception Dashboard</h1>
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      </div>

      {/* Menu Groups */}
      <div className="space-y-1">
        {menuGroups.map((group, groupIndex) => (
          <MenuGroup
            key={groupIndex}
            title={group.title}
            icon={group.icon}
            menuKey={group.menuKey}
            items={group.items}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            onItemClick={handleMenuItemClick}
          />
        ))}
      </div>
    </div>
  );
};

const MenuGroup = ({ title, icon, menuKey, items, openMenu, toggleMenu, onItemClick }) => {
  const isOpen = openMenu === menuKey;

  return (
    <div className="mb-2">
      <button
        onClick={() => toggleMenu(menuKey)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isOpen
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
          }`}
      >
        <span className="flex items-center gap-3">
          <span className={isOpen ? "text-blue-400" : "text-slate-400"}>{icon}</span>
          <span className="font-medium text-sm">{title}</span>
        </span>
        {isOpen ? (
          <ChevronDown size={18} className="text-slate-400" />
        ) : (
          <ChevronRight size={18} className="text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-700 pl-4">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  onItemClick(item.path);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${item.path
                ? "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                : "text-slate-500 cursor-not-allowed"
                }`}
              disabled={!item.path && !item.action}
            >
              <span className="text-slate-400">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecepSidebar;
