import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Edit, Phone, Mail, Calendar, MapPin, Heart, AlertCircle, User, FileText } from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function PatientDetails({ patient, onClose, onEdit }) {
  const [patientData, setPatientData] = useState(patient);
  const [loading, setLoading] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    if (patient?._id) {
      fetchPatientDetails();
    }
  }, [patient?._id]);

  const fetchPatientDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4002/api/receptionist/patients/${patient._id}`,
        { withCredentials: true }
      );

      if (res.data.success && res.data.data) {
        setPatientData(res.data.data.patient);
        setAppointmentCount(res.data.data.appointmentCount || 0);
      }
    } catch (err) {
      console.error("Error fetching patient details:", err);
      notify.error("Failed to load patient details");
    } finally {
      setLoading(false);
    }
  };

  const p = patientData || patient;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User size={24} />
            <h2 className="text-2xl font-bold">Patient Details</h2>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-white/20 rounded-lg transition flex items-center gap-2"
              >
                <Edit size={20} />
                Edit
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading patient details...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                {p.fullName?.charAt(0) || "P"}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{p.fullName || "Unknown"}</h3>
                <p className="text-gray-500">Patient ID: {p.patientId || p._id.slice(-8)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Type: {p.patientType || "N/A"}
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{p.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{p.contact || "N/A"}</p>
                  </div>
                </div>
                {p.age && (
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{p.age} years</p>
                    </div>
                  </div>
                )}
                {p.gender && (
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{p.gender}</p>
                    </div>
                  </div>
                )}
                {p.dob && (
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {new Date(p.dob).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {p.bloodGroup && (
                  <div className="flex items-center gap-3">
                    <Heart className="text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Blood Group</p>
                      <p className="font-medium">{p.bloodGroup}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            {p.address && (p.address.street || p.address.city) && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Address
                </h4>
                <p className="text-gray-700">
                  {[
                    p.address.street,
                    p.address.city,
                    p.address.state,
                    p.address.zip,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </p>
              </div>
            )}

            {/* Medical Information */}
            {(p.height || p.weight || p.allergies || p.chronicConditions) && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart size={20} />
                  Medical Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {p.height && (
                    <div>
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium">{p.height} cm</p>
                    </div>
                  )}
                  {p.weight && (
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{p.weight} kg</p>
                    </div>
                  )}
                  {p.allergies && (
                    <div>
                      <p className="text-sm text-gray-500">Allergies</p>
                      <p className="font-medium">{p.allergies}</p>
                    </div>
                  )}
                  {p.chronicConditions && (
                    <div>
                      <p className="text-sm text-gray-500">Chronic Conditions</p>
                      <p className="font-medium">{p.chronicConditions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {p.emergencyContact && (p.emergencyContact.name || p.emergencyContact.number) && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone size={20} />
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {p.emergencyContact.name && (
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{p.emergencyContact.name}</p>
                    </div>
                  )}
                  {p.emergencyContact.number && (
                    <div>
                      <p className="text-sm text-gray-500">Number</p>
                      <p className="font-medium">{p.emergencyContact.number}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Insurance */}
            {p.insuranceInfo && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Insurance Information
                </h4>
                <p className="text-gray-700">{p.insuranceInfo}</p>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={20} />
                Statistics
              </h4>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">{appointmentCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
