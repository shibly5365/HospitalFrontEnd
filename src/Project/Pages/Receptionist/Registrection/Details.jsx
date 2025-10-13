import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileMedical, FaShieldAlt } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  dob: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  medicalNotes: "",
  emergencyName: "",
  emergencyPhone: "",
  insuranceProvider: "",
  policyNumber: "",
};

const Details = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return "Full Name and Phone are required";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email address";
    }
    if (formData.age && (formData.age <= 0 || formData.age > 120)) {
      return "Age must be a valid number";
    }
    if (formData.emergencyPhone && !/^\d{7,15}$/.test(formData.emergencyPhone)) {
      return "Emergency phone must be numeric and 7-15 digits";
    }
    return null;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 mb-10">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-xl mb-6">
        <div className="flex items-center gap-3">
          <HiOutlineUserGroup className="text-2xl" />
          <div>
            <h2 className="text-xl font-semibold">Add New Patient</h2>
            <p className="text-sm">Enter patient information to create a new medical record</p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleNext} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1"><FaUser /> Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-1"><FaEnvelope /> Email Address (optional)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-1"><FaPhone /> Phone Number *</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">Age (optional)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">Gender (optional)</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">Date of Birth (optional)</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="flex items-center gap-2 font-semibold mb-1"><FaMapMarkerAlt /> Address Information (optional)</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" className="w-full border border-gray-300 rounded-lg p-2 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border border-gray-300 rounded-lg p-2" />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border border-gray-300 rounded-lg p-2" />
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
        </div>

        {/* Medical Info */}
        <div>
          <label className="flex items-center gap-2 font-semibold mb-1"><FaFileMedical /> Medical Information (optional)</label>
          <textarea name="medicalNotes" value={formData.medicalNotes} onChange={handleChange} placeholder="Enter medical conditions, allergies, or notes" className="w-full border border-gray-300 rounded-lg p-2" />
        </div>

        {/* Emergency & Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Emergency Contact Name" className="w-full border border-gray-300 rounded-lg p-2" />
          <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="Emergency Contact Phone" className="w-full border border-gray-300 rounded-lg p-2" />
          <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} placeholder="Insurance Provider" className="w-full border border-gray-300 rounded-lg p-2" />
          <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} placeholder="Policy Number" className="w-full border border-gray-300 rounded-lg p-2" />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onBack} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">⬅ Previous</button>
          <div className="flex gap-4">
            <button type="button" onClick={handleReset} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">Reset</button>
            <button type="submit" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90">Next ➡</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Details;
