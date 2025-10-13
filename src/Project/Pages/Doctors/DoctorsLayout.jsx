import React from "react";
import { Outlet } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";

function DoctorsLayout() {
  return (
    <div className="flex h-full w-screen">
      <DoctorSideBar />
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorsLayout;
