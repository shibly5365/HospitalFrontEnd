import { apiClient } from "../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import FormStepper from "./doctorsForm/FormStepper";
import PersonalInfo from "./doctorsForm/PersonalInfo";
import ProfessionalInfo from "./doctorsForm/ProfessionalInfo";
import AvailabilityInfo from "./doctorsForm/AvailabilityInfo";
import AdditionalInfo from "./doctorsForm/AdditionalInfo";
import DoctorPreview from "./doctorsForm/DoctorPreview";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  contact: "",
  profileImage: null,
  profileImagePreview: null,
  gender: "",
  dateOfBirth: "",
  departmentName: "",
  specialization: "",
  qualification: "",
  experience: "",
  medicalLicenseNumber: "",
  salary: "",
  consultationType: "",
  consultationFee: "",
  bio: "",
  status: true,
  days: [],
  slots: [{ from: "09:00", to: "10:00" }],
  languages: [],
  certifications: "",
  tags: [],
};

const AddDoctorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [departments, setDepartments] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (!formData.contact) newErrors.contact = "Contact number is required";
      else if (!/^[0-9]{10}$/.test(formData.contact)) newErrors.contact = "Invalid phone number";
    }
    
    if (currentStep === 2) {
      if (!formData.departmentName) newErrors.departmentName = "Department is required";
      if (!formData.specialization) newErrors.specialization = "Specialization is required";
      if (!formData.qualification) newErrors.qualification = "Qualification is required";
      if (!formData.medicalLicenseNumber) newErrors.medicalLicenseNumber = "Medical license number is required";
    }
    
    if (currentStep === 3) {
      if (formData.days.length === 0) newErrors.days = "At least one working day is required";
      formData.slots.forEach((slot, index) => {
        if (!slot.from || !slot.to) {
          newErrors[`slot_${index}`] = "Both start and end time are required";
        } else if (slot.from >= slot.to) {
          newErrors[`slot_${index}`] = "End time must be after start time";
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      const formatted = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleProfileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          profileImage: file,
          profileImagePreview: reader.result 
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, profileImage: null, profileImagePreview: null });
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
    if (errors.days) setErrors({ ...errors, days: "" });
  };

  const handleLanguageToggle = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.slots];
    updatedSlots[index][field] = value;
    setFormData({ ...formData, slots: updatedSlots });
    if (errors[`slot_${index}`]) {
      setErrors({ ...errors, [`slot_${index}`]: "" });
    }
  };

  const addSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { from: "", to: "" }],
    });
  };

  const removeSlot = (index) => {
    if (formData.slots.length > 1) {
      const updatedSlots = [...formData.slots];
      updatedSlots.splice(index, 1);
      setFormData({ ...formData, slots: updatedSlots });
    }
  };

  const saveAsDraft = () => {
    localStorage.setItem("doctorFormDraft", JSON.stringify(formData));
    toast.success("Form saved as draft!");
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("doctorFormDraft");
    if (draft) {
      setFormData(JSON.parse(draft));
      toast.info("Draft loaded successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      const formPayload = new FormData();
      
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
      formPayload.append("gender", formData.gender);
      formPayload.append("dateOfBirth", formData.dateOfBirth);
      formPayload.append("medicalLicenseNumber", formData.medicalLicenseNumber);
      formPayload.append("languages", JSON.stringify(formData.languages));
      formPayload.append("certifications", formData.certifications);
      formPayload.append("tags", JSON.stringify(formData.tags));
      formPayload.append("availableDays", JSON.stringify(formData.days));
      formPayload.append(
        "availableSlots",
        JSON.stringify(formData.slots.map((s) => ({ start: s.from, end: s.to })))
      );
      
      if (formData.profileImage) {
        formPayload.append("profileImage", formData.profileImage);
      }
      
      await apiClient.post(
        "/admin/create-Doctor",
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      
      toast.success("Doctor created successfully!");
      localStorage.removeItem("doctorFormDraft");
      setTimeout(() => navigate("/admin/admin-doctorDetails"), 1500);
    } catch (err) {
      console.error("Error creating doctor:", err);
      toast.error(err.response?.data?.message || "Failed to create doctor");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiClient.get(
          "/admin/getdepartmenst",
          { withCredentials: true }
        );
        setDepartments(res.data.data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };
    fetchDepartments();
    loadDraft();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FaArrowLeft /> Back to Doctors
          </button>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full w-fit mx-auto shadow-lg">
              <FaUser className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Add New Doctor</h1>
            <p className="text-gray-500 mt-2">Create a comprehensive doctor profile</p>
          </div>
        </div>

        <FormStepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {currentStep === 1 && (
                <PersonalInfo
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleProfileUpload={handleProfileUpload}
                />
              )}

              {currentStep === 2 && (
                <ProfessionalInfo
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  departments={departments}
                />
              )}

              {currentStep === 3 && (
                <AvailabilityInfo
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleDayToggle={handleDayToggle}
                  handleSlotChange={handleSlotChange}
                  addSlot={addSlot}
                  removeSlot={removeSlot}
                />
              )}

              {currentStep === 4 && (
                <AdditionalInfo
                  formData={formData}
                  handleChange={handleChange}
                  handleLanguageToggle={handleLanguageToggle}
                  handleTagToggle={handleTagToggle}
                  languagesList={["English", "Hindi", "Spanish", "French", "German", "Arabic", "Chinese"]}
                  tagsList={["Senior", "Emergency Specialist", "Pediatrician", "Surgeon", "Consultant"]}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 mt-8 pt-6 border-t">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={saveAsDraft}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading ? "Creating..." : "Create Doctor"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <DoctorPreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;