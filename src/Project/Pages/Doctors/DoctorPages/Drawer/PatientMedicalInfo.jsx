import React from "react";
import { Stethoscope, AlertCircle, Pill } from "lucide-react";

const PatientMedicalInfo = ({ patient }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <Stethoscope size={18} className="text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Medical Information</h3>
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-red-600" />
            <p className="text-xs font-semibold text-red-900 uppercase tracking-wide">Current Condition</p>
          </div>
          <p className="text-sm font-bold text-slate-900">
            {typeof patient.reason === "string" ? patient.reason : "General Checkup"}
          </p>
        </div>

        {patient.allergies && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-900 font-semibold mb-1">Allergies</p>
            <p className="text-sm text-slate-900">{patient.allergies}</p>
          </div>
        )}

        {patient.medications && (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Pill size={14} className="text-blue-600" />
              <p className="text-xs text-blue-900 font-semibold">Current Medications</p>
            </div>
            <p className="text-sm text-slate-900">{patient.medications}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalInfo;