import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaUser,
  FaBuilding,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  contact: "",
  profileImage: null,
  departmentName: "",
  specialization: "",
  qualification: "",
  experience: "",
  salary: "",
  consultationType: "",
  consultationFee: "",
  bio: "",
  status: true,
  days: [],
  slots: [{ from: "09:00", to: "10:00" }],
};

const AddDoctorForm = () => {
  const navigate = useNavigate();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [formData, setFormData] = useState(initialState);
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProfileUpload = (e) =>
    setFormData({ ...formData, profileImage: e.target.files[0] });

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.slots];
    updatedSlots[index][field] = value;
    setFormData({ ...formData, slots: updatedSlots });
  };

  const addSlot = () =>
    setFormData({
      ...formData,
      slots: [...formData.slots, { from: "", to: "" }],
    });

  const removeSlot = (index) => {
    if (formData.slots.length > 1) {
      const updatedSlots = [...formData.slots];
      updatedSlots.splice(index, 1);
      setFormData({ ...formData, slots: updatedSlots });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formPayload = new FormData();

    // Append all text fields
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);
    formPayload.append("contact", formData.contact);
    formPayload.append("departmentName", formData.departmentName);
    formPayload.append("specialization", formData.specialization);
    formPayload.append("qualification", formData.qualification);
    formPayload.append("experience", formData.experience);
    formPayload.append("salary", formData.salary);
    formPayload.append("consultationType", formData.consultationType);
    formPayload.append("consultationFee", formData.consultationFee);
    formPayload.append("bio", formData.bio);
    formPayload.append("status", formData.status ? "available" : "unavailable");

    // Days and Slots as JSON strings
    formPayload.append("availableDays", JSON.stringify(formData.days));
    formPayload.append(
      "availableSlots",
      JSON.stringify(
        formData.slots.map((s) => ({ start: s.from, end: s.to }))
      )
    );

    // Append profile image if exists
    if (formData.profileImage) {
      formPayload.append("profileImage", formData.profileImage);
    }

    const res = await axios.post(
      "http://localhost:4002/api/admin/create-Doctor",
      formPayload,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    console.log("✅ Doctor created:", res.data);
    navigate("/admin/admin-doctorDetails");
  } catch (err) {
    console.error("❌ Error creating doctor:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to create doctor");
  }
};


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getdepartmenst",
          {
            withCredentials: true,
          }
        );
        setDepartments(res.data.data);
        // console.log(res.data.data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  const resetForm = () => setFormData(initialState);

  return (
    <div className="w-full max-w-[80%] mx-auto bg-gradient-to-b from-green-50 to-white shadow-xl rounded-2xl p-10 mt-10 mb-10 space-y-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Header */}
      <div className="text-center mt-6">
        <div className="bg-green-500 text-white p-5 rounded-full w-fit mx-auto shadow-md">
          <FaUser className="text-4xl" />
        </div>
        <h2 className="text-3xl font-bold mt-4">Add New Doctor</h2>
        <p className="text-gray-500 mt-2">
          Create a new doctor profile for the healthcare system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600">
            <FaUser /> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Enter doctor's full name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Create a secure password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Enter specialization"
                required
              />
            </div>
          </div>

          {/* Profile Upload */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileUpload}
              className="w-full p-3 border rounded-lg cursor-pointer"
            />
            {formData.profileImage && (
              <p className="mt-2 text-green-500 font-medium">
                {formData.profileImage.name}
              </p>
            )}
          </div>
        </div>

        {/* Professional Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-purple-600">
            <FaBuilding /> Professional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Department</label>
              <select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                required
              >
                <option value="">Select department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep.name}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="e.g., MBBS, MD, PhD"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Years of experience"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Salary (Annual)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Annual salary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Consultation Type
              </label>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              >
                <option value="">Select consultation type</option>
                <option value="online">Online</option>
                <option value="offline">In-person</option>{" "}
                {/* value must be "offline" */}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Consultation Fee
              </label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder="Fee per consultation"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-pink-600">
            <FaCalendarAlt /> Availability & Settings
          </h3>

          {/* Days */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`px-4 py-2 rounded-lg text-sm min-w-[60px] ${
                  formData.days.includes(day)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="space-y-3">
            {formData.slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="time"
                  value={slot.from}
                  onChange={(e) =>
                    handleSlotChange(index, "from", e.target.value)
                  }
                  className="p-2 border rounded-lg"
                />
                <span>to</span>
                <input
                  type="time"
                  value={slot.to}
                  onChange={(e) =>
                    handleSlotChange(index, "to", e.target.value)
                  }
                  className="p-2 border rounded-lg"
                />
                {formData.slots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSlot}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg mt-2"
            >
              + Add Slot
            </button>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Professional Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              rows={4}
              placeholder="Enter doctor's professional bio, specialization, and background..."
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 mt-6">
            <label className="flex items-center gap-2 text-green-600 font-medium">
              <input
                type="checkbox"
                checked={formData.status}
                onChange={() =>
                  setFormData({ ...formData, status: !formData.status })
                }
                className="w-5 h-5"
              />
              Active – Doctor can receive appointments
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-lg"
          >
            Create Doctor Profile
          </button>
          <button
            type="reset"
            onClick={resetForm}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg"
          >
            Reset Form
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-red-100 text-red-600 rounded-lg"
            onClick={() => navigate("/admin/doctors")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
