import React from "react";
import TodaysAppointments from "../appoint/TodaysAppointments";
import UpcomingAppointments from "../appoint/UpcomingAppointments";
import DoctorAvailability from "../appoint/DoctorAvailability";
import Filters from "../appoint/Filters";
import AppointmentsTable from "../appoint/AppointmentsTable";


export default function TabContent({
  activeTab,
  appointments,
  filteredAppointments,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  openMenu,
  setOpenMenu,
  onViewDetails,
  onEdit,
  onCancel,
}) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "today":
        return (
          <TodaysAppointments
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onCancel={onCancel}
          />
        );

      case "upcoming":
        return (
          <UpcomingAppointments
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onCancel={onCancel}
          />
        );

      case "availability":
        return <DoctorAvailability />;

      case "all":
        return (
          <>
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
            />

            <AppointmentsTable
              appointments={filteredAppointments}
              openMenu={openMenu}
              onMenuToggle={setOpenMenu}
              onViewDetails={onViewDetails}
              onEdit={onEdit}
              onCancel={onCancel}
            />
          </>
        );

      default:
        return null;
    }
  };

  return renderTabContent();
}