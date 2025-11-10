// components/AppointmentRow.jsx
import React from 'react';
import { MoreVertical, Calendar, Clock } from 'lucide-react';

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

export default function AppointmentRow({ 
  appointment, 
  openMenu, 
  onMenuToggle, 
  onViewDetails, 
  onEdit, 
  onCancel 
}) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          {appointment.patientInfo?.profileImage ? (
            <img
              src={appointment.patientInfo.profileImage}
              alt="profile"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-slate-100">
              {appointment.patientInfo?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "NA"}
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-800">{appointment.patientInfo?.fullName || "-"}</p>
            <p className="text-xs text-slate-500">{appointment.patientInfo?.patientId || "-"}</p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <p className="font-medium text-slate-700">{appointment.doctorInfo?.fullName || "-"}</p>
      </td>
      <td className="p-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
          {appointment.doctorInfo?.department || "-"}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="text-slate-400" />
          <span className="text-slate-700 font-medium">
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <Clock size={16} className="text-slate-400" />
          <span className="text-slate-500">{appointment.timeSlot?.start || ""}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDots[appointment.status]}`}></div>
          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              statusColors[appointment.status] || "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {appointment.status}
          </span>
        </div>
      </td>
      <td className="p-4 text-center relative">
        <button
          onClick={() => onMenuToggle(appointment._id)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center justify-center"
        >
          <MoreVertical size={18} className="text-slate-600" />
        </button>

        {openMenu === appointment._id && (
          <div className="absolute right-6 top-12 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
            <button
              onClick={() => {
                onViewDetails(appointment);
                onMenuToggle(null);
              }}
              className="block w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              View Details
            </button>
            <button
              onClick={() => {
                onEdit(appointment);
                onMenuToggle(null);
              }}
              className="block w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onCancel(appointment._id);
                onMenuToggle(null);
              }}
              className="block w-full text-left px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}