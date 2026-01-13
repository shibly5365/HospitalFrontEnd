import React from "react";
import { Phone, Mail, Eye } from "lucide-react";

const PatientTableRow = ({ patient, onViewPatient }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-700 font-semibold text-sm">
              {patient.fullName?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{patient.fullName || "N/A"}</p>
            <p className="text-xs text-slate-500">{patient.phone || "No phone"}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-900">{patient.age || "N/A"} years</p>
        <p className="text-xs text-slate-500 capitalize">{patient.gender || "N/A"}</p>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {typeof patient.reason === "string" ? patient.reason : "General"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {formatDate(patient.lastVisit)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {formatDate(patient.nextAppointment)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Call patient"
          >
            <Phone size={16} />
          </button>
          <button
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Email patient"
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => onViewPatient(patient)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="View details"
          >
            <Eye size={16} />
          </button>
          <button className="ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors">
            Schedule
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PatientTableRow;