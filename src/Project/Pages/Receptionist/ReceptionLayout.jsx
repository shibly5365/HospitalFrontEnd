import React from 'react'
import { Outlet } from 'react-router-dom'
import RecepSidebar from './RecepSidebar'

function ReceptionLayout() {
  return (
        <div className="flex">
      <RecepSidebar />

      <div className="flex-1  bg-gray-100 min-h-screen">
        <Outlet
         />
      </div>
    </div>
  )
}

export default ReceptionLayout
