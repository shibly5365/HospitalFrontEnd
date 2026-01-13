// PatientFooter.jsx
import React from "react";
import { Download, Share2, Edit } from "lucide-react";

const PatientFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4">
      <div className="flex gap-3">
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
          <Download size={18} />
          Export
        </button>
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
          <Share2 size={18} />
          Share
        </button>
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
          <Edit size={18} />
          Edit Patient
        </button>
      </div>
    </div>
  );
};

export default PatientFooter;