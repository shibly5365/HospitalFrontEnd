import React from 'react';
import { Calendar, User, Pill, FileText } from 'lucide-react';
import PrescriptionCard from './PrescriptionCard';

const PrescriptionsGrid = ({ prescriptions, onViewPrescription }) => {
    // console.log("grid",onViewPrescription);
    
  if (prescriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No prescriptions found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {prescriptions.map((prescription) => (
        <PrescriptionCard
          key={prescription.id}
          prescription={prescription}
          onViewPrescription={onViewPrescription}
        />
      ))}
    </div>
  );
};

export default PrescriptionsGrid;