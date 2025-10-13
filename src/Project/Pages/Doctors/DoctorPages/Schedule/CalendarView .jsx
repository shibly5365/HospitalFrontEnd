import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const CalendarLeaveRequest = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "sick",
    description: "",
    duration: "Full Day",
  });

  // Fetch doctor's availability & approved leaves
  const fetchAvailability = async () => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const res = await axios.get(
        `http://localhost:4002/api/doctor/availability?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      console.log("Full response:", res.data);

      // Ensure availableDays exists and is an array
      const availableDays = Array.isArray(res.data.availableDays)
        ? res.data.availableDays
        : [];

      const calendarEvents = availableDays.map((date, index) => ({
        id: index + 1,
        title: "Available",
        start: date,
        end: date,
        color: "green",
      }));

      setEvents(calendarEvents);
    } catch (err) {
      console.error("Error fetching availability:", err);
      setEvents([]); // fallback: empty calendar
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleSubmitLeave = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!leaveForm.description.trim()) {
      alert("Please add a description");
      return;
    }

    const payload = {
      startDate: selectedDate,
      endDate: selectedDate,
      type: leaveForm.type,
      description: leaveForm.description,
      duration: leaveForm.duration,
    };

    try {
      const res = await axios.post(
        "http://localhost:4002/api/doctor/leave",
        payload,
        { withCredentials: true }
      );

      // Optimistic update: show pending leave immediately
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: prevEvents.length + 1,
          title: "Pending Leave",
          start: selectedDate,
          end: selectedDate,
          color: "orange",
        },
      ]);

      setLeaveForm({ type: "sick", description: "", duration: "Full Day" });
      setSelectedDate(null);
      setShowModal(false);

      console.log("Leave submitted:", res.data.leave);
    } catch (err) {
      console.error("Error submitting leave:", err);
      alert(err.response?.data?.message || "Error submitting leave");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Doctor Calendar & Leave Request
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={(info) => alert(`Event: ${info.event.title}`)}
      />

      {showModal && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-96 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Request Leave
            </h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm">
                Leave Type
                <select
                  name="type"
                  value={leaveForm.type}
                  onChange={handleFormChange}
                  className="w-full border p-2 mt-1 rounded"
                >
                  <option value="sick">Sick</option>
                  <option value="casual">Casual</option>
                </select>
              </label>

              <label className="block mb-2 text-sm">
                Description
                <textarea
                  name="description"
                  value={leaveForm.description}
                  onChange={handleFormChange}
                  placeholder="Enter reason"
                  className="w-full border p-2 mt-1 rounded resize-none"
                />
              </label>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 mr-2">
                <label className="block text-sm font-medium mb-1">
                  Selected Date
                </label>
                <input
                  type="text"
                  value={selectedDate}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div className="flex-1 ml-2">
                <label className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <select
                  name="duration"
                  value={leaveForm.duration}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="Full Day">Full Day</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitLeave}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarLeaveRequest;
