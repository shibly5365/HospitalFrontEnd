import React from "react";
import { ChevronLeft, Edit, Power, User } from "lucide-react";

const DashboardHeader = ({ doctor, onClose, onEdit, onStatusToggle }) => {

  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            {doctor.basicInfo.profileImage ? (
              <img
                src={doctor.basicInfo.profileImage}
                alt={doctor.basicInfo.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {doctor.basicInfo.name}
              </h1>
              <p className="text-sm text-gray-500">
                {doctor.basicInfo.doctorId || doctor._id} • {doctor.basicInfo.department}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              doctor.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {doctor.status || "Active"}
          </div>
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={onStatusToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              doctor.status === "Active"
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            <Power className="w-4 h-4" />
            <span>
              {doctor.status === "Active" ? "Deactivate" : "Activate"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;