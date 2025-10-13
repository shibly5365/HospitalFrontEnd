import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../../../Units/notification";

// generate time options (30 min intervals)
const generateTimeOptions = () => {
  const times = [];
  for (let h = 7; h <= 20; h++) {
    for (let m of [0, 30]) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};
const timeOptions = generateTimeOptions();

const DoctorSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState(30); // default 30 mins
  const [generatedSlots, setGeneratedSlots] = useState([]);

  // ================= Fetch schedules =================
  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:4002/api/doctor/getschedule", {
        withCredentials: true,
      });
      setSchedules(res.data.schedules || []);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setSchedules([]);
      notify.error("Failed to load schedules");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ================= Delete schedule API =================
  const deleteSchedule = async (scheduleId) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`http://localhost:4002/api/doctor/schedule/delete/${scheduleId}`, {
        withCredentials: true,
      });
      notify.success("Schedule deleted successfully!");
      fetchSchedules();
    } catch (err) {
      console.error("Failed to delete schedule:", err);
      notify.error("Failed to delete schedule");
    }
  };

  // ================= Slot Generator (Frontend) =================
  const generateSlots = () => {
    if (!startTime || !endTime || !slotDuration) {
      return notify.error("Select start, end, and duration");
    }

    let slots = [];
    let [sh, sm] = startTime.split(":").map(Number);
    let [eh, em] = endTime.split(":").map(Number);

    let start = new Date();
    start.setHours(sh, sm, 0, 0);

    let end = new Date();
    end.setHours(eh, em, 0, 0);

    let current = new Date(start);

    while (current < end) {
      let slotStart = new Date(current);
      let slotEnd = new Date(current.getTime() + slotDuration * 60000);
      if (slotEnd > end) break;

      slots.push({
        start: slotStart.toTimeString().slice(0, 5),
        end: slotEnd.toTimeString().slice(0, 5),
      });

      current = slotEnd;
    }

    setGeneratedSlots(slots);
  };

  // ================= Submit schedule =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) return notify.error("Select a date first");
    if (!generatedSlots.length) return notify.error("Generate slots first");

    const doctorId = "YOUR_DOCTOR_ID"; // replace with logged-in doctorId

    try {
      const payload = {
        doctorId,
        selectedDates: [selectedDate],
        workingHours: { start: startTime, end: endTime },
        slots: generatedSlots,
      };

      await axios.post("http://localhost:4002/api/doctor/schedule", payload, {
        withCredentials: true,
      });

      notify.success("Schedule saved successfully!");
      setSelectedDate("");
      setStartTime("");
      setEndTime("");
      setGeneratedSlots([]);
      fetchSchedules();
    } catch (err) {
      console.error("Error saving schedule:", err);
      notify.error("Failed to save schedule");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Doctor Schedule (Auto Slot Generator)
      </h2>

      {/* Form to add new schedule */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white shadow rounded p-5"
      >
        <label className="block mb-2 font-medium">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 mb-4 rounded w-full"
        />

        <div className="flex gap-4 mb-4">
          {/* Start Time */}
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Start Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* End Time */}
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">End Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* Slot Duration */}
          <select
            value={slotDuration}
            onChange={(e) => setSlotDuration(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>1 hour</option>
          </select>
        </div>

        <button
          type="button"
          onClick={generateSlots}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Generate Slots
        </button>

        {/* Display generated slots */}
        <div className="mt-4 flex flex-wrap gap-2">
          {generatedSlots.map((slot, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm shadow-sm"
            >
              {slot.start} - {slot.end}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          Save Schedule
        </button>
      </form>

      {/* Existing schedules */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Schedules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(schedules) &&
            schedules.map((doc) => (
              <div
                key={doc._id}
                className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-blue-600 mb-1">
                    {doc.dayName}
                  </h4>
                  <p className="text-gray-500 mb-3">
                    {new Date(doc.date).toISOString().split("T")[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {doc.slots?.map((slot) => (
                      <span
                        key={slot._id}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm shadow-sm"
                      >
                        {slot.start} - {slot.end}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteSchedule(doc._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Schedule
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedules;
