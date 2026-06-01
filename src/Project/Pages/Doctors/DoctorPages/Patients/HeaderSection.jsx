import React from "react";
import { Plus } from "lucide-react";

const HeaderSection = ({ onAddPatient }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text)] mb-1">Patient Records</h1>
          <p className="text-[var(--muted)] text-sm">
            Manage and monitor patient information and appointments
          </p>
        </div>
        <button
          onClick={onAddPatient}
          className="inline-flex items-center gap-2 bg-[var(--brand)] px-5 py-2.5 rounded-lg hover:bg-[var(--brand-dark)] transition-colors font-medium shadow-sm"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;