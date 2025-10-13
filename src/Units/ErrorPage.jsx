import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, LogOut, AlertTriangle } from "lucide-react";
import { notify } from "./notification";

const ErrorPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear localStorage
      localStorage.clear();

      // Clear all cookies
      clearAllCookies();

      notify.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } else {
      notify.info("Logout cancelled");
    }
  };

  const handleHome = () => {
    let path = "/";
    if (role === "superadmin") path = "/super-admin/super-admin-dashboard";
    else if (role === "admin") path = "/admin/admin-dashboard";
    else if (role === "doctor") path = "/doctors/doctors-dashboard";
    else if (role === "receptionist")
      path = "/receptioninst/receptioninst-dashboard";
    else if (role === "patient") path = "/patient/patient-dashboard";

    notify.info("Redirecting to home...");
    navigate(path, { replace: true }); // ✅ replaces ErrorPage in history
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6 animate-bounce" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-500 mb-8">
        The page you are looking for doesn’t exist or an error occurred.
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl shadow hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
