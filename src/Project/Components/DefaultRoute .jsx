import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const GuestRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // 🟢 Wait here too

  if (auth.isAuthenticated && auth.user) {
    switch (auth.user.role) {
      case "superadmin":
        return <Navigate to="/super-admin/super-admin-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/admin-dashboard" replace />;
      case "doctor":
        return <Navigate to="/doctors/doctors-dashboard" replace />;
      case "receptionist":
        return <Navigate to="/receptionist/receptionist-dashboard" replace />;
      case "patient":
        return <Navigate to="/patient/patient-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default GuestRoute;
