import React from 'react'
import { Outlet } from 'react-router-dom'
import RecepSidebar from './RecepSidebar'

function ReceptionLayout() {
  return (
    <div className="flex">
      <RecepSidebar />
      <div className="flex-1 ml-72 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default ReceptionLayout
