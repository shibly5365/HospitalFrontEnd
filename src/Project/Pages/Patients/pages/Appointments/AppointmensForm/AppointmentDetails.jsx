import React from "react";
import { Calendar, Clock } from "lucide-react";

const AppointmentDetails = ({ formData, onInputChange, incomingDoctor }) => {
  console.log("apd", formData);

  const convertTo24Hour = (timeStr) => {
  if (!timeStr) return "";
  const [time, modifier] = timeStr.split(" "); // "01:30 PM" => ["01:30", "PM"]
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold theme-text mb-6">Appointment Details</h2>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">Selected Doctor *</label>
        {incomingDoctor ? (
         <div className="p-3 theme-soft rounded-lg border theme-border">
            <p className="font-semibold">{incomingDoctor.name}</p>
            <p className="theme-text-muted">{incomingDoctor.title}</p>
          </div>
        ) : (
          <select
            value={formData.doctorId}
            onChange={(e) => onInputChange("doctorId", e.target.value)}
            className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          >
            <option value="">Choose a doctor</option>
          </select>
        )}
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">Department *</label>
        <input
          type="text"
          value={formData.department}
          onChange={(e) => onInputChange("department", e.target.value)}
          placeholder="Enter Department"
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
        />
      </div>

      {/* Consultation Type */}
      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">Consultation Type *</label>
        <select
          value={formData.consultationType}
          onChange={(e) => onInputChange("consultationType", e.target.value)}
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
        >
          <option value="">Select Type</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">
          <Calendar className="inline w-4 h-4 mr-1" />
          Appointment Date *
        </label>
        <input
          type="date"
          value={formData.appointmentDate}
          onChange={(e) => onInputChange("appointmentDate", e.target.value)}
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
        />
      </div>

      {/* Time Slot */}
<input
  type="time"
  value={convertTo24Hour(formData.timeSlot.start)}
  onChange={(e) =>
    onInputChange("timeSlot", { ...formData.timeSlot, start: e.target.value })
  }
  className="w-1/2 px-4 py-3 border rounded-lg"
/>
<input
  type="time"
  value={convertTo24Hour(formData.timeSlot.end)}
  onChange={(e) =>
    onInputChange("timeSlot", { ...formData.timeSlot, end: e.target.value })
  }
  className="w-1/2 px-4 py-3 border rounded-lg"
/>



      {/* Reason */}
      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">Reason for Visit *</label>
        <textarea
          value={formData.reason}
          onChange={(e) => onInputChange("reason", e.target.value)}
          rows="4"
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
        />
      </div>
    </div>
  );
};

export default AppointmentDetails;
