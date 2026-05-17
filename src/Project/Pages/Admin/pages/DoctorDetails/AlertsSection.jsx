import React from "react";
import AlertCard from "./AlertCard";

const AlertsSection = ({
  attendancePercentage,
  patientsThisMonth,
  totalLeavesTaken,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {attendancePercentage < 75 && attendancePercentage > 0 && (
        <AlertCard
          type="warning"
          message="⚠️ Low attendance alert: Below 75% this month"
        />
      )}
      {patientsThisMonth > 150 && (
        <AlertCard
          type="error"
          message="📊 High patient load: 150+ patients this month"
        />
      )}
      {totalLeavesTaken > 10 && (
        <AlertCard
          type="info"
          message="📅 High leave count: More than 10 leaves this year"
        />
      )}
    </div>
  );
};

export default AlertsSection;