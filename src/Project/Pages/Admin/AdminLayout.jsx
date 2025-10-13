// AdminLayout.jsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      
        <AdminSidebar />


      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
