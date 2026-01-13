import React from "react";
import { Activity, Heart, Thermometer, Weight } from "lucide-react";

const PatientVitalSigns = ({ patient }) => {
  const vitals = patient?.medicalRecords?.[0]?.vitals || {}; // medicalRecords is an array

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Activity size={18} className="text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Latest Vital Signs</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={16} className="text-red-500" />
            <p className="text-xs font-semibold text-slate-600">Heart Rate</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{vitals.heartRate || "72"}</p>
          <p className="text-xs text-slate-500">bpm</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-blue-500" />
            <p className="text-xs font-semibold text-slate-600">Blood Pressure</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{vitals.bloodPressure || "120/80"}</p>
          <p className="text-xs text-slate-500">mmHg</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={16} className="text-orange-500" />
            <p className="text-xs font-semibold text-slate-600">Temperature</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{vitals.temperature || "98.6"}</p>
          <p className="text-xs text-slate-500">°F</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Weight size={16} className="text-purple-500" />
            <p className="text-xs font-semibold text-slate-600">Weight</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{vitals.weight || "N/A"}</p>
          <p className="text-xs text-slate-500">kg</p>
        </div>
      </div>
    </div>
  );
};

export default PatientVitalSigns;
