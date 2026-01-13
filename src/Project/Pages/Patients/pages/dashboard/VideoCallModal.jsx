import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { notify } from "../../../../../Units/notification";

export default function VideoCallModal({ open, appointment, onClose, onCallEnd }) {
  const [callActive, setCallActive] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [roomId, setRoomId] = useState(appointment?.videoLink || null);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  console.log("apppointes",appointment);
  useEffect(() => {
    
    if (!open || !appointment) return;

    let mounted = true;
    const checkStatus = async () => {
      try {
        // try patient endpoint first
        let data;
        try {
          const res = await axios.get(
            `http://localhost:4002/api/patient/video-call-status/${appointment._id}`,
            { withCredentials: true }
          );
          data = res.data;
        } catch (err) {
          // if patient endpoint is unauthorized for this user, try doctor endpoint
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            const res = await axios.get(
              `http://localhost:4002/api/doctor/video-call-status/${appointment._id}`,
              { withCredentials: true }
            );
            data = res.data;
          } else {
            throw err;
          }
        }

        if (!mounted || !data) return;

        const bCanJoin = data?.data?.canJoin;
        const bRoom = data?.data?.roomId;

        setCanJoin(Boolean(bCanJoin));
        if (bRoom) {
          setRoomId(bRoom);
          // if backend already created a room, auto-start the call
          setCallActive(true);
        }
      } catch (err) {
        console.log("video status fetch error", err);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [open, appointment]);

  if (!open || !appointment) return null;

  const handleStartCall = async () => {
    try {
      setLoading(true);
      // If backend supports creating a room, call it; otherwise generate client-side room
      if (!roomId) {
        // try patient POST then doctor POST
        try {
          const { data } = await axios.post(
            `http://localhost:4002/api/patient/video-call/${appointment._id}`,
            {},
            { withCredentials: true }
          );
          const newRoom = data?.data?.roomId;
          if (newRoom) {
            setRoomId(newRoom);
            setCallActive(true);
            notify.success("Video call started");
          }
        } catch (err) {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            try {
              const { data } = await axios.post(
                `http://localhost:4002/api/doctor/video-call/${appointment._id}`,
                {},
                { withCredentials: true }
              );
              const newRoom = data?.data?.roomId;
              if (newRoom) {
                setRoomId(newRoom);
                setCallActive(true);
                notify.success("Video call started");
              }
            } catch {
              // fallback below
            }
          }
        }

        // final fallback if still no room
        if (!roomId) {
          const fallback = `appointment-${appointment._id}`;
          setRoomId(fallback);
          setCallActive(true);
        }
      } else {
        setCallActive(true);
      }
    } catch (err) {
      notify.error(err?.response?.data?.message || "Failed to start video call");
    } finally {
      setLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      setLoading(true);
      // notify backend that call ended when supported
      try {
        await axios.put(
          `http://localhost:4002/api/patient/video-call-end/${appointment._id}`,
          {},
          { withCredentials: true }
        );
      } catch (e) {
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          try {
            await axios.put(
              `http://localhost:4002/api/doctor/video-call-end/${appointment._id}`,
              {},
              { withCredentials: true }
            );
          } catch (er) {
            console.log("end call error (doctor)", er);
          }
        } else {
          console.log("end call error", e);
        }
      }

      setCallActive(false);
      if (onCallEnd) onCallEnd();
    } finally {
      setLoading(false);
    }
  };

  const iframeSrc = roomId
    ? `https://meet.jit.si/${roomId}#userInfo.displayName="Patient"`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">
            {callActive ? "Video Call Active" : "Start Video Call"}
          </h2>
          {!callActive && (
            <button onClick={onClose} className="text-white text-2xl hover:text-gray-200">✕</button>
          )}
        </div>

        <div className="p-6">
          {!callActive ? (
            <div className="flex flex-col gap-4">
              <p>Start video call with Dr {appointment?.doctor?.userId?.fullName || appointment?.doctor?.name}</p>

              {!canJoin && !roomId && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">Waiting for doctor to enable the video call...</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button
                  onClick={handleStartCall}
                  disabled={loading || (!canJoin && !roomId)}
                  className={`px-6 py-2 rounded-lg text-white ${(!canJoin && !roomId) || loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                >
                  {loading ? "Starting..." : "📹 Start Call"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {iframeSrc ? (
                <iframe
                  ref={iframeRef}
                  title="Jitsi Video Call"
                  src={iframeSrc}
                  allow="camera; microphone; fullscreen; display-capture"
                  className="w-full h-[500px] rounded-lg"
                />
              ) : (
                <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center text-white">Connecting...</div>
              )}

              <div className="flex justify-end">
                <button onClick={handleEndCall} className="px-6 py-2 bg-red-600 text-white rounded-lg">📞 End Call</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
