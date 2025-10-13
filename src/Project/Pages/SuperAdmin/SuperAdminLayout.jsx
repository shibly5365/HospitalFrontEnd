import React from 'react'
import SuperAdminSidebar from './SuperAdminSidebar'
import { Outlet } from 'react-router-dom'

function SuperAdminLayout() {
  return (
        <div className="flex">
      <SuperAdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet
         />
      </div>
    </div>
  )
}

export default SuperAdminLayout
