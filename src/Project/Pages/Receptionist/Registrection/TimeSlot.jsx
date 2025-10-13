import React, { useEffect, useState } from "react";

const TimeSlot = ({ selectedDoctor, onNext, onBack }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDoctor) return;

    setLoading(true);
    setError("");

    fetch(
      `http://localhost:4002/api/receptionist/getschedule/${selectedDoctor}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.schedules)) {
          setSchedules(data.schedules);
        } else {
          setSchedules([]);
          setError("No schedules available.");
        }
      })
      .catch(() => setError("Failed to fetch schedules."))
      .finally(() => setLoading(false));
  }, [selectedDoctor]);

  const filteredSchedule = schedules.find(
    (s) =>
      selectedDate &&
      new Date(s.date).toDateString() === new Date(selectedDate).toDateString()
  );

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Select Date & Time Slot</h2>

      {loading && <p className="text-gray-500">Loading schedules...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && schedules.length > 0 && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select a Date</h3>
            <div className="flex flex-wrap gap-3">
              {schedules.map((schedule) => (
                <button
                  key={schedule._id}
                  onClick={() => {
                    setSelectedDate(schedule.date);
                    setSelectedSlot(null);
                  }}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedDate === schedule.date
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {schedule.dayName} -{" "}
                  {new Date(schedule.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && filteredSchedule ? (
            <div>
              <h3 className="text-lg font-medium mb-2">Available Slots</h3>
              <div className="grid grid-cols-3 gap-4">
                {filteredSchedule.slots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => {
                      if (!slot.isBooked) {
                        const selected = {
                          scheduleId: filteredSchedule._id,
                          slotId: slot._id,
                          date: new Date(filteredSchedule.date)
                            .toISOString()
                            .split("T")[0], // YYYY-MM-DD
                          start: slot.start,
                          end: slot.end,
                        };

                        console.log("Selected slot date:", selected.date); // ✅ log the date
                        setSelectedSlot(selected);
                      }
                    }}
                    disabled={slot.isBooked}
                    className={`p-3 border rounded-lg transition ${
                      selectedSlot?.slotId === slot._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } ${
                      slot.isBooked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-blue-500"
                    }`}
                  >
                    {slot.start} - {slot.end}
                    <br />
                    <span
                      className={`text-sm ${
                        slot.isBooked ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {slot.isBooked ? "Booked" : "Available"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            selectedDate && <p className="text-gray-500">No slots available</p>
          )}
        </>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-lg text-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => onNext(selectedSlot)}
          disabled={!selectedSlot}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default TimeSlot;
