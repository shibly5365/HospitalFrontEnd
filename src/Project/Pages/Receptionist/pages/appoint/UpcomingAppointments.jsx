import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Stethoscope, ChevronRight, Eye, Edit, X } from "lucide-react";
import { notify } from "../../../../../UnitsTemp/notification";

export default function UpcomingAppointments({ onViewDetails, onEdit, onCancel }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [daysFilter, setDaysFilter] = useState(7); // Show next 7 days

  useEffect(() => {
    fetchUpcomingAppointments();
  }, [daysFilter]);

  const fetchUpcomingAppointments = async () => {
    try {
      setLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + daysFilter);
      endDate.setHours(23, 59, 59, 999);

      const res = await apiClient.get(
        "/receptionist/get",
        {
          params: {
            date: today.toISOString(),
          },
          withCredentials: true,
        }
      );

      if (res.data.appointments) {
        // Filter upcoming appointments
        const upcoming = res.data.appointments
          .filter((apt) => {
            const aptDate = new Date(apt.appointmentDate);
            return aptDate > today && aptDate <= endDate && 
                   !["Cancelled", "Completed", "Missed"].includes(apt.status);
          })
          .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

        // Transform data
        const transformed = upcoming.map((apt) => ({
          _id: apt._id,
          // Keep original data for rescheduling
          doctor: apt.doctor,
          patient: apt.patient,
          patientInfo: {
            patientId: apt.patient?.patientId || apt.patient?._id,
            fullName: apt.patient?.fullName || "Unknown",
            profileImage: apt.patient?.profileImage || "",
            phone: apt.patient?.contact || "",
            email: apt.patient?.email || "",
          },
          doctorInfo: {
            fullName: apt.doctor?.userId?.fullName 
              ? `Dr. ${apt.doctor.userId.fullName}` 
              : "Unknown Doctor",
            department: apt.doctor?.department?.name || "Unknown",
          },
          appointmentDate: apt.appointmentDate,
          timeSlot: apt.timeSlot || { start: "", end: "" },
          status: apt.status,
          reason: apt.reason || "General Consultation",
          tokenNumber: apt.tokenNumber,
        }));

        setAppointments(transformed);
      }
    } catch (err) {
      console.error("Error fetching upcoming appointments:", err);
      notify.error("Failed to load upcoming appointments");
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const aptDate = new Date(date);
    aptDate.setHours(0, 0, 0, 0);
    const diffTime = aptDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  const groupByDate = () => {
    const grouped = {};
    appointments.forEach((apt) => {
      const date = new Date(apt.appointmentDate).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(apt);
    });
    return grouped;
  };

  const groupedAppointments = groupByDate();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
            <Calendar className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
            <p className="text-sm text-gray-500">Next {daysFilter} days</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => setDaysFilter(days)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                daysFilter === days
                  ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading upcoming appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No upcoming appointments</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedAppointments).map(([date, apts]) => (
            <div key={date} className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">{date}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {apts.length} {apts.length === 1 ? "appointment" : "appointments"}
                </span>
              </div>

              <div className="space-y-3">
                {apts.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                            {appointment.patientInfo?.fullName?.charAt(0) || "P"}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {appointment.patientInfo?.fullName || "Unknown"}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {getDaysUntil(appointment.appointmentDate)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-13 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Stethoscope size={14} className="text-green-600" />
                            <span>{appointment.doctorInfo?.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={14} className="text-teal-600" />
                            <span>
                              {appointment.timeSlot?.start
                                ? `${appointment.timeSlot.start} - ${appointment.timeSlot.end}`
                                : "Time not set"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {onViewDetails && (
                          <button
                            onClick={() => onViewDetails(appointment)}
                            className="p-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(appointment)}
                            className="p-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {onCancel && (
                          <button
                            onClick={() => onCancel(appointment._id)}
                            className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
