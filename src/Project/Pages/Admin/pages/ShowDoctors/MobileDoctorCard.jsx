import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const MobileDoctorCard = ({ doctor, onView, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={
          doctor.profileImage ||
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop"
        }
        alt={doctor.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {doctor.userId?.fullName || doctor.name || "N/A"}
        </h3>
        <p className="text-sm text-gray-500">
          {doctor.specialization || "General Physician"}
        </p>
      </div>
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          doctor.status === "available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${doctor.status === "available" ? "bg-green-500" : "bg-red-500"}`}
        />
        {doctor.status === "available" ? "Available" : "Unavailable"}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
      <div>
        <p className="text-gray-500 text-xs">Department</p>
        <p className="font-medium">{doctor.department || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Specialization</p>
        <p className="font-medium">{doctor.specialization || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Doctor ID</p>
        <p className="font-medium text-xs">{doctor.doctorId || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs">Patients</p>
        <p className="font-medium">{doctor.totalPatients || 0}</p>
      </div>
    </div>

    <div className="flex items-center justify-end gap-2 pt-2 border-t">
      <button
        onClick={() => onView(doctor)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={() => onEdit(doctor._id)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Edit Doctor"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onDelete(doctor._id, doctor.userId?.fullName || doctor.name || "this doctor")}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete Doctor"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default MobileDoctorCard;