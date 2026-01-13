import React from 'react';
import { X, User, Phone, Activity, Pill, FileText, Clock, Download, Edit } from 'lucide-react';

const PrescriptionModal = ({ prescription, onClose }) => {
    // console.log("modle", prescription);

    if (!prescription) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold">Prescription Details</h2>
                        <p className="text-blue-100 text-sm mt-1">Issued on {new Date(prescription.medicalRecord.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                        </p>
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
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-semibold text-gray-800">{prescription.patient.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Age</p>
                                <p className="font-semibold text-gray-800">{prescription.patient.age} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Gender</p>
                                <p className="font-semibold text-gray-800">{prescription.patient.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <Phone className="w-3 h-3 mr-1" />
                                    Contact
                                </p>
                                <p className="font-semibold text-gray-800">{prescription.patient.contact}</p>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis & Symptoms */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-600" />
                            Diagnosis & Symptoms
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">Diagnosis</p>
                                <p className="text-gray-800 bg-white p-3 rounded-lg font-medium">{prescription.medicalRecord.diagnosis}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">Symptoms</p>
                                <p className="text-gray-800 bg-white p-3 rounded-lg">{prescription.medicalRecord.symptoms}</p>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Medicines */}
                    <div className="bg-green-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Pill className="w-5 h-5 mr-2 text-green-600" />
                            Prescribed Medicines
                        </h3>
                        <div className="space-y-3">
                            {prescription.medicines.map((med, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <p className="font-bold text-gray-800 text-lg">{index + 1}. {med.medicineName}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-600">Dosage: </span>
                                            <span className="text-gray-800 font-medium">{med.dosage}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Frequency: </span>
                                            <span className="text-gray-800 font-medium">{med.frequency}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Duration: </span>
                                            <span className="text-gray-800 font-medium">{med.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-yellow-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-yellow-600" />
                            Instructions
                        </h3>
                        <p className="text-gray-800 bg-white p-4 rounded-lg">{prescription.instructions}</p>
                    </div>

                    {/* Follow-up */}
                    {prescription.followUp && (
                        <div className="bg-purple-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                                Follow-up Date
                            </h3>
                            <p className="text-gray-800 font-semibold text-lg">{prescription.followUp}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                            <Download className="w-5 h-5 mr-2" />
                            Download PDF
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                            <Edit className="w-5 h-5 mr-2" />
                            Edit Prescription
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Reissue Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;