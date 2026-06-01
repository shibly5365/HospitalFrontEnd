// components/NewAppointmentModal.jsx
import React from 'react';
import { XCircle } from 'lucide-react';

const NewAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--surface)] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--line)] p-6 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-2xl font-bold text-[var(--text)]">New Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--surface-soft)] rounded-xl transition"
          >
            <XCircle size={24} className="text-[var(--muted)]" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-[var(--muted)] text-center py-8">Appointment form will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;