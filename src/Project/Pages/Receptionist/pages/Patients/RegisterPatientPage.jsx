import { apiClient } from "../../../../../services/queryClient";
import React, { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { notify } from "../../../../../units/notification";
import { useNavigate } from "react-router-dom";
import FormHeader from "./registser/FormHeader";
import RegistrationSidebar from "./registser/RegistrationSidebar";
import PatientForm from "./registser/PatientForm";

export default function RegisterPatientPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "", email: "", contact: "", dob: "", age: "", gender: "",
    address: { street: "", city: "", state: "", zip: "" },
    emergencyContact: { name: "", number: "" },
    insuranceInfo: "", bloodGroup: "", allergies: "", chronicConditions: "",
    height: "", weight: "", patientType: "New Patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let age = formData.age;
      if (formData.dob && !age) {
        const today = new Date();
        const birthDate = new Date(formData.dob);
        age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      }

      const payload = {
        ...formData,
        age: age ? parseInt(age) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        dob: formData.dob ? new Date(formData.dob) : undefined,
      };

      const res = await apiClient.post(
        "/receptionist/patients/register",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        notify.success("Patient registered successfully!");
        setFormData({
          fullName: "", email: "", contact: "", dob: "", age: "", gender: "",
          address: { street: "", city: "", state: "", zip: "" },
          emergencyContact: { name: "", number: "" },
          insuranceInfo: "", bloodGroup: "", allergies: "", chronicConditions: "",
          height: "", weight: "", patientType: "New Patient",
        });
        setTimeout(() => navigate("/receptionist/patients/view-search"), 1500);
      }
    } catch (err) {
      console.error("Error registering patient:", err);
      notify.error(err.response?.data?.message || "Failed to register patient");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "personal", label: "Personal", icon: "User" },
    { id: "address", label: "Address", icon: "Home" },
    { id: "medical", label: "Medical", icon: "Stethoscope" },
    { id: "emergency", label: "Emergency", icon: "Phone" },
    { id: "insurance", label: "Insurance", icon: "Shield" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <FormHeader onClose={() => navigate("/receptionist/patients/view-search")} />

        <div className="flex flex-col lg:flex-row gap-6">
          <RegistrationSidebar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <PatientForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            sections={sections}
          />
        </div>
      </div>
    </div>
  );
}