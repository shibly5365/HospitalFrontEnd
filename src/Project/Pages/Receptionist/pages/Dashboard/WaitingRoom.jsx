import React from "react";
import { Filter, PhoneCall, Send, Eye, Clock } from "lucide-react";

const WaitingRoom = ({ dashboardData }) => {
  const waitingPatients = dashboardData.appointments?.nextPatients?.list || [];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Waiting Room
            </h2>
            <p className="text-gray-500 text-sm mt-1">Real-time patient queue</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
              Waiting
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {waitingPatients.length > 0 ? (
            waitingPatients.map((appt, idx) => (
              <PatientCard key={appt._id} appt={appt} index={idx} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

const PatientCard = ({ appt, index }) => (
  <div className="group relative bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
            index % 3 === 0 ? 'from-blue-500 to-cyan-500' :
            index % 3 === 1 ? 'from-purple-500 to-pink-500' :
            'from-emerald-500 to-teal-500'
          } flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {appt.patient?.fullName?.charAt(0) || "P"}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-lg truncate">
            {appt.patient?.fullName || "Unknown Patient"}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
            <span className="truncate">{appt.patient?.email || "No email"}</span>
            <span>•</span>
            <span className="font-medium text-purple-600">
              {appt.timeSlot?.start || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
          appt.status === "Confirmed"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}>
          {appt.status}
        </span>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all hover:scale-110">
            <PhoneCall className="w-4 h-4" />
          </button>
          <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all hover:scale-110">
            <Send className="w-4 h-4" />
          </button>
          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all hover:scale-110">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-500 font-medium">No patients waiting</p>
  </div>
);

export default WaitingRoom;