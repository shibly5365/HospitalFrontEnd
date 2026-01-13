import React from "react";
import { Phone, Mail, Eye, User } from "lucide-react";
import PatientTableRow from "./PatientTableRow";

const PatientsTable = ({ patients, totalPatients, onViewPatient }) => {
  return (
    <>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Demographics
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient, index) => (
                <PatientTableRow
                  key={patient._id || index}
                  patient={patient}
                  onViewPatient={onViewPatient}
                />
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="inline-flex flex-col items-center">
                      <User size={48} className="text-slate-300 mb-3" />
                      <p className="text-slate-600 font-medium mb-1">No patients found</p>
                      <p className="text-slate-500 text-sm">
                        {totalPatients === 0 ? "Add your first patient to get started" : "Try adjusting your search"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {patients.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{patients.length}</span> of{" "}
            <span className="font-medium">{totalPatients}</span> patients
          </p>
        </div>
      )}
    </>
  );
};

export default PatientsTable;