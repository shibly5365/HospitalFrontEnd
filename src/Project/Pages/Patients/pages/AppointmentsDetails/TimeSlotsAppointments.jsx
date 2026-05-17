import React from "react";

export default function TimeSlotsAppointments({ selectedTime, onSelect, slots = [] }) {
  console.log(selectedTime);
  
  
  if (!slots.length)
    return <div className="text-gray-400 mt-2">No slots available</div>;

  // Remove break time (1 PM to 2 PM)
  const filteredSlots = slots.filter(
    (slot) =>
      !(
        (slot.start === "13:00" && slot.end === "14:00") ||
        (slot.start === "1:00 PM" && slot.end === "2:00 PM")
      )
  );

  if (!filteredSlots.length)
    return <div className="text-gray-400 mt-2">No available slots</div>;

  return (
   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
      {filteredSlots.map((slot) => {
        
        // Make sure isBooked is boolean
        const isBooked =
          slot.isBooked === true ||
          slot.isBooked === "true" ||
          slot.isBooked === 1;

        const isSelected = selectedTime?._id === slot._id;

        return (
          <button
            key={slot._id}
            disabled={isBooked}
            onClick={() => !isBooked && onSelect(slot)}
            className={`
             py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm rounded-lg border transition

              ${isBooked
                ? "bg-red-500 text-white cursor-not-allowed opacity-70"
                : isSelected
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-purple-50"
              }
            `}
          >
            {slot.start} - {slot.end}
          </button>
        );
      })}
    </div>
  );
}
