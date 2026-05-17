import React from "react";
import { FaUser } from "react-icons/fa";

const DoctorPreview = ({ formData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Doctor Preview</h3>
      <div className="text-center">
        {formData.profileImagePreview ? (
          <img
            src={formData.profileImagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto object-cover mb-3"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-3">
            <FaUser className="w-10 h-10 text-gray-400" />
          </div>
        )}
        <h4 className="font-semibold text-gray-800">{formData.fullName || "Doctor Name"}</h4>
        <p className="text-sm text-gray-600">{formData.specialization || "Specialization"}</p>
        <p className="text-xs text-gray-500 mt-1">{formData.departmentName || "Department"}</p>
      </div>
      <div className="border-t mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Experience:</span>
          <span className="font-medium">{formData.experience || 0} years</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Consultation Fee:</span>
          <span className="font-medium">₹{formData.consultationFee || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${formData.status ? 'text-green-600' : 'text-red-600'}`}>
            {formData.status ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorPreview;