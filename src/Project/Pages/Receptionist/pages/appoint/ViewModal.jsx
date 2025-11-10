// components/ViewModal.jsx
import React from 'react';
import { X, User, Calendar, FileText, Phone, Mail } from 'lucide-react';

const statusColors = {
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "With-Doctor": "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusDots = {
  Confirmed: "bg-emerald-500",
  Pending: "bg-amber-500",
  "With-Doctor": "bg-blue-500",
  Cancelled: "bg-rose-500",
};

export default function ViewModal({ appointment, onClose, onEdit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Appointment Details</h2>
              <p className="text-blue-100 text-sm mt-1">Complete information</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Patient Info */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              Patient Information
            </h3>
            <div className="flex items-start gap-4">
              {appointment.patientInfo?.profileImage ? (
                <img
                  src={appointment.patientInfo.profileImage}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl ring-4 ring-white shadow-lg">
                  {appointment.patientInfo?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "NA"}
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-lg text-slate-800">{appointment.patientInfo?.fullName || "-"}</p>
                <p className="text-sm text-slate-500 mt-1">ID: {appointment.patientInfo?.patientId || "-"}</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={16} className="text-slate-400" />
                    {appointment.patientInfo?.phone || "-"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={16} className="text-slate-400" />
                    {appointment.patientInfo?.email || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Doctor</p>
                <p className="font-semibold text-slate-800 mt-1">{appointment.doctorInfo?.fullName || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Department</p>
                <p className="font-semibold text-slate-800 mt-1">{appointment.doctorInfo?.department || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Date</p>
                <p className="font-semibold text-slate-800 mt-1">
                  {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Time</p>
                <p className="font-semibold text-slate-800 mt-1">
                  {appointment.timeSlot?.start} - {appointment.timeSlot?.end}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-500 font-medium">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${statusDots[appointment.status]}`}></div>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                      statusColors[appointment.status] || "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Reason */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Reason for Visit
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {appointment.reason || "No reason provided"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => onEdit(appointment)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/30 text-center"
            >
              Edit Appointment
            </button>
            <button
              onClick={() => onCancel(appointment._id)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all font-medium shadow-lg shadow-rose-500/30 text-center"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}