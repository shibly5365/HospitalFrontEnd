import React from 'react';
import { Calendar, User, Pill, FileText } from 'lucide-react';

const PrescriptionCard = ({ prescription, onViewPrescription }) => {
    // console.log(prescription);
    // console.log(onViewPrescription);

    const getStatusColor = (status) => {
        return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
                <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(prescription.status)} bg-white`}>
                        {prescription.status}
                    </span>
                    <span className="text-white text-xs font-medium flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {prescription.date}
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                        <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-lg truncate">{prescription.patientName}</h3>
                        <p className="text-sm text-gray-500">{prescription.patientId}</p>
                    </div>
                </div>

                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Diagnosis</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{prescription.diagnosis}</p>
                </div>

                <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                    <div className="flex items-center text-green-700">
                        <Pill className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Medicines</span>
                    </div>
                    <span className="text-sm font-bold text-green-700">{prescription.medicines.length}</span>
                </div>

                <button
                    onClick={() => onViewPrescription(prescription)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center shadow-md hover:shadow-lg"
                >
                    <FileText className="w-4 h-4 mr-2" />
                    View Prescription
                </button>
            </div>
        </div>
    );
};

export default PrescriptionCard;