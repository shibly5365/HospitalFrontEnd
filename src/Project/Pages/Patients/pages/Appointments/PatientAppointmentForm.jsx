import { apiClient } from "../../../../../services/queryClient";
// AppointmentBooking.jsx
import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import AppointmentDetails from "./AppointmensForm/AppointmentDetails";
import PatientInformation from "./AppointmensForm/PatientInformation";
import ReviewAndPayment from "./AppointmensForm/ReviewAndPayment";
import StepIndicator from "./AppointmensForm/StepIndicator";
import { notify } from "../../../../../UnitsTemp/notification";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = location.state || {}; // { doctor, selectedDate, selectedSlot }

  // Keep doctor object for display
  const [selectedDoctorObj] = useState(incoming.doctor || null);
  const [step, setStep] = useState(1);

  const formatLocalDate = (date) => {
    if (!(date instanceof Date)) return date;

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };
  const [formData, setFormData] = useState({
    doctorId: incoming.doctor?.id || "",
    doctorName: incoming.doctor?.name || "",
    department: incoming.doctor?.department || "",
    appointmentDate: formatLocalDate(incoming.selectedDate),
    timeSlot:
      typeof incoming.selectedSlot === "object"
        ? incoming.selectedSlot
        : { start: incoming.selectedSlot || "", end: "" },
    consultationType: "",
    reason: "",
    consultationFee: incoming.doctor?.rate || 0,
    patientName: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    insurance: "",
    paymentMethod: "upi",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // If doctor changes, also update name & fee
      if (field === "doctor" && incoming.doctor) {
        updated.consultationFee = incoming.doctor.rate;
        updated.doctorName = incoming.doctor.name;
      }

      return updated;
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const canProceedToNextStep = () => {
    if (step === 1) {
      return (
        formData.doctorId &&
        formData.appointmentDate &&
        formData.timeSlot?.start &&
        formData.timeSlot?.end &&
        formData.reason &&
        formData.department &&
        formData.consultationType
      );
    }
    if (step === 2) {
      return (
        formData.patientName &&
        formData.dob &&
        formData.gender &&
        formData.email &&
        formData.phone
      );
    }
    return true;
  };

  const handleSubmitAppointment = async () => {
    // -------- Validation --------
    if (!formData.doctorId) return notify.error("Doctor not selected!");

    if (!formData.appointmentDate)
      return notify.error("Select appointment date!");

    if (!formData.timeSlot?.start || !formData.timeSlot?.end)
      return notify.error("Select a valid time slot!");

    if (!formData.consultationType)
      return notify.error("Select consultation type!");

    if (!formData.reason) return notify.error("Please enter your reason!");

    if (!formData.patientName) return notify.error("Enter patient name!");

    if (!formData.dob) return notify.error("Enter DOB!");

    if (!formData.gender) return notify.error("Select gender!");

    if (!formData.email) return notify.error("Enter email!");

    if (!formData.phone) return notify.error("Enter phone number!");

    if (!formData.paymentMethod) return notify.error("Select payment method!");

    try {
      // ✅ Calculate Age
      const age = calculateAge(formData.dob);

      // ✅ Send all data including age
      const payload = {
        ...formData,
        age,
      };

      console.log("Sending Payload:", payload);

      // ✅ Create Appointment
      const res = await apiClient.post("/patient/create", payload, {
        withCredentials: true,
      });

      // ✅ CASH PAYMENT FLOW
      if (formData.paymentMethod === "Cash") {
        notify.success("Appointment booked successfully!");

        navigate("/patient/patient-appointments");

        return;
      }

      // ✅ DEMO ONLINE PAYMENT FLOW
      notify.info("Processing payment...");

      setTimeout(async () => {
        try {
          // ✅ Fake Payment Success
          await apiClient.put(
            `/patient/payment-success/${res.data.payment._id}`,
            {},
            {
              withCredentials: true,
            },
          );

          notify.success("Payment successful & appointment booked!");

          navigate("/patient/patient-appointments");
        } catch (paymentErr) {
          console.error(paymentErr);

          notify.error("Payment update failed");
        }
      }, 2000);
    } catch (err) {
      console.error("Backend error:", err?.response?.data || err);

      notify.error(
        err?.response?.data?.message || "Failed to book appointment",
      );
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <AppointmentDetails
            formData={formData}
            onInputChange={handleInputChange}
            incomingDoctor={selectedDoctorObj} // for display
          />
        );
      case 2:
        return (
          <PatientInformation
            formData={formData}
            onInputChange={handleInputChange}
            calculateAge={calculateAge}
          />
        );
      case 3:
        return (
          <ReviewAndPayment
            formData={formData}
            onInputChange={handleInputChange}
            selectedDoctorObj={selectedDoctorObj}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto mb-4">
        <button
          onClick={() => navigate("/patient/patient-appointments")}
          className="flex items-center gap-2 px-5 py-2 bg-white shadow-md rounded-xl text-gray-700 hover:bg-gray-100 border border-gray-200"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Book Your Appointment
            </h1>
            <p className="text-gray-600 mt-2">
              Complete the form to schedule your visit
            </p>
          </div>

          <StepIndicator step={step} />
          <div className="mt-8">{renderCurrentStep()}</div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => {
                  if (!canProceedToNextStep()) {
                    notify.error("Please fill all required fields");
                    return;
                  }
                  setStep(step + 1);
                }}
                disabled={!canProceedToNextStep()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ml-auto ${
                  canProceedToNextStep()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitAppointment}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ml-auto font-semibold"
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
