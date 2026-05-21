import { apiClient } from "../../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, Activity } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RescheduleModal({
  open,
  onClose,
  appointment,
  onSave,
}) {
  const [form, setForm] = useState({
    date: null,
    time: "",
    slotEnd: "",
    status: "",
    reason: "",
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!appointment) return;

    const currentDate = appointment?.date ? new Date(appointment.date) : null;

    setForm({
      date: currentDate,
      time: appointment?.timeSlot?.start || "",
      slotEnd: appointment?.timeSlot?.end || "",
      status: appointment?.status || "Pending",
      reason: appointment?.reason || "",
    });

    if (currentDate) {
      fetchSlots(currentDate);
    }
  }, [appointment]);

  // -----------------------------------
  // FETCH AVAILABLE DATES
  // -----------------------------------

  const fetchAvailableDates = async () => {
    if (!appointment?.doctor) return;

    try {
      const doctorId =
        appointment.doctor._id || appointment.doctor.id || appointment.doctor;

      const res = await apiClient.get(
        `/patient/doctor/${doctorId}/available-dates`,
        {
          withCredentials: true,
        },
      );

      const dates = res.data?.availableDates;

      if (!Array.isArray(dates)) {
        setAvailableDates([]);
        return;
      }

      const formatted = dates.map((d) => new Date(d));

      setAvailableDates(formatted);
    } catch (err) {
      console.error(err);
      setAvailableDates([]);
    }
  };

  // -----------------------------------
  // FETCH SLOTS
  // -----------------------------------

  const fetchSlots = async (date) => {
    if (!appointment?.doctor || !date) return;

    try {
      setLoadingSlots(true);

      const doctorId =
        appointment.doctor._id || appointment.doctor.id || appointment.doctor;

      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const res = await apiClient.get(`/patient/doctor/${doctorId}/slots`, {
        withCredentials: true,
        params: {
          date: formattedDate,
        },
      });

      setSlots(res.data.availableSlots || []);
    } catch (err) {
      console.error(err);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // -----------------------------------
  // HANDLE DATE CHANGE
  // -----------------------------------

  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      date,
      time: "",
      slotEnd: "",
    }));

    fetchSlots(date);
  };

  // -----------------------------------
  // STATUS COLORS
  // -----------------------------------

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",

      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",

      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
      colors[status?.toLowerCase()] ||
      "theme-soft theme-text border theme-border"
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="theme-card rounded-2xl shadow-2xl w-[90%] max-w-lg overflow-hidden">
        {/* HEADER */}

        <div className="theme-brand-bg p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Edit Appointment
          </h2>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-all"
          >
            ×
          </button>
        </div>

        {/* BODY */}

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* DATE */}

            <div>
              <label className="block text-sm font-semibold theme-text mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 theme-brand" />
                Appointment Date
              </label>

              <DatePicker
                selected={form.date}
                onChange={handleDateChange}
                onFocus={fetchAvailableDates}
                includeDates={availableDates}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
                className="
                  w-full
                  rounded-xl
                  p-3
                  outline-none
                  theme-card
                "
                placeholderText="Select Date"
              />
            </div>

            {/* SLOT */}

            <div>
              <label className="block text-sm font-semibold theme-text mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 theme-brand" />
                Time Slot
              </label>

              <div className="theme-soft border theme-border rounded-xl p-3 min-h-[52px]">
                {loadingSlots ? (
                  <span className="theme-text-muted">Loading...</span>
                ) : slots.length === 0 ? (
                  <span className="theme-text-muted">No Slots</span>
                ) : (
                  <select
                    value={form.time}
                    onChange={(e) => {
                      const selected = slots.find(
                        (s) => s.start === e.target.value,
                      );

                      setForm((prev) => ({
                        ...prev,
                        time: selected?.start || "",
                        slotEnd: selected?.end || "",
                      }));
                    }}
                    className="
                      w-full
                      bg-transparent
                      outline-none
                      theme-text
                    "
                  >
                    <option value="">Select Slot</option>

                    {slots.map((slot) => (
                      <option
                        key={slot._id}
                        value={slot.start}
                        disabled={slot.isBooked}
                      >
                        {slot.start} - {slot.end}
                        {slot.isBooked ? " (Booked)" : ""}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="mb-5">
            <label className="block text-sm font-semibold theme-text mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 theme-brand" />
              Status
            </label>

            <div
              className={`
                border
                rounded-xl
                p-3.5
                font-semibold
                ${getStatusColor(form.status)}
              `}
            >
              {form.status}
            </div>
          </div>

          {/* REASON */}

          <div className="mb-6">
            <label className="block text-sm font-semibold theme-text mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 theme-brand" />
              Reason for Visit
            </label>

            <div className="theme-soft border theme-border rounded-xl p-4 min-h-[90px]">
              <p className="theme-text-muted">{form.reason}</p>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 pt-5 border-t theme-border">
            <button
              onClick={onClose}
              className="
                px-6 py-2.5
                rounded-xl
                border
                theme-border
                theme-text
                hover:bg-white/5
                font-semibold
              "
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              className="
                px-6 py-2.5
                rounded-xl
                text-white
                font-semibold
                theme-brand-bg
                hover:opacity-90
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
