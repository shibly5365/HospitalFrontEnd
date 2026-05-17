import React from "react";
import { FaBuilding, FaStethoscope, FaGraduationCap, FaBriefcase, FaIdCard, FaMoneyBillWave } from "react-icons/fa";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";

const ProfessionalInfo = ({ formData, errors, handleChange, departments }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaBuilding className="text-purple-500" /> Professional Information
      </h2>
      
      <SelectField
        icon={FaBuilding}
        label="Department"
        name="departmentName"
        value={formData.departmentName}
        onChange={handleChange}
        options={[
          { value: "", label: "Select department" },
          ...departments.map((dep) => ({ value: dep.name, label: dep.name })),
        ]}
        error={errors.departmentName}
        required
      />
      
      <InputField
        icon={FaStethoscope}
        label="Specialization"
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
        error={errors.specialization}
        required
        placeholder="Cardiology, Neurology, etc."
      />
      
      <InputField
        icon={FaGraduationCap}
        label="Qualification"
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        error={errors.qualification}
        required
        placeholder="MBBS, MD, PhD"
      />
      
      <InputField
        icon={FaBriefcase}
        label="Experience (Years)"
        name="experience"
        type="number"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Years of experience"
      />
      
      <InputField
        icon={FaIdCard}
        label="Medical License Number"
        name="medicalLicenseNumber"
        value={formData.medicalLicenseNumber}
        onChange={handleChange}
        error={errors.medicalLicenseNumber}
        required
        placeholder="License number"
      />
      
      <InputField
        icon={FaMoneyBillWave}
        label="Salary (Annual)"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Annual salary"
      />
    </div>
  );
};

export default ProfessionalInfo;