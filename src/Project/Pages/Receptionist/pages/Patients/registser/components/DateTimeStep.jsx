import React from "react";
import { Calendar } from "lucide-react";

const DateTimeStep = ({
  availableDates,
  selectedDate,
  onSelectDate,
  availableSlots,
  selectedSlot,
  onSelectSlot,
  consultationType,
  onSetConsultationType,
  reason,
  onSetReason,
  selectedDoctor
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Date & Time</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Dates
          </label>
          <select
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!selectedDoctor}
          >
            <option value="">Select Date</option>
            {availableDates.map((d) => (
              <option key={d._id} value={d.date}>
                {new Date(d.date).toLocaleDateString()} ({d.dayName})
              </option>
            ))}
          </select>
        </div>

        {availableSlots.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-3">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className={`p-3 border-2 rounded-lg font-medium transition ${
                    selectedSlot?.start === slot.start
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consultation Type
          </label>
          <select
            value={consultationType}
            onChange={(e) => onSetConsultationType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit
          </label>
          <textarea
            value={reason}
            onChange={(e) => onSetReason(e.target.value)}
            rows="3"
            placeholder="Enter reason for consultation..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimeStep;