import React, { useState } from "react";
import {
  Clock,
  Video,
  Phone,
  MessageSquare,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  Eye,
} from "lucide-react";
import VideoCall from "../VideoCall";

const AppointmentCard = ({ appointment, onUpdateStatus, onViewDetails }) => {
  console.log("CARD DATA:", appointment);
console.log("VIEW FN:", onViewDetails);
  
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
    duration = 30,
    date: appointmentDate,
  } = appointment;

  const handleVideoCall = () => setOpenVideo(true);

  // Status Configuration
  const statusConfig = {
    Pending: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-500",
      label: "Pending",
    },
    Confirmed: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      label: "Confirmed",
    },
    Completed: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
      label: "Completed",
    },
    Cancelled: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      dot: "bg-gray-400",
      label: "Cancelled",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.Cancelled;
  const isOnlineConfirmed =
    status === "Confirmed" && consultationType === "Online";

  return (
    <>
      <div className="group bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Top Accent Bar */}
        <div className={`h-1 w-full ${currentStatus.dot}`} />

        <div className="p-6">
          {" "}
          {/* Reduced padding for compact height */}
          <div className="flex flex-col lg:flex-row gap-6">
            {" "}
            {/* Tighter gap */}
            {/* Patient Information - Compact */}
            <div className="flex-1">
              <PatientInfo
                patient={patient}
                reason={reason}
                notes={notes}
                isUrgent={isUrgent}
                appointmentDate={appointmentDate}
                duration={duration}
              />
            </div>
            {/* Right Column - Time, Status & Actions */}
            <div className="lg:w-72 flex flex-col gap-4">
              {" "}
              {/* Slightly narrower */}
              <TimeAndType
                timeSlot={timeSlot}
                consultationType={consultationType}
              />
              <StatusBadge status={status} currentStatus={currentStatus} />
              <ActionButtons
                appointment={appointment}
                appointmentId={_id}
                onUpdateStatus={onUpdateStatus}
                onVideoCall={handleVideoCall}
                onViewDetails={onViewDetails}
                isOnlineConfirmed={isOnlineConfirmed}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
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

/* ===================== SUB COMPONENTS ===================== */

const PatientInfo = ({
  patient,
  reason,
  notes,
  isUrgent,
  appointmentDate,
  duration,
}) => (
  <div className="flex gap-5">
    {/* Smaller Avatar */}
    <div className="relative flex-shrink-0">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-semibold shadow-inner">
        {patient?.avatar || patient?.fullName?.[0] || "P"}
      </div>
      {isUrgent && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg ring-2 ring-white">
          <AlertCircle size={16} />
        </div>
      )}
    </div>

    {/* Details - More Compact */}
    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
        {patient?.fullName}
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        {patient.age}y • {patient?.gender} • {patient?.phone}
      </p>

      {appointmentDate && (
        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
          <CalendarIcon size={16} />
          <span>
            {new Date(appointmentDate).toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
        <Clock size={16} />
        <span>{duration} min</span>
      </div>

      <p className="font-medium text-gray-800 mt-4 line-clamp-2">{reason}</p>
      {notes && (
        <p className="mt-2 text-sm text-gray-500 italic line-clamp-1">
          "{notes}"
        </p>
      )}
    </div>
  </div>
);

const TimeAndType = ({ timeSlot, consultationType }) => (
  <div className="space-y-3">
    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
        <Clock size={22} className="text-indigo-600" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
          Time
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {timeSlot?.start} — {timeSlot?.end}
        </p>
      </div>
    </div>

    <div
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-medium ${
        consultationType === "Online"
          ? "bg-violet-50 text-violet-700"
          : "bg-teal-50 text-teal-700"
      }`}
    >
      {consultationType === "Online" ? <Video size={18} /> : <span>🏥</span>}
      {consultationType || "Offline"}
    </div>
  </div>
);

const StatusBadge = ({ status, currentStatus }) => (
  <div
    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm ${currentStatus.bg} ${currentStatus.text}`}
  >
    <div className={`w-2.5 h-2.5 rounded-full ${currentStatus.dot}`} />
    {currentStatus.label}
  </div>
);

const ActionButtons = ({
  appointment,
  appointmentId,
  onUpdateStatus,
  onVideoCall,
  onViewDetails,
  isOnlineConfirmed,
}) => {
  const { status, consultationType } = appointment;

  return (
    <div className="flex flex-wrap gap-3">
      {/* Pending Actions */}
      {status === "Pending" && (
        <>
          <button
            onClick={() => onUpdateStatus(appointmentId, "Confirmed")}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-medium transition-all active:scale-95"
          >
            <CheckCircle size={18} />
            Confirm
          </button>

          <button
            onClick={() => onUpdateStatus(appointmentId, "Cancelled")}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-red-200 hover:bg-red-50 text-red-700 px-5 py-3 rounded-2xl font-medium transition-all"
          >
            <XCircle size={18} />
            Cancel
          </button>
        </>
      )}

      {/* Confirmed Actions */}
      {status === "Confirmed" && (
        <>
          {isOnlineConfirmed && (
            <button
              onClick={onVideoCall}
              className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:brightness-105 transition-all"
            >
              <Video size={18} />
              Start Call
            </button>
          )}

          <button className="p-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-2xl transition-all">
            <Phone size={20} className="text-gray-600" />
          </button>
        </>
      )}

      {status === "Cancelled" && (
        <div className="px-5 py-3 bg-red-50 text-red-700 rounded-2xl font-medium flex-1 text-center text-sm">
          Cancelled
        </div>
      )}

      {/* View Details + Quick Actions */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => onViewDetails && onViewDetails(appointmentId)}
          className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-medium transition-all text-sm"
        >
          <Eye size={18} />
          Details
        </button>

        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all">
          <MessageSquare size={20} className="text-gray-600" />
        </button>

        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};
