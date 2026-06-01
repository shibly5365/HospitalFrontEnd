import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarLeaveRequest = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "sick",
    description: "",
    duration: "Full Day",
  });

  // ================= FETCH DATA =================
  const fetchAvailability = async () => {
    try {
      const res = await apiClient.get(`/doctor/availability`, {
        withCredentials: true,
      });

      console.log("API DATA:", res.data);

      const availableDays = res.data.availableDays || [];
      const leaveDays = res.data.leaveDays || [];

      // ================= FILTER (CURRENT + NEXT MONTH) =================
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const nextMonthDate = new Date(currentYear, currentMonth, 1);
      const nextMonth = nextMonthDate.getMonth() + 1;
      const nextYear = nextMonthDate.getFullYear();

      // ================= AVAILABLE =================
      const availableEvents = availableDays
        .map((date) => {
          const d = new Date(date); // ✅ convert UTC → local

          return {
            original: date,
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            formatted: d.toISOString().split("T")[0],
          };
        })
        .filter((d) => {
          return (
            (d.month === currentMonth && d.year === currentYear) ||
            (d.month === nextMonth && d.year === nextYear)
          );
        })
        .map((d, index) => ({
          id: "avail-" + index,
          title: "Available",
          start: d.formatted,
          end: d.formatted,
          backgroundColor: "#16a34a",
          borderColor: "#16a34a",
        }));

      // ================= LEAVES =================
      const leaveEvents = leaveDays
        .filter((l) => {
          const [year, month] = l.date.split("-").map(Number);

          return (
            (month === currentMonth && year === currentYear) ||
            (month === nextMonth && year === nextYear)
          );
        })
        .map((l, index) => ({
          id: "leave-" + index,
          title: l.status === "pending" ? "Pending Leave" : "Approved Leave",
          start: l.date,
          end: l.date,
          backgroundColor: l.status === "pending" ? "#f59e0b" : "#ef4444",

          borderColor: l.status === "pending" ? "#f59e0b" : "#ef4444",
        }));

      // ================= MERGE =================
      // 🔥 REMOVE available days that have leave
      const filteredAvailable = availableEvents.filter(
        (avail) => !leaveEvents.some((leave) => leave.start === avail.start),
      );

      // 🔥 MERGE
      setEvents([...filteredAvailable, ...leaveEvents]);
    } catch (err) {
      console.error("Error fetching data:", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // ================= CLICK =================
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  // ================= SUBMIT =================
  const handleSubmitLeave = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!leaveForm.description.trim()) {
      alert("Please add a description");
      return;
    }

    // ❌ BLOCK DUPLICATE
    const alreadyExists = events.some(
      (e) =>
        (e.title === "Pending Leave" || e.title === "Approved Leave") &&
        e.start === selectedDate,
    );

    if (alreadyExists) {
      alert("Leave already requested for this date");
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
      await apiClient.post("/doctor/leave-request", payload, {
        withCredentials: true,
      });

      // ✅ refresh data
      await fetchAvailability();

      setLeaveForm({ type: "sick", description: "", duration: "Full Day" });
      setSelectedDate(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting leave:", err);
      alert(err.response?.data?.message || "Error submitting leave");
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] p-6 rounded-2xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          Doctor Calendar & Leave Request
        </h2>

        <p className="text-sm text-[var(--muted)] mt-1">
          Manage availability and request leave days
        </p>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        showNonCurrentDates={false}
        fixedWeekCount={false}
      />

      {showModal && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div
            className="
          bg-[var(--surface)]
          border border-[var(--line)]
          rounded-2xl
          p-6
          w-full max-w-md
          shadow-xl
        "
          >
            <h3
              className="
            text-xl font-semibold
            text-[var(--text)]
            text-center mb-6
          "
            >
              Request Leave
            </h3>

            <div className="space-y-4">
              {/* TYPE */}
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Leave Type
                </label>

                <select
                  name="type"
                  value={leaveForm.type}
                  onChange={handleFormChange}
                  className="
                  w-full
                  border border-[var(--line)]
                  bg-[var(--surface)]
                  text-[var(--text)]
                  rounded-xl
                  px-4 py-3
                  outline-none
                  focus:ring-2 focus:ring-[var(--brand)]
                "
                >
                  <option value="sick">Sick</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={leaveForm.description}
                  onChange={handleFormChange}
                  placeholder="Enter reason"
                  className="
                  w-full
                  border border-[var(--line)]
                  bg-[var(--surface)]
                  text-[var(--text)]
                  placeholder:text-[var(--muted)]
                  rounded-xl
                  px-4 py-3
                  resize-none
                  outline-none
                  focus:ring-2 focus:ring-[var(--brand)]
                "
                  rows={4}
                />
              </div>

              {/* DATE + DURATION */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-2">
                    Selected Date
                  </label>

                  <input
                    type="text"
                    value={selectedDate}
                    readOnly
                    className="
                    w-full
                    border border-[var(--line)]
                    bg-[var(--surface-soft)]
                    text-[var(--text)]
                    rounded-xl
                    px-4 py-3
                  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-2">
                    Duration
                  </label>

                  <select
                    name="duration"
                    value={leaveForm.duration}
                    onChange={handleFormChange}
                    className="
                    w-full
                    border border-[var(--line)]
                    bg-[var(--surface)]
                    text-[var(--text)]
                    rounded-xl
                    px-4 py-3
                    outline-none
                    focus:ring-2 focus:ring-[var(--brand)]
                  "
                  >
                    <option value="Full Day">Full Day</option>

                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="
                  px-5 py-2.5
                  rounded-xl
                  bg-[var(--surface-soft)]
                  text-[var(--text)]
                  hover:bg-[var(--line)]
                  transition
                "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitLeave}
                  className="
                  px-5 py-2.5
                  rounded-xl
                  bg-[var(--brand)]
                  text-white
                  hover:bg-[var(--brand-dark)]
                  transition
                "
                >
                  Request Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarLeaveRequest;
