import React from 'react';
import { User, Phone, Calendar, FileText, Video } from 'lucide-react';

const ConsultationCard = ({ consultation, getStatusColor, getStatusIcon, onSelect }) => {
  // console.log("consolit in card", consultation);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(consultation.status)} bg-white`}>
            {getStatusIcon(consultation.status)}
            <span className="ml-1">{consultation.status}</span>
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${consultation.consultationType === 'Online' ? 'bg-purple-500' : 'bg-blue-800'
            }`}>
            {consultation.consultationType === 'Online' && <Video className="w-3 h-3 mr-1" />}
            {consultation.consultationType}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg truncate">{consultation.patient.fullName}</h3>
            <p className="text-sm text-gray-500">{consultation.patient.patientId}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="text-sm">{consultation.patient.contact}</span>
        </div>

        <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
          <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-medium">
              {new Date(consultation.createdAt).toLocaleDateString("en-GB")
                .replace(/\//g, "-")
                .slice(0, 8)}
            </span>

            <span className="text-gray-500 ml-2">{consultation.timeSlot.start}</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(consultation)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ConsultationCard;