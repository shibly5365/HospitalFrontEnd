import React from 'react';
import { User, Phone, Calendar, FileText, Video, CheckCircle, XCircle, AlertCircle, Activity } from 'lucide-react';
import ConsultationCard from './ConsultationCard';


const ConsultationsGrid = ({ consultations, onSelectConsultation }) => {
  // console.log("conso",consultations);
  
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Completed': <CheckCircle className="w-4 h-4" />,
      'Pending': <AlertCircle className="w-4 h-4" />,
      'Cancelled': <XCircle className="w-4 h-4" />
    };
    return icons[status];
  };

  if (consultations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No consultations found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultations.map((consultation) => (
        <ConsultationCard
          key={consultation._id}
          consultation={consultation}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          onSelect={onSelectConsultation}
        />
      ))}
    </div>
  );
};

export default ConsultationsGrid;