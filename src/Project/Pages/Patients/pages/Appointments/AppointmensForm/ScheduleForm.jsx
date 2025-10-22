import React from "react";
import axios from "axios";
import { notify } from "../../../../../../Units/notification";

const Schedule = ({ formData, setFormData, availableDates, slots }) => {
    console.log("slots",slots);
    console.log("availableDates",availableDates.dates);
    
    
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setFormData({ ...formData, appointmentDate: date, timeSlot: "" });
    if (formData.doctor) {
      await fetchSlots(formData.doctor, date);
    }
  };

  const fetchSlots = async (doctorId, date) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}?date=${date}`,
        { withCredentials: true }
      );
      console.log("slots",res.data );
      
      if (res.data.success) {
        const allSlots = res.data.schedules.flatMap((sch) =>
          (sch.slots || []).map((slot) => ({ ...slot, date: sch.date }))
        );
        setFormData((prev) => ({ ...prev, slots: allSlots }));
      }
    } catch (err) {
      console.log(err);
      notify.error("Failed to fetch slots");
    }
  };

  return (
    <>
      {availableDates.dates && availableDates.dates.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            Appointment Day *
          </label>
          <select
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleDateChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Day</option>
            {availableDates.dates.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      )}

      {slots && slots.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            Available Time Slots *
          </label>
          <select
            name="timeSlot"
            value={formData.timeSlot ? formData.timeSlot.start : ""}
            onChange={(e) => {
              const selected = slots.find(
                (s) =>
                  s.start === e.target.value &&
                  new Date(s.date).toISOString().split("T")[0] ===
                    formData.appointmentDate
              );
              if (selected) setFormData({ ...formData, timeSlot: selected });
            }}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">
              {formData.appointmentDate ? "Select Slot" : "Select a date first"}
            </option>
            {formData.appointmentDate &&
              slots
                .filter(
                  (slot) =>
                    new Date(slot.date).toISOString().split("T")[0] ===
                    formData.appointmentDate
                )
                .map((slot, i) => (
                  <option key={i} value={slot.start} disabled={slot.isBooked}>
                    {slot.start} - {slot.end} {slot.isBooked ? "(Booked)" : ""}
                  </option>
                ))}
          </select>
        </div>
      )}
    </>
  );
};

export default Schedule;
