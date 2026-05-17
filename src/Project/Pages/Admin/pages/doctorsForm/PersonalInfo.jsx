import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaVenusMars,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import ImageUpload from "./common/ImageUpload";
import InputField from "./common/InputField";
import PasswordStrength from "./common/PasswordStrength";
import SelectField from "./common/SelectField";

const PersonalInfo = ({
  formData,
  errors,
  handleChange,
  handleProfileUpload,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaUser className="text-green-500" /> Personal Information
      </h2>

      <ImageUpload
        onUpload={handleProfileUpload}
        preview={formData.profileImagePreview}
        error={errors.profileImage}
      />

      <InputField
        icon={FaUser}
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
        placeholder="Dr. John Doe"
      />

      <InputField
        icon={FaEnvelope}
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder="doctor@hospital.com"
      />

      <div className="relative">
        <InputField
          icon={FaLock}
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          placeholder="Create a secure password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <PasswordStrength password={formData.password} />
      </div>

      <InputField
        icon={FaPhone}
        label="Phone Number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        error={errors.contact}
        required
        placeholder="9876543210"
      />

      <SelectField
        icon={FaVenusMars}
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { value: "", label: "Select gender" },
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ]}
      />

      <InputField
        icon={FaCakeCandles}
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        placeholder="YYYY-MM-DD"
      />
    </div>
  );
};

export default PersonalInfo;
