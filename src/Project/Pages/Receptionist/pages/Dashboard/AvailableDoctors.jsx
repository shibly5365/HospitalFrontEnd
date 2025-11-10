import React from "react";
import { Stethoscope, CheckCircle } from "lucide-react";

const AvailableDoctors = ({ dashboardData }) => {
  const doctors = dashboardData.availableDoctors?.list || [];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          On Duty Today
          <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">
            {doctors.length}
          </span>
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {doctors.length === 0 ? (
            <EmptyDoctorsState />
          ) : (
            doctors.map((doc, idx) => (
              <DoctorCard key={doc._id} doctor={doc} index={idx} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ doctor, index }) => (
  <div className="group relative bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
          index % 4 === 0 ? 'from-emerald-500 to-teal-500' :
          index % 4 === 1 ? 'from-blue-500 to-cyan-500' :
          index % 4 === 2 ? 'from-purple-500 to-pink-500' :
          'from-amber-500 to-orange-500'
        } flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
          {doctor.fullName?.charAt(0) || "D"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate">{doctor.fullName || "Doctor"}</p>
          <p className="text-sm text-gray-500 truncate">{doctor.specialization || "General"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {doctor.isAvailableToday ? (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 rounded-xl">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-xs font-bold">Available</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-xl">
            <span className="text-gray-700 text-xs font-bold">Off Duty</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const EmptyDoctorsState = () => (
  <div className="text-center py-8">
    <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500 font-medium">No doctors available</p>
  </div>
);

export default AvailableDoctors;