import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./PatientSidebar";
import { useState } from "react";

const PatientLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // check if current page is department details
  const isDepartmentDetails = location.pathname.startsWith("/patient/patient-departments/");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-64"
        } ${isOpen && "overflow-hidden md:overflow-auto"}`}
      >
        {/* Remove padding for details page */}
        <div className={`${isDepartmentDetails ? "" : "p-4 md:p-6"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;
