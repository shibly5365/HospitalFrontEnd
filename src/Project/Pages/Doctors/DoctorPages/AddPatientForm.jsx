import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaNotesMedical,
  FaUserShield,
} from "react-icons/fa";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    dob: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    medicalInfo: "",
    emergencyContact: {
      name: "",
      number: "",
    },
    patientType: "New Patient", // default option
  });

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log(formData);
  
  // ✅ Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4002/api/doctor/createPatintes",
        formData,
        { withCredentials: true }
      );
      console.log("res", res.data);

      alert(res.data.message || "Patient added successfully!");
      console.log("Response:", res.data);
      // reset form
      setFormData({
        fullName: "",
        email: "",
        contact: "",
        age: "",
        gender: "",
        dob: "",
        address: { street: "", city: "", state: "", zip: "" },
        medicalInfo: "",
        emergencyContact: { name: "", number: "" },
        patientType: "New Patient",
      });
    } catch (error) {
      console.error("Error creating patient:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add patient");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-t-2xl px-6 py-4 -mt-6 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaUser /> Add New Patient
        </h2>
        <p className="text-sm opacity-90">
          Enter patient information to create a new medical record
        </p>
      </div>

      {/* Profile Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-teal-400 flex items-center justify-center text-teal-500 text-4xl">
            <FaUser />
          </div>
          <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full shadow-md">
            <FaUserShield />
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaPhone /> Phone Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              # Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="0"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaVenusMars /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaBirthdayCake /> Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Address Info */}
        <h3 className="text-md font-semibold flex items-center gap-2 mt-4">
          <FaMapMarkerAlt /> Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Street Address"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address.zip"
            value={formData.address.zip}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Medical Info */}
        <h3 className="text-md font-semibold flex items-center gap-2 mt-4">
          <FaNotesMedical /> Medical Information
        </h3>
        <textarea
          name="medicalInfo"
          value={formData.medicalInfo}
          onChange={handleChange}
          placeholder="Enter any medical conditions, allergies, or important notes..."
          className="w-full border rounded-lg px-3 py-2"
        ></textarea>

        {/* Emergency Contact */}
        <h3 className="text-md font-semibold flex items-center gap-2 mt-4">
          <FaPhone /> Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="emergencyContact.name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            placeholder="Emergency Contact Name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="emergencyContact.number"
            value={formData.emergencyContact.number}
            onChange={handleChange}
            placeholder="Emergency Contact Phone"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* ✅ Patient Type */}
        <h3 className="text-md font-semibold flex items-center gap-2 mt-4">
          <FaUserShield /> Patient Type
        </h3>
        <select
          name="patientType"
          value={formData.patientType}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>New Patient</option>
          <option>Returning Patient</option>
          <option>Other</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
          >
            <FaUser /> Add Patient
          </button>
          <button
            type="reset"
            className="border px-5 py-2 rounded-lg flex items-center gap-2"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
