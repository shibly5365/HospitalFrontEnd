import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, X, Save, AlertCircle } from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function  RescheduleAppointment({ appointment, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => { 
    if (appointment && appointment.doctorInfo) {
      // Set minimum date to today
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    }
  }, [appointment]);

  useEffect(() => {
    if (selectedDate && appointment?.doctorInfo) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    if (!appointment) return;

    try {
      setLoadingSlots(true);
      // Extract doctor ID from appointment
      const doctorId = appointment.doctor?._id || appointment.doctorId;

      if (!doctorId) {
        notify.error("Doctor information not available");
        return;
      }

      const res = await axios.get(
        `http://localhost:4002/api/receptionist/doctor/${doctorId}/slots`,
        {
          params: { date: selectedDate },
          withCredentials: true,
        }
      );

      // Handle different response formats
      if (res.data.availableSlots) {
        setAvailableSlots(res.data.availableSlots);
      } else if (res.data.data && res.data.data.availableSlots) {
        setAvailableSlots(res.data.data.availableSlots);
      } else if (res.data.success && res.data.data && res.data.data.availableSlots) {
        setAvailableSlots(res.data.data.availableSlots);
      } else {
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      notify.error("Failed to load available slots");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedSlot) {
      notify.error("Please select a date and time slot");
      return;
    }

    if (!appointment?._id) {
      notify.error("Appointment information missing");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:4002/api/receptionist/reschudle/${appointment._id}`,
        {
          newDate: selectedDate,
          newSlot: selectedSlot,
        },
        { withCredentials: true }
      );

      if (res.data) {
        notify.success("Appointment rescheduled successfully!");
        if (onSuccess) onSuccess(res.data.appointment);
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
      notify.error(err.response?.data?.message || "Failed to reschedule appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar size={24} />
            <h2 className="text-2xl font-bold">Reschedule Appointment</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Appointment Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle size={18} />
              Current Appointment
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Patient:</span>{" "}
                {appointment.patientInfo?.fullName || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {appointment.doctorInfo?.fullName || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Current Date:</span>{" "}
                {appointment.appointmentDate
                  ? new Date(appointment.appointmentDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium">Current Time:</span>{" "}
                {appointment.timeSlot?.start && appointment.timeSlot?.end
                  ? `${appointment.timeSlot.start} - ${appointment.timeSlot.end}`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* New Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select New Date *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Available Slots */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Time Slot *
              </label>
              {loadingSlots ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading available slots...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-yellow-700">
                    No available slots for this date. Please select another date.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSlot?.start === slot.start && selectedSlot?.end === slot.end
                          ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                          : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock size={16} />
                        <span>
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleReschedule}
              disabled={loading || !selectedDate || !selectedSlot}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? "Rescheduling..." : "Reschedule Appointment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
