// PatientCard.jsx
import React from 'react';
import { Mail, Phone, Calendar, Activity, AlertCircle } from 'lucide-react';

const PatientCard = ({ patient, onView, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityBadge = (patient) => {
    if (patient.conditions?.includes('emergency')) return '🚨 Emergency';
    if (patient.lastVisit === new Date().toISOString().split('T')[0]) return '📍 Today';
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        {/* Header with badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {patient.fullName?.charAt(0) || "P"}
              </div>
              {getPriorityBadge(patient) && (
                <span className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                  {getPriorityBadge(patient)}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                  {patient.fullName || "Unknown"}
                </h3>
                {patient.status && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                ID: <span className="font-mono">{patient.patientId || patient._id.slice(-8)}</span>
              </p>
            </div>
          </div>
          {patient.priority === 'high' && (
            <AlertCircle className="text-red-500" size={20} />
          )}
        </div>

        {/* Patient Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={14} className="text-gray-400" />
            <span className="text-gray-600 truncate">{patient.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-400" />
            <span className="text-gray-600">{patient.contact || "N/A"}</span>
          </div>
          {patient.age && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-gray-600">{patient.age} years • {patient.gender}</span>
            </div>
          )}
          {patient.lastVisit && (
            <div className="flex items-center gap-2 text-sm">
              <Activity size={14} className="text-gray-400" />
              <span className="text-gray-600">
                Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {patient.bloodGroup && (
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
              Blood: {patient.bloodGroup}
            </span>
          )}
          {patient.allergies?.length > 0 && (
            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold">
              Allergies: {patient.allergies.length}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-5 border-t border-gray-100">
          <button
            onClick={onView}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition font-medium"
          >
            View Profile
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition font-medium"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;