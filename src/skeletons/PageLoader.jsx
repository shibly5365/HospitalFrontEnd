// components/skeletons/PageLoader.jsx

import { useLocation } from "react-router-dom";

import AdminSkeleton from "./AdminSkeleton";
import DoctorSkeleton from "./DoctorSkeleton";
import PatientSkeleton from "./SkeletonBase";
import ReceptionistSkeleton from "./ReceptionistSkeleton";

const PageLoader = () => {
  const location = useLocation();

  const path = location.pathname;

  // Admin
  if (path.startsWith("/admin")) {
    return <AdminSkeleton />;
  }

  // Doctor
  if (path.startsWith("/doctors")) {
    return <DoctorSkeleton />;
  }

  // Receptionist
  if (path.startsWith("/receptionist")) {
    return <ReceptionistSkeleton />;
  }

  // Patient
  if (path.startsWith("/patient")) {
    return <PatientSkeleton />;
  }

  // Default
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
      Loading Medical Care Pro...
    </div>
  );
};

export default PageLoader;
