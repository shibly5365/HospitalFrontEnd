import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorTable = ({ doctors, onView, onEdit, onDelete }) => {
    const navigate = useNavigate()
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Specialization
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Doctor ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Patients
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Today's Apps
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {doctors.map((doc) => (
            <tr
              key={doc._id}
              className="hover:bg-gray-50 transition-colors cursor-pointer group"
              onClick={() => onView(doc)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      doc.profileImage ||
                      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop"
                    }
                    alt={doc.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {doc.userId?.fullName || doc.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {doc.email || "No email"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                  {doc.department || "N/A"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700">
                  {doc.specialization || "N/A"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {doc.doctorId || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {doc.totalPatients || 0}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {doc.todaysAppointments || 0}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    doc.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${doc.status === "available" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  {doc.status === "available" ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => navigate(`/admin/doctorView/${doc._id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(doc._id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Doctor"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() =>
                      onDelete(
                        doc._id,
                        doc.userId?.fullName || doc.name || "this doctor"
                      )
                    }
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Doctor"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;