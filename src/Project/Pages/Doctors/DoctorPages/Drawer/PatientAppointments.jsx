// PatientAppointments.jsx
import React from "react";
import { Clock, Calendar, ChevronRight } from "lucide-react";

const PatientAppointments = ({ data }) => {
  // data = full API response sent from parent
  // console.log(data);
  
  const { overview, appointments } = data;

  const lastVisit = overview?.lastVisit?.date;
  const nextAppointment = appointments?.[0]?.appointmentDate; // if you want upcoming appointment

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Clock size={18} className="text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Appointments</h3>
        </div>

        <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {/* LAST VISIT CARD */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <p className="text-xs font-semibold text-blue-900">Last Visit</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              Completed
            </span>
          </div>

          <p className="text-sm font-bold text-slate-900 mb-1">
            {formatDate(lastVisit)}
          </p>

          <p className="text-xs text-slate-600">
            {lastVisit
              ? `${Math.floor(
                  (new Date() - new Date(lastVisit)) /
                    (1000 * 60 * 60 * 24)
                )} days ago`
              : "No previous visits"}
          </p>
        </div>

        {/* NEXT APPOINTMENT CARD */}
        {nextAppointment && (
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-emerald-600" />
                <p className="text-xs font-semibold text-emerald-900">
                  Next Appointment
                </p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                Scheduled
              </span>
            </div>

            <p className="text-sm font-bold text-slate-900 mb-1">
              {formatDate(nextAppointment)}
            </p>

            <p className="text-xs text-slate-600">
              In{" "}
              {Math.floor(
                (new Date(nextAppointment) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
