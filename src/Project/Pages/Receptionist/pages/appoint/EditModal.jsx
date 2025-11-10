// components/EditModal.jsx
import React from 'react';
import { X } from 'lucide-react';

export default function EditModal({ appointment, onSave, onClose }) {
  const [editAppointment, setEditAppointment] = React.useState(appointment);

  const handleSave = () => {
    onSave(editAppointment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Edit Appointment</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Appointment Date</label>
              <input
                type="date"
                value={new Date(editAppointment.appointmentDate).toISOString().split("T")[0]}
                onChange={(e) =>
                  setEditAppointment({
                    ...editAppointment,
                    appointmentDate: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Time Slot</label>
              <input
                type="text"
                value={editAppointment.timeSlot?.start || ""}
                onChange={(e) =>
                  setEditAppointment({
                    ...editAppointment,
                    timeSlot: {
                      ...editAppointment.timeSlot,
                      start: e.target.value,
                    },
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 09:00 AM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={editAppointment.status}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  status: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>With-Doctor</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Visit</label>
            <textarea
              value={editAppointment.reason || ""}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  reason: e.target.value,
                })
              }
              rows="4"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter reason for appointment..."
            />
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-end border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/30"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}