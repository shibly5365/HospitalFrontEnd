import { apiClient } from "../../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, Activity } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RescheduleModal({ open, onClose, appointment, onSave }) {

  
const [form, setForm] = useState({
  date: null,
  time: "",     // start time
  slotEnd: "",  // end time
  status: "",
  reason: "",
});


  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // -----------------------------------
  // SET DEFAULT VALUES WHEN APPOINTMENT OPENS
  // -----------------------------------
  useEffect(() => {
    if (!appointment) return;

    const currentDate = appointment?.date ? new Date(appointment.date) : null;

    setForm({
      date: currentDate,
      time: appointment?.timeSlot?.start || "",
      status: appointment?.status || "Pending",
      reason: appointment?.reason || "",
    });

     if (currentDate) fetchSlots(currentDate);
  }, [appointment]);

  // -----------------------------------
  // FETCH AVAILABLE DATES
  // -----------------------------------
  const fetchAvailableDates = async () => {
    if (!appointment?.doctor) return;

    try {
      const doctorId =
        appointment.doctor._id ||
        appointment.doctor.id ||
        appointment.doctor;

      const res = await apiClient.get(
        `/patient/doctor/${doctorId}/available-dates`,
        { withCredentials: true }
      );

      // SAFE CHECK to avoid crashes
      const dates = res.data?.availableDates;

      if (!Array.isArray(dates)) {
        console.warn("Backend did not return availableDates:", res.data);
        setAvailableDates([]); // avoid crash
        return;
      }

      const formatted = dates.map((d) => new Date(d));
      setAvailableDates(formatted);
    } catch (err) {
      console.error("Error fetching available dates:", err);
      setAvailableDates([]);
    }
  };

  // -----------------------------------
  // FETCH SLOTS FOR SELECTED DATE
  // -----------------------------------
  const fetchSlots = async (date) => {
    if (!appointment?.doctor || !date) return;

    try {
      setLoadingSlots(true);

      const doctorId =
        appointment.doctor.id ||
        appointment.doctor.id ||
        appointment.doctor;

      console.log(doctorId);

      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const res = await apiClient.get(
        `/patient/doctor/${doctorId}/slots`,
        {
          withCredentials: true,
          params: { date: formattedDate },
        }
      );
      console.log("fdsres", res.data);


      setSlots(res.data.availableSlots || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      date,
      time: "",
    }));
    fetchSlots(date);
  };

  if (!open) return null;

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  console.log("from",form);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6" /> Edit Appointment
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" /> Appointment Date
              </label>

              <DatePicker
                selected={form.date}
                onChange={handleDateChange}
                onFocus={fetchAvailableDates}
                includeDates={availableDates}

                // NEW LINES
                minDate={new Date()}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}

                className="w-full border-2 border-blue-100 rounded-xl p-3 bg-gradient-to-br from-blue-50 to-white shadow-sm"
                placeholderText="Select Date"
              />

            </div>

            {/* Time Slots */}
{/* Time Slots */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
    <Clock className="w-4 h-4 text-blue-600" /> Time Slot
  </label>

  <div className="border-2 border-blue-100 rounded-xl p-3 bg-gradient-to-br from-blue-50 to-white shadow-sm min-h-[52px]">
    {loadingSlots ? (
      <span className="text-gray-600">Loading...</span>
    ) : slots.length === 0 ? (
      <span className="text-gray-500">No Slots</span>
    ) : (
      <select
        value={form.time}
        onChange={(e) => {
          const selected = slots.find(s => s.start === e.target.value);
          setForm((prev) => ({
            ...prev,
            time: selected?.start || "",
            slotEnd: selected?.end || "",
          }));
        }}
        className="w-full bg-transparent font-medium text-gray-800 outline-none"
      >
        <option value="">Select Slot</option>
        {slots.map((slot) => (
          <option
            key={slot._id}
            value={slot.start}
            disabled={slot.isBooked}
          >
            {slot.start} - {slot.end} {slot.isBooked ? "(Booked)" : ""}
          </option>
        ))}
      </select>
    )}
  </div>
</div>

          </div>

          {/* Status */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" /> Status
            </label>
            <div
              className={`border-2 rounded-xl p-3.5 shadow-sm font-semibold ${getStatusColor(
                form.status
              )}`}
            >
              {form.status}
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Reason for Visit
            </label>
            <div className="border-2 border-blue-100 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white min-h-[90px] shadow-sm">
              <p className="text-gray-700">{form.reason}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-5 border-t-2 border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold shadow-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
