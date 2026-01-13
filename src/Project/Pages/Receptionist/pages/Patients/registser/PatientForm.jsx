import React from "react";
import { CheckCircle } from "lucide-react";
import { User, Home, Stethoscope, Phone, Shield } from "lucide-react";
import FormNavigation from "./FormNavigation";
import ProgressDots from "./ProgressDots";
import FormSection from "./FormSection";
// import FormSection from "./FormSection";
// import FormNavigation from "./FormNavigation";
// import ProgressDots from "./ProgressDots";

const iconMap = {
  User: <User size={18} />,
  Home: <Home size={18} />,
  Stethoscope: <Stethoscope size={18} />,
  Phone: <Phone size={18} />,
  Shield: <Shield size={18} />,
};

export default function PatientForm({
  formData,
  onChange,
  onSubmit,
  loading,
  activeSection,
  onSectionChange,
  sections,
}) {
  const currentSection = sections.find(s => s.id === activeSection);

  const renderSection = () => {
    const sectionProps = { formData, onChange };
    
    switch (activeSection) {
      case "personal":
        return <PersonalSection {...sectionProps} />;
      case "address":
        return <AddressSection {...sectionProps} />;
      case "medical":
        return <MedicalSection {...sectionProps} />;
      case "emergency":
        return <EmergencySection {...sectionProps} />;
      case "insurance":
        return <InsuranceSection {...sectionProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="p-2 bg-teal-100 rounded-lg">
            {iconMap[currentSection.icon]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {currentSection.label} Information
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Fill in the patient's {currentSection.label.toLowerCase()} details
            </p>
          </div>
        </div>

        {renderSection()}

        <FormNavigation
          activeSection={activeSection}
          sections={sections}
          onSectionChange={onSectionChange}
          loading={loading}
          isLastSection={activeSection === "insurance"}
        />

        <ProgressDots
          sections={sections}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </form>
    </div>
  );
}

// Section Components (extracted from PatientForm.jsx)
const PersonalSection = ({ formData, onChange }) => (
  <FormSection>
    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={onChange} required placeholder="Enter full name" />
    <InputField label="Email" name="email" type="email" value={formData.email} onChange={onChange} required placeholder="patient@example.com" />
    <InputField label="Contact Number" name="contact" type="tel" value={formData.contact} onChange={onChange} required placeholder="+1 234 567 8900" />
    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={onChange} />
    <InputField label="Age" name="age" type="number" value={formData.age} onChange={onChange} placeholder="Years" min="0" max="150" />
    <SelectField label="Gender" name="gender" value={formData.gender} onChange={onChange} required options={["Male", "Female", "Other"]} />
  </FormSection>
);

const AddressSection = ({ formData, onChange }) => (
  <FormSection>
    <InputField label="Street Address" name="address.street" value={formData.address.street} onChange={onChange} fullWidth placeholder="123 Main Street" />
    <InputField label="City" name="address.city" value={formData.address.city} onChange={onChange} placeholder="New York" />
    <InputField label="State" name="address.state" value={formData.address.state} onChange={onChange} placeholder="NY" />
    <InputField label="ZIP Code" name="address.zip" value={formData.address.zip} onChange={onChange} placeholder="10001" />
  </FormSection>
);

const MedicalSection = ({ formData, onChange }) => (
  <FormSection>
    <SelectField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={onChange} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
    <InputField label="Height (cm)" name="height" type="number" value={formData.height} onChange={onChange} placeholder="175" step="0.1" />
    <InputField label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={onChange} placeholder="70" step="0.1" />
    <InputField label="Allergies" name="allergies" value={formData.allergies} onChange={onChange} placeholder="Penicillin, Peanuts, etc." />
    <TextAreaField label="Chronic Conditions" name="chronicConditions" value={formData.chronicConditions} onChange={onChange} rows="4" placeholder="Diabetes, Hypertension, Asthma, etc." fullWidth />
  </FormSection>
);

const EmergencySection = ({ formData, onChange }) => (
  <FormSection>
    <InputField label="Contact Name" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={onChange} placeholder="John Doe" />
    <InputField label="Contact Number" name="emergencyContact.number" type="tel" value={formData.emergencyContact.number} onChange={onChange} placeholder="+1 234 567 8900" />
  </FormSection>
);

const InsuranceSection = ({ formData, onChange }) => (
  <FormSection>
    <TextAreaField label="Insurance Details" name="insuranceInfo" value={formData.insuranceInfo} onChange={onChange} rows="6" placeholder="Insurance provider, policy number, coverage details, etc." fullWidth />
  </FormSection>
);

// Reusable Form Components
const InputField = ({ label, name, type = "text", value, onChange, required, placeholder, fullWidth = false, ...props }) => (
  <div className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}>
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 bg-gray-50"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, required, options }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 bg-gray-50"
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows, placeholder, fullWidth = false }) => (
  <div className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 bg-gray-50"
      placeholder={placeholder}
    />
  </div>
);