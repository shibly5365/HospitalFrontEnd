import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Stethoscope, MapPin, Phone, Eye, Edit, X } from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function TodaysAppointments({ onViewDetails, onEdit, onCancel }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("All");

  const statusColors = {
    Confirmed: "bg-green-100 text-green-700 border-green-300",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    "With-Doctor": "bg-blue-100 text-blue-700 border-blue-300",
    Completed: "bg-gray-100 text-gray-700 border-gray-300",
    Cancelled: "bg-red-100 text-red-700 border-red-300",
    default: "bg-gray-100 text-gray-700 border-gray-300"
  };

  const statusList = ["All", "Confirmed", "Pending", "With-Doctor", "Completed", "Cancelled"];

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/receptionist/todayAppoi", { withCredentials: true });

      if (res.data.appointments) {
        let filtered = res.data.appointments;
        if (status !== "All") filtered = filtered.filter(apt => apt.status === status);

        const transformed = filtered.map(apt => ({
          id: apt._id,
          patient: {
            id: apt.patient?.patientId || apt.patient?._id,
            name: apt.patient?.fullName || "Unknown Patient",
            phone: apt.patient?.contact || "N/A",
            email: apt.patient?.email || "N/A",
          },
          doctor: {
            name: apt.doctor?.userId?.fullName ? `Dr. ${apt.doctor.userId.fullName}` : "Unknown Doctor",
            department: apt.doctor?.department?.name || "Unknown"
          },
          timeSlot: apt.timeSlot || { start: "", end: "" },
          date: apt.appointmentDate,
          status: apt.status,
          reason: apt.reason || "General Consultation",
          token: apt.tokenNumber,
        }));

        setAppointments(transformed);
      }
    } catch (err) {
      console.error("Error:", err);
      notify.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const statusCounts = appointments.reduce((acc, apt) => {
    acc[apt.status] = (acc[apt.status] || 0) + 1;
    return acc;
  }, {});

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Calendar className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Today's Appointments</h2>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statusList.map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${status === s
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {s} {s !== "All" && statusCounts[s] && `(${statusCounts[s]})`}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map(apt => (
            <div key={apt.id} className="border-2 rounded-xl p-5 hover:shadow-lg transition-all bg-white">
              <div className="flex items-start justify-between">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {apt.patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{apt.patient.name}</h3>
                      <p className="text-sm text-gray-500">ID: {apt.patient.id}</p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold border-2 ${statusColors[apt.status] || statusColors.default}`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 ml-18">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Stethoscope size={16} className="text-blue-500" />
                      <span>{apt.doctor.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-purple-500" />
                      <span>{apt.doctor.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-green-500" />
                      <span>{apt.timeSlot.start ? `${apt.timeSlot.start} - ${apt.timeSlot.end}` : "No time set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-orange-500" />
                      <span>{apt.patient.phone}</span>
                    </div>
                  </div>

                  {apt.reason && (
                    <div className="mt-3 ml-18">
                      <p className="text-sm text-gray-600"><span className="font-semibold">Reason:</span> {apt.reason}</p>
                    </div>
                  )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  {onViewDetails && (
                    <button onClick={() => onViewDetails(apt)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-2">
                      <Eye size={16} /> View
                    </button>
                  )}
                  {onEdit && !["Completed", "Cancelled"].includes(apt.status) && (
                    <button onClick={() => onEdit(apt)} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition flex items-center gap-2">
                      <Edit size={16} /> Edit
                    </button>
                  )}
                  {onCancel && !["Completed", "Cancelled"].includes(apt.status) && (
                    <button onClick={() => onCancel(apt.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2">
                      <X size={16} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}