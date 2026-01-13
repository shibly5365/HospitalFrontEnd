import React, { useState } from "react";
import axios from "axios";
import {
  Clock,
  Video,
  User,
  Phone,
  MessageSquare,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { notify } from "../../../../../Units/notification";
import VideoCallModal from "../../../Patients/pages/dashboard/VideoCallModal";

const AppointmentCard = ({ appointment, onUpdateStatus }) => {
  const [videoLoading, setVideoLoading] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const {
    _id,
    patient,
    reason,
    timeSlot,
    status,
    type, // "Video" | "Offline"
    isUrgent,
    notes,
  } = appointment;

  /* ---------------- VIDEO CALL HANDLER ---------------- */
  const handleVideoCall = async () => {
    try {
      setVideoLoading(true);

      // Check if room exists
      const statusRes = await axios.get(
        `http://localhost:4002/api/doctor/video-call-status/${_id}`,
        { withCredentials: true }
      );

      if (statusRes?.data?.data?.roomId) {
        setRoomId(statusRes.data.data.roomId);
        setOpenVideo(true);
        return;
      }

      // Create room
      const createRes = await axios.post(
        `http://localhost:4002/api/doctor/video-call/${_id}`,
        {},
        { withCredentials: true }
      );

      setRoomId(createRes?.data?.data?.roomId || null);
      setOpenVideo(true);
    } catch (err) {
      notify.error(
        err?.response?.data?.message || "Failed to start video call"
      );
      setOpenVideo(true);
    } finally {
      setVideoLoading(false);
    }
  };

  const statusColors = {
    Confirmed: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "bg-green-500",
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "bg-yellow-500",
    },
    Completed: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "bg-blue-500",
    },
    Cancelled: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "bg-gray-400",
    },
  };

  const { bg, text, border } =
    statusColors[status] || statusColors.Cancelled;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          <div className={`w-full lg:w-2 h-2 lg:h-auto ${border}`} />

          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <PatientInfo
                patient={patient}
                reason={reason}
                notes={notes}
                isUrgent={isUrgent}
              />

              <div className="flex flex-col items-end gap-4 lg:min-w-[280px]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <Clock size={18} className="text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      {timeSlot.start}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                    {type === "Video" ? (
                      <Video size={18} className="text-purple-600" />
                    ) : (
                      <User size={18} className="text-purple-600" />
                    )}
                    <span className="text-sm font-medium text-purple-700">
                      {type}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-4 py-2 rounded-xl font-semibold text-sm ${bg} ${text}`}
                >
                  {status}
                </div>

                <ActionButtons
                  status={status}
                  type={type}
                  appointmentId={_id}
                  onUpdateStatus={onUpdateStatus}
                  onVideoCall={handleVideoCall}
                  videoLoading={videoLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO CALL MODAL */}
      <VideoCallModal
        open={openVideo}
        appointment={{ ...appointment, videoLink: roomId }}
        onClose={() => setOpenVideo(false)}
        onCallEnd={() => setOpenVideo(false)}
      />
    </>
  );
};

export default AppointmentCard;

/* =======================================================
   SUB COMPONENTS
======================================================= */

const PatientInfo = ({ patient, reason, notes, isUrgent }) => (
  <div className="flex items-start gap-4 flex-1">
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
        {patient.avatar || patient.fullName?.[0]}
      </div>

      {isUrgent && (
        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
          <AlertCircle size={16} className="text-white" />
        </div>
      )}
    </div>

    <div>
      <h3 className="text-xl font-bold text-gray-900">
        {patient.fullName}
      </h3>
      <p className="text-gray-600 text-sm">
        {patient.age} yrs • {patient.gender} • {patient.phone}
      </p>
      <p className="text-gray-700 font-medium mt-1">{reason}</p>
      {notes && (
        <p className="text-gray-500 text-sm italic mt-1">{notes}</p>
      )}
    </div>
  </div>
);

const ActionButtons = ({
  status,
  type,
  appointmentId,
  onUpdateStatus,
  onVideoCall,
  videoLoading,
}) => (
  <div className="flex gap-2">
    {status === "Pending" && (
      <>
        <button
          onClick={() => onUpdateStatus(appointmentId, "Confirmed")}
          className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100"
        >
          <CheckCircle size={20} />
        </button>

        <button
          onClick={() => onUpdateStatus(appointmentId, "Cancelled")}
          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"
        >
          <XCircle size={20} />
        </button>
      </>
    )}

    {status === "Confirmed" && (
      <>
        {/* ✅ SHOW VIDEO CALL ONLY WHEN ONLINE + CONFIRMED */}
        {type === "Online" && (
          <button
            onClick={onVideoCall}
            disabled={videoLoading}
            title="Start Video Call"
            className={`p-2.5 rounded-xl transition ${
              videoLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <Video size={20} />
          </button>
        )}

        <button
          className="p-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100"
          title="Call"
        >
          <Phone size={20} />
        </button>
      </>
    )}

    <button
      className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
      title="Message"
    >
      <MessageSquare size={20} />
    </button>

    <button
      className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
      title="More"
    >
      <MoreVertical size={20} />
    </button>
  </div>
);
