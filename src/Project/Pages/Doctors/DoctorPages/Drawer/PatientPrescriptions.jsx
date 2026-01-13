import React from "react";
import {
  Pill, Calendar, Clock, Download, AlertCircle,
  CheckCircle, XCircle, Plus
} from "lucide-react";

const PatientPrescriptions = ({ patient }) => {
  console.log("dasd", patient);


  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };


  const prescriptions = patient?.medicalRecord?.medicines || [];
  const mapped = prescriptions.map((m, index) => ({
    id: index + 1,
    medication: m.medicineName,
    dosage: m.dosage,
    frequency: m.frequency,
    purpose: m.instructions || "",
    prescribedDate: m.startDate || null,
    endDate: m.endDate || null,
    doctor: m.doctorName || "Doctor",
    status: m.status || "active",   // fallback
    refills: m.refills || 0
  }));

  const currentPrescriptions = mapped.filter(p => p.status === "active");
  const pastPrescriptions = mapped.filter(p => p.status !== "active");

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
      completed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
      expired: { color: "bg-red-100 text-red-700", icon: XCircle },
      cancelled: { color: "bg-amber-100 text-amber-700", icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.active;
    const IconComponent = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${config.color}`}>
        <IconComponent size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return "--";
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const PrescriptionCard = ({ prescription }) => (
    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Pill size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">{prescription.medication}</h4>
            <p className="text-sm text-slate-600">
              {prescription.dosage} • {prescription.frequency}
            </p>
          </div>
        </div>
        {getStatusBadge(prescription.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div>
          <p className="text-xs text-slate-600 mb-1">Prescribed By</p>
          <p className="font-semibold text-slate-900">{prescription.doctor}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 mb-1">Refills Left</p>
          <p className="font-semibold text-slate-900">{prescription.refills}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 mb-1">Start Date</p>
          <p className="font-semibold text-slate-900">{formatDate(prescription.prescribedDate)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 mb-1">End Date</p>
          <p className="font-semibold text-slate-900">{formatDate(prescription.endDate)}</p>
        </div>
      </div>

      {prescription.purpose && (
        <div className="mb-3">
          <p className="text-xs text-slate-600 mb-1">Instructions</p>
          <p className="text-sm text-slate-900">{prescription.purpose}</p>
        </div>
      )}

      {prescription.status === 'active' && (
        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              {getDaysRemaining(prescription.endDate)} days remaining
            </span>
          </div>
          <button className="text-amber-700 hover:text-amber-800 text-sm font-semibold">
            Request Refill
          </button>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
          <Download size={16} />
          Download
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* ------------------ ACTIVE PRESCRIPTIONS ------------------ */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pill size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Current Prescriptions</h3>
              <p className="text-sm text-slate-600">Active medications</p>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
            <Plus size={16} />
            New Prescription
          </button>
        </div>

        <div className="grid gap-4">
          {currentPrescriptions.map((p) => (
            <PrescriptionCard key={p.id} prescription={p} />
          ))}
        </div>

        {currentPrescriptions.length === 0 && (
          <div className="text-center py-8">
            <Pill size={48} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">No active prescriptions</p>
          </div>
        )}
      </div>

      {/* ------------------ PAST PRESCRIPTIONS ------------------ */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Calendar size={20} className="text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Prescription History</h3>
              <p className="text-sm text-slate-600">Past medications</p>
            </div>
          </div>

          <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
            View Complete History
          </button>
        </div>

        <div className="grid gap-4">
          {pastPrescriptions.map((p) => (
            <PrescriptionCard key={p.id} prescription={p} />
          ))}
        </div>

        {pastPrescriptions.length === 0 && (
          <div className="text-center py-8">
            <Calendar size={48} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">No prescription history</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPrescriptions;
