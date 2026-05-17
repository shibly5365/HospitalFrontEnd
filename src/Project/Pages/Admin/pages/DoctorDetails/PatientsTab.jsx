import React, { useState } from "react";
import { Filter } from "lucide-react";

const PatientsTab = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Patient List</h3>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            />
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Visit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50">
                  {/* 👤 NAME + IMAGE */}
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img
                      src={patient.profileImage || "/default-avatar.png"}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </span>
                  </td>

                  {/* 🆔 PATIENT ID */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.patientId || "N/A"}
                  </td>

                  {/* 📞 CONTACT */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.contact || "N/A"}
                  </td>

                  {/* ⚥ GENDER */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.gender || "N/A"}
                  </td>

                  {/* 🎂 AGE */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.age || "N/A"}
                  </td>

                  {/* 📅 LAST VISIT */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTab;
