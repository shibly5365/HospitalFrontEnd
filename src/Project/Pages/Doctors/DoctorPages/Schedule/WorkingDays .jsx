import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WorkingDaysSlots = ({ onChange }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [slots, setSlots] = useState({}); // { Monday: [{start, end}], Tuesday: [...] }

  // Toggle day selection
  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      const updated = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      if (onChange) onChange(updated, slots);
      return updated;
    });
  };

  // Add new slot for a day
  const addSlot = (day) => {
    setSlots((prev) => {
      const daySlots = prev[day] || [];
      const updated = { ...prev, [day]: [...daySlots, { start: "", end: "" }] };
      if (onChange) onChange(selectedDays, updated);
      return updated;
    });
  };

  // Handle slot time change
  const handleSlotChange = (day, index, field, value) => {
    setSlots((prev) => {
      const daySlots = [...(prev[day] || [])];
      daySlots[index][field] = value;
      const updated = { ...prev, [day]: daySlots };
      if (onChange) onChange(selectedDays, updated);
      return updated;
    });
  };

  // Remove a slot
  const removeSlot = (day, index) => {
    setSlots((prev) => {
      const daySlots = [...(prev[day] || [])];
      daySlots.splice(index, 1);
      const updated = { ...prev, [day]: daySlots };
      if (onChange) onChange(selectedDays, updated);
      return updated;
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Working Days & Slots</h2>

      {/* Select Days */}
      <div className="flex gap-2 flex-wrap mb-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-4 py-2 rounded border ${
              selectedDays.includes(day) ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots for each selected day */}
      {selectedDays.map((day) => (
        <div key={day} className="mb-4 border p-3 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">{day}</h3>

          {(slots[day] || []).map((slot, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <input
                type="time"
                value={slot.start}
                onChange={(e) => handleSlotChange(day, index, "start", e.target.value)}
                className="border p-1 w-24"
              />
              <span>-</span>
              <input
                type="time"
                value={slot.end}
                onChange={(e) => handleSlotChange(day, index, "end", e.target.value)}
                className="border p-1 w-24"
              />
              <button
                onClick={() => removeSlot(day, index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addSlot(day)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add Slot
          </button>
        </div>
      ))}

    </div>
  );
};

export default WorkingDaysSlots;
