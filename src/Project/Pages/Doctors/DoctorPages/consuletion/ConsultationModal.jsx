import React from "react";
import {
  X,
  User,
  Phone,
  Calendar,
  Clock,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Droplet,
  Pill,
  FileText,
  Edit,
  Download,
  Video,
  CheckCircle,
} from "lucide-react";

const ConsultationModal = ({ consultation, onClose }) => {
  window.console.log("Consultation Data:", consultation);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold">Consultation Details</h2>
            <p className="text-blue-100 text-sm mt-1">
              {consultation.patient?.patientId || consultation.patientId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* ==================== PATIENT INFORMATION ==================== */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">
                  {consultation.patient?.fullName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold text-gray-800">
                  {consultation.patient?.age} years
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-semibold text-gray-800">
                  {consultation.patient?.gender}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" /> Phone
                </p>
                <p className="font-semibold text-gray-800">
                  {consultation.patient?.contact}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-semibold text-gray-800">
                  {consultation?.medicalRecord?.vitals?.bloodGroup || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patient ID</p>
                <p className="font-semibold text-gray-800">
                  {consultation.patient?.patientId}
                </p>
              </div>
            </div>
          </div>

          {/* ==================== APPOINTMENT DETAILS ==================== */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Appointment Details
                </h3>
                <p className="text-sm text-gray-500">
                  Consultation information & status
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Appointment Date */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Appointment Date</p>

                <p className="text-base font-semibold text-gray-800">
                  {new Date(
                    consultation?.consultation?.appointmentDate,
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Appointment Time */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Appointment Time</p>

                <p className="text-base font-semibold text-gray-800">
                  {new Date(
                    consultation?.consultation?.appointmentDate,
                  ).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              {/* Consultation Type */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Consultation Type</p>

                <p className="text-base font-semibold text-gray-800">
                  {consultation?.consultation?.consultationType || "N/A"}
                </p>
              </div>

              {/* Reason */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 sm:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Reason for Visit</p>

                <p className="text-base font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                  {consultation?.consultation?.reason || "No reason provided"}
                </p>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">
                  Consultation Status
                </p>

                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold
        ${
          consultation?.consultation?.status === "Completed"
            ? "bg-green-100 text-green-700"
            : consultation?.consultation?.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
        }`}
                >
                  {consultation?.consultation?.status}
                </span>
              </div>
            </div>
          </div>

          {/* ==================== VITAL SIGNS ==================== */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="font-semibold text-lg">
                  {consultation.bp || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="font-semibold text-lg">
                  {consultation?.medicalRecord?.vitals?.heartRate || "—"}{" "}
                  <span className="text-sm font-normal">bpm</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-semibold text-lg">
                  {consultation?.medicalRecord?.vitals?.temperature || "—"}{" "}
                  <span className="text-sm font-normal">°F</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-semibold text-lg">
                  {consultation?.medicalRecord?.vitals?.weight || "—"}{" "}
                  <span className="text-sm font-normal">kg</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SpO₂</p>
                <p className="font-semibold text-lg">
                  {consultation?.medicalRecord?.vitals?.spo2 || "—"}{" "}
                  <span className="text-sm font-normal">%</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Sugar</p>
                <p className="font-semibold text-lg">
                  {consultation?.medicalRecord?.vitals?.sugar || "—"}{" "}
                  <span className="text-sm font-normal">mg/dL</span>
                </p>
              </div>
            </div>
          </div>

          {/* ==================== CLINICAL ASSESSMENT ==================== */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Clinical Assessment
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Symptoms
                </p>
                <p className="bg-gray-50 p-4 rounded-xl">
                  {consultation.medicalRecord?.symptoms}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Chief Complaint
                </p>
                <p className="bg-gray-50 p-4 rounded-xl">
                  {consultation?.medicalRecord?.chiefComplaint}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Diagnosis
                </p>
                <p className="bg-green-50 p-4 rounded-xl font-medium text-green-800">
                  {consultation.medicalRecord?.diagnosis?.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* ==================== PRESCRIPTION ==================== */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Pill className="w-5 h-5 text-green-600" />
              Prescription
            </h3>

            {consultation.prescription?.medicines?.length > 0 ? (
              <div className="space-y-4">
                {consultation.prescription?.medicines.map((med, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 border border-green-100"
                  >
                    <p className="font-bold text-lg text-gray-800 mb-3">
                      {med.name}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Dosage</span>
                        <p className="font-medium">{med.dosage}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Frequency</span>
                        <p className="font-medium">{med.frequency}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration</span>
                        <p className="font-medium">{med.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">MedicineName</span>
                        <p className="font-medium">{med.medicineName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Instructions</span>
                        <p className="font-medium text-gray-700">
                          {med.instructions || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 bg-white p-6 rounded-xl text-center">
                No medicines prescribed yet
              </p>
            )}
          </div>

          {/* ==================== FOLLOW-UP & NOTES ==================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultation.followUp && (
              <div className="bg-yellow-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  Follow-up Date
                </h3>
                <p className="text-xl font-semibold text-yellow-700">
                  {consultation.followUp}
                </p>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Doctor's Notes
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {consultation.medicalRecord?.notes || "No additional notes."}
              </p>
            </div>
          </div>

          {/* ==================== ACTION BUTTONS ==================== */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            {consultation.type === "Online" &&
              consultation.status === "Pending" && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Start Video Consultation
                </button>
              )}

            {consultation.status === "Pending" && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Mark as Completed
              </button>
            )}

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Prescription
            </button>

            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </button>

            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Send Follow-up Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
