// components/AppointmentsTable.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import AppointmentRow from './AppointmentRow';

export default function AppointmentsTable({ 
  appointments, 
  openMenu, 
  onMenuToggle, 
  onViewDetails, 
  onEdit, 
  onCancel 
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Patient</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Doctor</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Time</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="text-center p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <AppointmentRow
                  key={appointment._id}
                  appointment={appointment}
                  openMenu={openMenu}
                  onMenuToggle={onMenuToggle}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onCancel={onCancel}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <Calendar size={32} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">No appointments found</p>
                    <p className="text-sm text-slate-400">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}