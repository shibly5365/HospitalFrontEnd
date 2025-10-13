import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import PatientType from "./PatientType";
import Department from "./Department";
import Doctor from "./Doctor";
import TimeSlot from "./TimeSlot";
import Details from "./Details";
import Confirmation from "./Confirmation";
import Complete from "./Complete";
import axios from "axios";

const steps = [
  "Patient Type",
  "Department",
  "Doctor",
  "Time Slot",
  "Details",
  "Confirmation",
  "Complete",
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientType: "",
    visitingType: "",
    departmentId: "",
    doctorId: "",
    timeSlot: { start: "", end: "", date: "", scheduleId: "", slotId: "" },
    details: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = steps.length;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setStep(1);
    setFormData({
      patientType: "",
      visitingType: "",
      departmentId: "",
      doctorId: "",
      timeSlot: { start: "", end: "", date: "", scheduleId: "", slotId: "" },
      details: {},
    });
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        patientType: formData.patientType,
        visitingType:
          formData.visitingType === "Walk In"
            ? "Offline"
            : formData.visitingType,
        departmentId: formData.departmentId,
        doctorId: formData.doctorId,
        appointmentDate: formData.timeSlot.date, // YYYY-MM-DD
        timeSlot: {
          start: formData.timeSlot.start,
          end: formData.timeSlot.end,
        },
        scheduleId: formData.timeSlot.scheduleId,
        slotId: formData.timeSlot.slotId,
        fullName: formData.details.fullName,
        email: formData.details.email,
        contact: formData.details.phone,
        age: formData.details.age,
        gender: formData.details.gender,
        dob: formData.details.dob,
        address: {
          street: formData.details.street,
          city: formData.details.city,
          state: formData.details.state,
          zip: formData.details.zip,
        },
        reason: formData.details.medicalNotes,
        emergencyName: formData.details.emergencyName,
        emergencyPhone: formData.details.emergencyPhone,
        insuranceInfo: formData.details.insuranceProvider,
      };

      console.log("Submitting appointment date:", payload.appointmentDate);

      const res = await axios.post(
        "http://localhost:4002/api/receptionist/creating",
        payload,
        { withCredentials: true }
      );

      console.log("✅ Appointment saved:", res.data);
      nextStep();
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-50 via-white to-teal-50">
      <div className="sticky top-0 z-20 shadow-md">
        <ProgressBar steps={steps} currentStep={step} onReset={resetForm} />
      </div>

      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 transition-all duration-300">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {step === 1 && (
            <PatientType
              step={step}
              totalSteps={totalSteps}
              onNext={(data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {step === 2 && (
            <Department
              step={step}
              totalSteps={totalSteps}
              onNext={(deptId) => {
                setFormData((prev) => ({ ...prev, departmentId: deptId }));
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {step === 3 && (
            <Doctor
              selectedDept={formData.departmentId}
              step={step}
              totalSteps={totalSteps}
              onNext={(doctorId) => {
                setFormData((prev) => ({ ...prev, doctorId }));
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {step === 4 && (
            <TimeSlot
              selectedDoctor={formData.doctorId}
              step={step}
              totalSteps={totalSteps}
              onNext={(slot) => {
                setFormData((prev) => ({
                  ...prev,
                  timeSlot: {
                    date: new Date(slot.date).toISOString().split("T")[0], // ✅ fixed
                    start: slot.start,
                    end: slot.end,
                    scheduleId: slot.scheduleId,
                    slotId: slot.slotId,
                  },
                }));
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {step === 5 && (
            <Details
              step={step}
              totalSteps={totalSteps}
              onNext={(details) => {
                setFormData((prev) => ({ ...prev, details }));
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {step === 6 && (
            <Confirmation
              formData={formData}
              step={step}
              totalSteps={totalSteps}
              onConfirm={handleSubmit}
              onBack={prevStep}
              loading={loading}
            />
          )}

          {step === 7 && <Complete onReset={resetForm} />}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
