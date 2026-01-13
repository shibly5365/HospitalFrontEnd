// PatientNotes.jsx
import React from "react";
import { FileText } from "lucide-react";

const PatientNotes = ({ patient }) => {
  // console.log("doctonot", patient.doctorNotes);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-amber-50 rounded-lg">
          <FileText size={18} className="text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Doctor's Notes</h3>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="space-y-3">
          {patient.doctorNotes?.length > 0 ? (
            patient.doctorNotes.map((n, index) => (
              <p
                key={index}
                className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-xl border"
              >
                {n.note}
              </p>
            ))
          ) : (
            <p className="text-sm text-slate-600">No notes available for this patient.</p>
          )}
        </div>


      </div>
    </div>
  );
};

export default PatientNotes;