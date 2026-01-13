import React from 'react';
import { X, User, Phone, Activity, Pill, Clock, Video, CheckCircle, Edit, Download } from 'lucide-react';

const ConsultationModal = ({ consultation, onClose }) => {
  console.log(consultation);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold">Consultation Details</h2>
            <p className="text-blue-100 text-sm mt-1">{consultation.patient.patientId}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Patient Information */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-sm text-gray-600">Name</p><p className="font-semibold text-gray-800">{consultation.patient.fullName}</p></div>
              <div><p className="text-sm text-gray-600">Age</p><p className="font-semibold text-gray-800">{consultation.patient.age} years</p></div>
              <div><p className="text-sm text-gray-600">Gender</p><p className="font-semibold text-gray-800">{consultation.patient.gender}</p></div>
              <div><p className="text-sm text-gray-600 flex items-center"><Phone className="w-3 h-3 mr-1" />Contact</p><p className="font-semibold text-gray-800">{consultation.patient.contact}</p></div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Consultation Details
            </h3>
            <div className="space-y-4">
              <div><p className="text-sm font-semibold text-gray-600 mb-1">Symptoms</p><p className="text-gray-800 bg-white p-3 rounded-lg">{consultation.symptoms}</p></div>
              <div><p className="text-sm font-semibold text-gray-600 mb-1">Diagnosis</p><p className="text-gray-800 bg-white p-3 rounded-lg font-medium">{consultation.diagnosis}</p></div>
              <div><p className="text-sm font-semibold text-gray-600 mb-1">Doctor's Notes</p><p className="text-gray-800 bg-white p-3 rounded-lg">{consultation.notes}</p></div>
            </div>
          </div>

          {/* Prescription */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-green-600" />
              Prescription
            </h3>
            {consultation.prescription > 0 ? (
              <div className="space-y-3">
                {consultation.prescription.map((med, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-gray-800 mb-2">{med.name}</p>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div><span className="text-gray-600">Dosage: </span><span className="text-gray-800 font-medium">{med.dosage}</span></div>
                      <div><span className="text-gray-600">Frequency: </span><span className="text-gray-800 font-medium">{med.frequency}</span></div>
                      <div><span className="text-gray-600">Duration: </span><span className="text-gray-800 font-medium">{med.duration}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 bg-white p-4 rounded-lg">No prescription added yet</p>
            )}
          </div>

          {/* Follow-up */}
          {consultation.followUp && (
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-600" />
                Follow-up Date
              </h3>
              <p className="text-gray-800 font-semibold">{consultation.followUp}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {consultation.type === 'Online' && consultation.status === 'Pending' && (
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Start Video Consultation
              </button>
            )}
            {consultation.status === 'Pending' && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Mark as Completed
              </button>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Edit Prescription
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Send Follow-up Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;