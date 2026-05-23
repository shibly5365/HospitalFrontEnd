import React from "react";
import {
  X,
  Video,
  Phone,
  Calendar,
  Clock,
  User,
  AlertCircle,
  Edit,
} from "lucide-react";
import VideoCall from "../VideoCall";

const AppointmentDetailsModal = ({
  appointment,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  console.log("log test");

  if (!appointment || !isOpen) return null;

  const patient = appointment?.patient || {};

  const { reason, timeSlot, status, consultationType, date, notes, isUrgent } =
    appointment;
  const statusColors = {
    Pending: "bg-amber-100 text-amber-700",
    Confirmed: "bg-emerald-100 text-emerald-700",
    Completed: "bg-blue-100 text-blue-700",
    Cancelled: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
              {patient.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{patient.fullName}</h2>
              <p className="text-gray-500">
                {patient.age} years • {patient.gender} • {patient.phone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-auto max-h-[calc(95vh-80px)]">
          {/* Status & Type */}
          <div className="flex gap-4">
            <div
              className={`px-6 py-3 rounded-2xl font-semibold text-sm ${statusColors[status] || "bg-gray-100"}`}
            >
              {status}
            </div>
            <div
              className={`px-6 py-3 rounded-2xl font-medium flex items-center gap-2 ${consultationType === "Online" ? "bg-violet-50 text-violet-700" : "bg-teal-50 text-teal-700"}`}
            >
              {consultationType === "Online" ? (
                <Video size={20} />
              ) : (
                <span>🏥</span>
              )}
              {consultationType} Consultation
            </div>
            {isUrgent && (
              <div className="px-6 py-3 bg-red-100 text-red-700 rounded-2xl font-medium flex items-center gap-2">
                <AlertCircle size={20} /> Urgent
              </div>
            )}
          </div>

          {/* Appointment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar size={22} className="text-gray-500" />
                <p className="font-medium text-gray-700">Date</p>
              </div>
              <p className="text-xl font-semibold">
                {new Date(date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={22} className="text-gray-500" />
                <p className="font-medium text-gray-700">Time</p>
              </div>
              <p className="text-xl font-semibold">
                {timeSlot?.start} — {timeSlot?.end}
              </p>
            </div>
          </div>

          {/* Reason & Notes */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User size={22} /> Reason for Visit
            </h3>
            <p className="bg-gray-50 p-5 rounded-2xl text-gray-800 leading-relaxed">
              {reason}
            </p>
          </div>

          {notes && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Doctor's Notes</h3>
              <p className="bg-amber-50 border border-amber-100 p-5 rounded-2xl italic text-gray-700">
                "{notes}"
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            {status === "Pending" && (
              <>
                <button
                  onClick={() => onUpdateStatus(appointment._id, "Confirmed")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-medium"
                >
                  Confirm Appointment
                </button>
                <button
                  onClick={() => onUpdateStatus(appointment._id, "Cancelled")}
                  className="flex-1 border border-red-300 text-red-600 hover:bg-red-50 py-4 rounded-2xl font-medium"
                >
                  Cancel Appointment
                </button>
              </>
            )}

            {status === "Confirmed" && consultationType === "Online" && (
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-3">
                <Video size={24} /> Start Video Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
