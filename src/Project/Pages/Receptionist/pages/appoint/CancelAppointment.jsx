import { apiClient } from "../../../../../services/queryClient";
import React, { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { notify } from "../../../../../UnitsTemp/notification";

export default function CancelAppointment({ appointment, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const handleCancel = async () => {
    if (!reason.trim()) {
      notify.error("Please provide a cancellation reason");
      return;
    }

    if (confirmText !== "CANCEL") {
      notify.error('Please type "CANCEL" to confirm');
      return;
    }

    if (!appointment?._id) {
      notify.error("Appointment information missing");
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.put(
        `/receptionist/cancel/${appointment._id}`,
        {
          reason: reason.trim(),
        },
        { withCredentials: true }
      );

      if (res.data) {
        notify.success("Appointment cancelled successfully");
        if (onSuccess) onSuccess(res.data.appointment);
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      notify.error(err.response?.data?.message || "Failed to cancel appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} />
            <h2 className="text-2xl font-bold">Cancel Appointment</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Warning</h3>
                <p className="text-sm text-red-700">
                  This action cannot be undone. The appointment will be permanently cancelled.
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Appointment Details</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Patient:</span>{" "}
                {appointment.patientInfo?.fullName || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {appointment.doctorInfo?.fullName || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {appointment.appointmentDate
                  ? new Date(appointment.appointmentDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {appointment.timeSlot?.start && appointment.timeSlot?.end
                  ? `${appointment.timeSlot.start} - ${appointment.timeSlot.end}`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation Reason *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for cancellation..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-bold text-red-600">CANCEL</span> to confirm *
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type CANCEL here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Go Back
              </button>
            )}
            <button
              onClick={handleCancel}
              disabled={loading || !reason.trim() || confirmText !== "CANCEL"}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              {loading ? "Cancelling..." : "Cancel Appointment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
