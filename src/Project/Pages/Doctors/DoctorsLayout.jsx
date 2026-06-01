import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";

function DoctorsLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <DoctorSideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`
          flex-1 bg-gray-100 transition-all duration-300
          ${isOpen ? "lg:ml-72" : "lg:ml-20"}
        `}
      >
        <Outlet context={{ isOpen }} />
      </div>
    </div>
  );
}

export default DoctorsLayout;
