import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ roleRequired }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // 🟢 Wait until auth is checked

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired && auth.user?.role !== roleRequired) {
    return <Navigate to="/errorPage" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
