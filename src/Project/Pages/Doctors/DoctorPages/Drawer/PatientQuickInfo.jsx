import React from "react";
import { User, Activity, Heart } from "lucide-react";

const PatientQuickInfo = ({ patient }) => {
  // console.log("sdfjasdkl;f",patient);
  
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User size={16} className="text-blue-600" />
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-1">Age</p>
        <p className="text-lg font-bold text-slate-900">{patient.patient.age || calculateAge(patient.dob)} yrs</p>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Activity size={16} className="text-purple-600" />
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-1">Gender</p>
        <p className="text-lg font-bold text-slate-900 capitalize">{patient.patient.gender || "N/A"}</p>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Heart size={16} className="text-emerald-600" />
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-1">Blood Type</p>
        <p className="text-lg font-bold text-slate-900">{patient.patient.bloodGroup || "N/A"}</p>
      </div>
    </div>
  );
};

export default PatientQuickInfo;