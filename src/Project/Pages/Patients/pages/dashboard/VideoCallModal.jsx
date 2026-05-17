import React, { useEffect, useMemo, useRef, useState } from "react";
import { notify } from "../../../../../Units/notification";
import {
  createVideoCall,
  endVideoCall,
  getVideoCallStatus,
} from "../../../videoCallApi/videoCallApi";
import { useNavigate } from "react-router-dom";
import DoctorFeedbackModal from "../DoctorFeedbackModal";

const resolveRole = () => {
  const storedRole = (localStorage.getItem("role") || "").toLowerCase();

  // Your backend roles include doctor, patient etc.
  if (storedRole === "doctor" || storedRole === "patient") return storedRole;

  // fallback
  if (window.location.pathname.toLowerCase().includes("doctor"))
    return "doctor";
  return "patient";
};

export default function VideoCallModal({
  open,
  appointment,
  onClose,
  onCallEnd,
  role: roleProp,
}) {
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [canJoin, setCanJoin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const iframeRef = useRef(null);

  const navigate = useNavigate();

  // ✅ role always correct
  const role = useMemo(() => {
    if (roleProp) return roleProp.toLowerCase();
    return resolveRole();
  }, [roleProp]);

  const displayName = role === "doctor" ? "Doctor" : "Patient";

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setCallActive(false);
      setRoomId("");
      setCanJoin(false);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !appointment?._id) return;

    let mounted = true;

    const checkStatus = async () => {
      try {
        const res = await getVideoCallStatus(appointment._id, role);
        if (!mounted) return;

        const statusData = res?.data?.data || {};
        setCanJoin(Boolean(statusData.canJoin));
        setRoomId(statusData.roomId || "");
      } catch {
        if (mounted) {
          setCanJoin(false);
          setRoomId("");
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [open, appointment?._id, role]);

  if (!open || !appointment) return null;

  const handleStartCall = async () => {
    try {
      setLoading(true);

      const res = await createVideoCall(appointment._id, role);
      const data = res?.data?.data || {};

      setRoomId(data.roomId || "");
      setCanJoin(Boolean(data.canJoin));

      if (!data.roomId) {
        notify.error("You are not allowed to join this call yet.");
        return;
      }

      setCallActive(true);
      notify.success("Joined video call");
    } catch (err) {
      notify.error(
        err?.response?.data?.message || "Unable to start video call",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      setLoading(true);

      await endVideoCall(appointment._id, role);

      setCallActive(false);

      // ONLY FOR PATIENT
      if (role === "patient") {
        setShowFeedback(true);
      } else {
        if (onCallEnd) onCallEnd();
      }
    } catch (err) {
      notify.error(err?.response?.data?.message || "Unable to end call");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fullscreen Jitsi link
  const iframeSrc = roomId
    ? `https://meet.jit.si/${roomId}#userInfo.displayName="${displayName}"`
    : null;

  const doctorName =
    appointment?.doctor?.userId?.fullName ||
    appointment?.doctor?.fullName ||
    appointment?.doctor?.name ||
    "Doctor";

  const patientName =
    appointment?.patient?.fullName || appointment?.patient?.name || "Patient";

  const otherPersonName = role === "doctor" ? patientName : doctorName;

  // ✅ Prescription button only for doctor
  const showPrescriptionBtn = role === "doctor";

  const handleWritePrescription = () => {
    window.open(`/doctors/doctors-prescription/${appointment._id}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60">
      {/* FULL SCREEN WRAPPER */}
      <div className="w-full h-full bg-white flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {callActive ? "Video Call Active" : "Join Video Call"}
          </h2>

          {/* Close button only when not in call */}
          {!callActive && (
            <button
              onClick={onClose}
              className="text-3xl text-white hover:text-gray-200"
            >
              ×
            </button>
          )}
        </div>

        {/* BODY */}
        {!callActive ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center">
            <div className="w-full max-w-xl bg-white border rounded-2xl shadow-lg p-6">
              <p className="text-lg">
                Join video call with{" "}
                <span className="font-semibold">{otherPersonName}</span>
              </p>

              {!canJoin && !roomId && (
                <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    Waiting for doctor to start...
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-gray-200 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleStartCall}
                  disabled={loading || (!canJoin && !roomId)}
                  className={`rounded-lg px-6 py-2 text-white ${
                    loading || !canJoin
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {loading ? "Joining..." : "Join Call"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* VIDEO AREA (FULL HEIGHT) */}
            <div className="flex-1 bg-black">
              {iframeSrc ? (
                <iframe
                  ref={iframeRef}
                  title="Jitsi Video Call"
                  src={iframeSrc}
                  allow="camera; microphone; fullscreen; display-capture"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Connecting...
                </div>
              )}
            </div>

            {/* FOOTER ACTION BAR */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-white border-t">
              {/* Doctor extra button */}
              <div>
                {showPrescriptionBtn && (
                  <button
                    onClick={handleWritePrescription}
                    className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                  >
                    ✍️ Write Prescription
                  </button>
                )}
              </div>

              <button
                onClick={handleEndCall}
                disabled={loading}
                className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
              >
                End Call
              </button>
            </div>
          </div>
        )}
      </div>
      {/* ✅ ADD HERE */}
      {showFeedback && role === "patient" && (
        <DoctorFeedbackModal
          appointment={appointment}
          onClose={() => {
            setShowFeedback(false);

            if (onCallEnd) onCallEnd();
          }}
        />
      )}
    </div>
  );
}
