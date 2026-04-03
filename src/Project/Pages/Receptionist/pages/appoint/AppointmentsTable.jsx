// components/AppointmentsTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentRow from "./AppointmentRow";

export default function AppointmentsTable({
  appointments,
  openMenu,
  onMenuToggle,
  onViewDetails,
  onEdit,
  onCancel,
}) {
  const PAGE_SIZE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(appointments.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [appointments]);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return appointments.slice(start, start + PAGE_SIZE);
  }, [appointments, currentPage]);

  const startItem = appointments.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = appointments.length === 0
    ? 0
    : Math.min((currentPage - 1) * PAGE_SIZE + paginatedAppointments.length, appointments.length);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Doctor
              </th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Department
              </th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.length > 0 ? (
              paginatedAppointments.map((appointment) => (
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
                    <p className="text-slate-500 font-medium">
                      No appointments found
                    </p>
                    <p className="text-sm text-slate-400">
                      Try adjusting your filters
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {appointments.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
          <p className="text-sm text-slate-600">
            Showing {startItem}-{endItem} of {appointments.length} appointments
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            <span className="px-2 text-sm font-medium text-slate-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
