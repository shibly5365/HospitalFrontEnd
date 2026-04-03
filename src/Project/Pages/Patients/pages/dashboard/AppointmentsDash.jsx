import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { notify } from "../../../../../Units/notification";
import RescheduleModal from "./RescheduleModal";
import VideoCallModal from "./VideoCallModal";

export default function Appointments({ isVisible }) {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4002/api/patient/dashboard",
          { withCredentials: true }
        );

        const upcoming = data?.appointments?.upcoming || [];

        // compute today's date in same format as returned by the backend (MM/DD/YYYY)
        const pad = (n) => String(n).padStart(2, "0");
        const now = new Date();
        const todayStr = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()}`;

        const todays = upcoming.filter((a) => a.date === todayStr);

        const pending = upcoming
          .filter(a => a.status?.toLowerCase() === "pending")
          .slice(0, 3);

        const confirmed = upcoming
          .filter(a => a.status?.toLowerCase() === "confirmed")
          .slice(0, 3 - pending.length);

        setAppointments([...pending, ...confirmed]);
        setTodayAppointments(todays);
      } catch {
        notify.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 check if join allowed
  const canJoin = (a) => {
    if (!a.timeSlot?.start || a.status?.toLowerCase() !== "confirmed") return false;
    const diffMinutes =
      (new Date(`${a.date}T${a.timeSlot.start}`) - new Date()) / 60000;
    return diffMinutes >= -30 && diffMinutes <= 30;
  };

  // 🔹 check online appointment
  const isOnlineAppointment = (a) =>
    a?.mode?.toLowerCase() === "online" || a?.consultationType?.toLowerCase() === "online"; // check both fields
  const canShowVideoCallButton = (a) =>
    a?.status?.toLowerCase() === "confirmed" && isOnlineAppointment(a);

  // 🎥 Handle Video Call Button Click
  const handleVideoCallClick = async (appointment) => {
    if (!canJoin(appointment)) {
      notify.error("Video call can only be joined 30 minutes before or after appointment time");
      return;
    }

    setSelectedAppt(appointment);
    setShowVideoCallModal(true);
  };

  // 🎥 Handle Call End
  const handleCallEnd = () => {
    setShowVideoCallModal(false);
    setSelectedAppt(null);
    // Refresh appointments after call ends
    setAppointments(prev =>
      prev.map(a =>
        a._id === selectedAppt._id ? { ...a, status: "Completed" } : a
      )
    );
  };

  const getStatusDisplay = (a) => {
    const status = a.status?.toLowerCase();

    const statusConfig = {
      cancelled: {
        text: "Cancelled",
        color: "text-red-600",
        bg: "bg-red-50",
        dot: "bg-red-400",
      },
      pending: {
        text: "Pending",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        dot: "bg-yellow-400",
      },
      confirmed: canJoin(a)
        ? {
          text: "Join Now",
          color: "text-green-600",
          bg: "bg-green-50",
          dot: "bg-green-400",
        }
        : {
          text: "Confirmed",
          color: "text-blue-600",
          bg: "bg-blue-50",
          dot: "bg-blue-400",
        },
    };

    return (
      statusConfig[status] || {
        text: "Scheduled",
        color: "text-gray-600",
        bg: "bg-gray-50",
        dot: "bg-gray-400",
      }
    );
  };

  const confirmCancel = (id) => {
    console.log('cancleId',id);
    
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-xl shadow-xl border w-80">
          <p className="text-gray-800 font-medium mb-3">
            Cancel this appointment?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              No
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.put(
                    `http://localhost:4002/api/patient/cancel/${id}`,
                    {},
                    { withCredentials: true }
                  );
                  setAppointments(prev =>
                    prev.map(a =>
                      a._id === id ? { ...a, status: "cancelled" } : a
                    )
                  );
                  notify.success("Appointment cancelled");
                } catch {
                  notify.error("Cancel failed");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Yes
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleReschedule = async (updated) => {
    if (!updated.date || !updated.time || !updated.slotEnd) {
      notify.error("Please select date & time");
      return;
    }

    const formatDate = (d) =>
      `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getDate()
      ).padStart(2, "0")}/${d.getFullYear()}`;

    console.log("slecteapp", selectedAppt);

    try {
      await axios.put(
        `http://localhost:4002/api/patient/reschedule/${selectedAppt.id}`,
        {
          appointmentDate: formatDate(updated.date),
          timeSlot: { start: updated.time, end: updated.slotEnd },
          reason: updated.reason,
        },
        { withCredentials: true }
      );

      setAppointments(prev =>
        prev.map(a =>
          a.id === selectedAppt.id
            ? {
              ...a,
              appointmentDate: formatDate(updated.date),
              timeSlot: { start: updated.time, end: updated.slotEnd },
              reason: updated.reason,
              status: "Pending",
            }
            : a
        )
      );

      notify.success("Appointment updated!");
      setShowModal(false);
    } catch (err) {
      notify.error(err?.response?.data?.message || "Update failed!");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border text-center text-gray-500">
        Loading appointments...
      </div>
    );
  }

  return (
    <>
      <RescheduleModal
        open={showModal}
        appointment={selectedAppt}
        onClose={() => setShowModal(false)}
        onSave={handleReschedule}
      />

      <VideoCallModal
        open={showVideoCallModal}
        appointment={selectedAppt}
        onClose={() => setShowVideoCallModal(false)}
        onCallEnd={handleCallEnd}
      />

      <div
        className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Appointments</h2>

        {todayAppointments.length === 0 ? (
          <p className="text-gray-500 text-center mb-4">No appointments for today.</p>
        ) : (
          <div className="space-y-3 mb-6">
            {todayAppointments.map((a) => (
              <div
                key={a._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
              >
                <div>
                  <h3 className="font-semibold">Dr {a?.doctor?.name || "Unknown"}</h3>
                  <p className="text-sm text-gray-600">{a.date} • {a.timeSlot?.start} - {a.timeSlot?.end}</p>
                </div>

                <div className="flex gap-2 items-center">
                  {canShowVideoCallButton(a) ? (
                    canJoin(a) ? (
                      <button
                        onClick={() => handleVideoCallClick(a)}
                        className="px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                      >
                        📹 Video Call
                      </button>
                    ) : (
                      <button disabled className="px-3 py-1 text-sm font-semibold text-purple-400 bg-purple-50 rounded-lg border cursor-not-allowed">📹 Video Call</button>
                    )
                  ) : (
                    <button disabled className="px-3 py-1 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg border cursor-not-allowed">📹 Video Call</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center">No upcoming appointments.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a, i) => {
              const status = getStatusDisplay(a);
              const isCancelled = a.status?.toLowerCase() === "cancelled";

              return (
                <div
                  key={a._id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border"
                >
                  <div>
                    <h3 className="font-semibold">
                      Dr {a?.doctor?.name || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {a.date} • {a.timeSlot?.start} - {a.timeSlot?.end}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    {/* 🎥 VIDEO CALL BUTTON */}
                    {canShowVideoCallButton(a) ? (
                      canJoin(a) ? (
                        <button
                          onClick={() => handleVideoCallClick(a)}
                          className="px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                          📹 Video Call
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1 text-sm font-semibold text-purple-400 bg-purple-50 rounded-lg border cursor-not-allowed"
                        >
                          📹 Video Call
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="px-3 py-1 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg border cursor-not-allowed"
                      >
                        📹 Video Call
                      </button>
                    )}

                    {!isCancelled && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedAppt(a);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg"
                        >
                          Reschedule
                        </button>

                        <button
                          onClick={() => confirmCancel(a.id)}
                          className="px-3 py-1 text-sm text-red-600 bg-red-50 rounded-lg"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
