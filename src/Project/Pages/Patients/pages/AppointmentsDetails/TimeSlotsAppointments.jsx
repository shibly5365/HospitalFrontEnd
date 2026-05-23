import React from "react";

export default function TimeSlotsAppointments({
  selectedTime,
  onSelect,
  slots = [],
}) {
  console.log("Slots:", slots);

  // ✅ No slots
  if (!slots.length) {
    return <div className="text-gray-400 mt-2">No slots available</div>;
  }

  // ✅ Remove Lunch Break
  const filteredSlots = slots.filter(
    (slot) =>
      !(
        (slot.start === "13:00" && slot.end === "14:00") ||
        (slot.start === "1:00 PM" && slot.end === "2:00 PM")
      ),
  );

  if (!filteredSlots.length) {
    return <div className="text-gray-400 mt-2">No available slots</div>;
  }

  return (
    <div className="mt-3">
      {/* ✅ Slot Legends */}
      <div className="flex flex-wrap gap-4 text-xs mb-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-gray-600">Available</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-gray-600">Pending</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Confirmed</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="text-gray-600">Completed</span>
        </div>
      </div>

      {/* ✅ Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filteredSlots.map((slot) => {
          // ✅ Booking Status
          const bookingStatus = slot.bookingStatus || "Available";

          // ✅ Selected Slot
          const isSelected = selectedTime?._id === slot._id;

          // ✅ Disable Booked Slots
          const isUnavailable =
            bookingStatus === "Pending" ||
            bookingStatus === "Confirmed" ||
            bookingStatus === "Completed";

          // ✅ Default Style
          let slotClass =
            "bg-gray-100 text-gray-800 border-gray-200 hover:bg-purple-50";

          // 🟡 Pending
          if (bookingStatus === "Pending") {
            slotClass = "bg-yellow-400 text-white border-yellow-500";
          }

          // 🟢 Confirmed
          if (bookingStatus === "Confirmed") {
            slotClass = "bg-green-500 text-white border-green-600";
          }

          // 🟩 Completed
          if (bookingStatus === "Completed") {
            slotClass = "bg-red-600 text-white border-red-700";
          }

          // ✅ Friendly Status Label
          let statusLabel = "";

          if (bookingStatus === "Pending") {
            statusLabel = "Waiting Approval";
          }

          if (bookingStatus === "Confirmed") {
            statusLabel = "Booked";
          }

          if (bookingStatus === "Completed") {
            statusLabel = "Completed";
          }

          return (
            <button
              key={slot._id}
              disabled={isUnavailable}
              onClick={() => !isUnavailable && onSelect(slot)}
              className={`
                py-2 sm:py-3
                px-2 sm:px-3
                text-xs sm:text-sm
                rounded-xl
                border
                transition-all
                duration-200

                ${slotClass}

                ${isSelected ? "ring-2 ring-purple-600 scale-105" : ""}

                ${
                  isUnavailable
                    ? "cursor-not-allowed opacity-90"
                    : "cursor-pointer"
                }
              `}
            >
              <div className="flex flex-col items-center">
                {/* Time */}
                <span className="font-semibold">
                  {slot.start} - {slot.end}
                </span>

                {/* Status */}
                {bookingStatus !== "Available" && (
                  <span className="text-[10px] mt-1 tracking-wide">
                    {statusLabel}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
