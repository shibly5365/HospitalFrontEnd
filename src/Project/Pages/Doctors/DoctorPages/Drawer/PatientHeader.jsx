import React from "react";
import { X, Phone, Mail, Calendar } from "lucide-react";

const PatientHeader = ({ patient, onClose }) => {
  console.log("patineHeader",patient);
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
            <span className="text-white font-bold text-2xl">
              {patient.fullName?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {patient.patient.fullName || "Unknown Patiednt"}
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
                Patient ID: #{patient._id?.slice(-6).toUpperCase() || "N/A"}
              </span>
              <span className="flex items-center gap-1 text-white/90 text-xs">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                Active
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex gap-3 mt-6">
        <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border border-white/30">
          <Phone size={16} className="inline mr-2" />
          Call
        </button>
        <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border border-white/30">
          <Mail size={16} className="inline mr-2" />
          Email
        </button>
        <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg">
          <Calendar size={16} className="inline mr-2" />
          Schedule
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;