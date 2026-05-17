import React, { useState } from "react";
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
import VideoCall from "../VideoCall";

const AppointmentCard = ({ appointment, onUpdateStatus }) => {
  const [openVideo, setOpenVideo] = useState(false);

  const {
    _id,
    patient,
    reason,
    timeSlot,
    status,
    consultationType,
    isUrgent,
    notes,
  } = appointment;

  // ✅ SAFELY RESOLVE APPOINTMENT DATE (VERY IMPORTANT)
  const appointmentDateValue =
    appointment.appointmentDate || appointment.date || appointment.createdAt;

  const handleVideoCall = () => {
    setOpenVideo(true);
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

  const { bg, text, border } = statusColors[status] || statusColors.Cancelled;

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
                appointmentDate={appointmentDateValue}
              />

              <div className="flex flex-col items-end gap-4 lg:min-w-[280px]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <Clock size={18} className="text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      {timeSlot?.start || "--"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                    {appointment?.consultationType === "Online" ? (
                      <Video size={18} className="text-purple-600" />
                    ) : (
                      <User size={18} className="text-purple-600" />
                    )}
                    <span className="text-sm font-medium text-purple-700">
                      {consultationType || "Offline"}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-4 py-2 rounded-xl font-semibold text-sm ${bg} ${text}`}
                >
                  {status}
                </div>

                <ActionButtons
                  appointment={appointment}
                  appointmentId={_id}
                  onUpdateStatus={onUpdateStatus}
                  onVideoCall={handleVideoCall}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO CALL MODAL */}
      <VideoCall
        open={openVideo}
        appointment={appointment}
        role="doctor"
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

const PatientInfo = ({ patient, reason, notes, isUrgent, appointmentDate }) => {
  return (
    <div className="flex items-start gap-4 flex-1">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
          {patient?.avatar || patient?.fullName?.[0] || "P"}
        </div>

        {isUrgent && (
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
            <AlertCircle size={16} className="text-white" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900">{patient?.fullName}</h3>

        <p className="text-gray-600 text-sm">
          {patient?.age} yrs • {patient?.gender} • {patient?.phone}
        </p>

        {/* ✅ APPOINTMENT DATE DISPLAY */}
        {appointmentDate && (
          <p className="text-gray-500 text-sm mt-1">
            Appointment:{" "}
            <span className="font-medium text-gray-800">
              {new Date(appointmentDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
            </span>
          </p>
        )}

        <p className="text-gray-700 font-medium mt-1">{reason}</p>

        {notes && <p className="text-gray-500 text-sm italic mt-1">{notes}</p>}
      </div>
    </div>
  );
};

const ActionButtons = ({
  appointment,
  appointmentId,
  onUpdateStatus,
  onVideoCall,
  videoLoading,
}) => {
  // console.log("appoint",appointment?.status?.trim());

  const status = appointment?.status?.trim();
  const type = appointment?.consultationType?.trim();

  console.log("status", status);
  console.log("type", type);

  const isConfirmedOnline = status === "Confirmed" && type === "Online";
  console.log("faaaaa", isConfirmedOnline);

  return (
    <div className="flex gap-2 relative z-10">
      {/* ✅ PENDING */}
      {status === "Pending" && (
        <>
          <button
            type="button"
            onClick={() => onUpdateStatus(appointmentId, "Confirmed")}
            className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 cursor-pointer"
          >
            <CheckCircle size={20} />
          </button>
          {/* {console.log("faaaa",appointmentId)} */}

          <button
            type="button"
            onClick={() => onUpdateStatus(appointmentId, "Cancelled")}
            className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 cursor-pointer"
          >
            <XCircle size={20} />
          </button>
        </>
      )}

      {/* ✅ CONFIRMED */}
      {status === "Confirmed" && (
        <>
          {isConfirmedOnline && (
            <button
              type="button"
              onClick={onVideoCall}
              disabled={videoLoading}
              className={`p-2.5 rounded-xl ${
                videoLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              <Video size={20} />
            </button>
          )}

          <button
            type="button"
            className="p-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100"
          >
            <Phone size={20} />
          </button>
        </>
      )}
      {status === "Cancelled" && (
        <div className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
          Appointment Cancelled
        </div>
      )}

      {/* ALWAYS */}
      <button
        type="button"
        className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
      >
        <MessageSquare size={20} />
      </button>

      <button
        type="button"
        className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
      >
        <MoreVertical size={20} />
      </button>
    </div>
  );
};
