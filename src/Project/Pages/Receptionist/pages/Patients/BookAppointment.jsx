import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { 
  ChevronRight, ChevronLeft, ArrowLeft, CheckCircle,
  Users, Stethoscope, Calendar, CreditCard, Receipt, Clock, X
} from "lucide-react";
import { notify } from "../../../../../UnitsTemp/notification";
import { useNavigate } from "react-router-dom";
import PatientStep from "./registser/components/PatientStep";
import DepartmentStep from "./registser/components/DepartmentStep";
import DoctorStep from "./registser/components/DoctorStep";
import DateTimeStep from "./registser/components/DateTimeStep";
import PaymentStep from "./registser/components/PaymentStep";
import ReceiptStep from "./registser/components/ReceiptStep";


const STEPS = [
  { id: 1, title: "Select Patient", icon: Users },
  { id: 2, title: "Select Department", icon: Stethoscope },
  { id: 3, title: "Select Doctor", icon: Users },
  { id: 4, title: "Select Date & Time", icon: Calendar },
  { id: 5, title: "Payment", icon: CreditCard },
  { id: 6, title: "Receipt", icon: Receipt },
];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step states
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [consultationType, setConsultationType] = useState("Offline");
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amount, setAmount] = useState(500);
  const [appointmentData, setAppointmentData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await apiClient.get(
          "/receptionist/patients",
          { withCredentials: true }
        );
        if (res.data.success && res.data.data) {
          setPatients(res.data.data.patients || []);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        notify.error("Failed to load patients");
      }
    };
    fetchPatients();
  }, []);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiClient.get(
          "/receptionist/departments",
          { withCredentials: true }
        );
        if (res.data.success && res.data.data) {
          setDepartments(res.data.data.departments || []);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
        notify.error("Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors when department changes
  useEffect(() => {
    if (!selectedDepartment) {
      setDoctors([]);
      return;
    }
    const fetchDoctors = async () => {
      try {
        const res = await apiClient.get(
          `/receptionist/doctors?department=${selectedDepartment}`,
          { withCredentials: true }
        );
        if (res.data.success && res.data.data) {
          setDoctors(res.data.data.doctors || []);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        notify.error("Failed to load doctors");
      }
    };
    fetchDoctors();
    setSelectedDoctor("");
    setAvailableDates([]);
    setSelectedDate("");
    setAvailableSlots([]);
  }, [selectedDepartment]);

  // Fetch available dates for doctor
  useEffect(() => {
    if (!selectedDoctor) {
      setAvailableDates([]);
      return;
    }
    const fetchSchedule = async () => {
      try {
        const res = await apiClient.get(
          `/receptionist/doctor/${selectedDoctor}/available-dates`,
          { withCredentials: true }
        );
        if (res.data && res.data.availableDates) {
          const datesWithDays = res.data.availableDates.map((dateStr) => {
            const date = new Date(dateStr);
            return {
              _id: dateStr,
              date: dateStr,
              dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
            };
          });
          setAvailableDates(datesWithDays);
        }
      } catch (err) {
        console.error("Error fetching doctor schedule:", err);
        notify.error("Failed to load available dates");
      }
    };
    fetchSchedule();
    setSelectedDate("");
    setAvailableSlots([]);
  }, [selectedDoctor]);

  // Fetch slots for doctor + date
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setAvailableSlots([]);
      return;
    }
    const fetchSlots = async () => {
      try {
        const res = await apiClient.get(
          `/receptionist/doctor/${selectedDoctor}/slots?date=${selectedDate}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          const slots = res.data.availableSlots || [];
          setAvailableSlots(slots);
        }
      } catch (err) {
        console.error("Error fetching available slots:", err);
        notify.error("Failed to load available slots");
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  const handleNext = () => {
    if (currentStep === 1 && !selectedPatient) {
      notify.error("Please select a patient");
      return;
    }
    if (currentStep === 2 && !selectedDepartment) {
      notify.error("Please select a department");
      return;
    }
    if (currentStep === 3 && !selectedDoctor) {
      notify.error("Please select a doctor");
      return;
    }
    if (currentStep === 4 && (!selectedDate || !selectedSlot)) {
      notify.error("Please select date and time slot");
      return;
    }
    if (currentStep === 5) {
      handleBookAppointment();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedSlot) {
      notify.error("Please complete all required fields");
      return;
    }

    setLoading(true);
    try {
      const appointmentDate = new Date(selectedDate);
      if (isNaN(appointmentDate.getTime())) {
        notify.error("Invalid date selected");
        setLoading(false);
        return;
      }

      const appointmentPayload = {
        patient: selectedPatient._id,
        doctor: selectedDoctor,
        appointmentDate: appointmentDate.toISOString(),
        timeSlot: {
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
        consultationType: consultationType || "Offline",
        reason: reason || "General Consultation",
        isFollowUp: false,
        payment: {
          method: paymentMethod || "Cash",
          amount: amount || 500,
          status: "Paid",
          channel: "WalkIn",
          type: "Initial",
        },
      };

      const res = await apiClient.post(
        "/receptionist/book-with-payment",
        appointmentPayload,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAppointmentData(res.data.data.appointment);
        setPaymentData(res.data.data.payment);
        setCurrentStep(6);
        notify.success("Appointment booked successfully!");
      } else {
        notify.error(res.data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to book appointment";
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleFinish = () => {
    navigate("/receptionist/receptionist-appointments");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PatientStep
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        );
      case 2:
        return (
          <DepartmentStep
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
        );
      case 3:
        return (
          <DoctorStep
            doctors={doctors}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
            selectedDepartment={selectedDepartment}
          />
        );
      case 4:
        return (
          <DateTimeStep
            availableDates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            consultationType={consultationType}
            onSetConsultationType={setConsultationType}
            reason={reason}
            onSetReason={setReason}
            selectedDoctor={selectedDoctor}
          />
        );
      case 5:
        return (
          <PaymentStep
            paymentMethod={paymentMethod}
            onSetPaymentMethod={setPaymentMethod}
            amount={amount}
            onSetAmount={setAmount}
          />
        );
      case 6:
        return (
          <ReceiptStep
            selectedPatient={selectedPatient}
            selectedDoctor={selectedDoctor}
            doctors={doctors}
            selectedDepartment={selectedDepartment}
            departments={departments}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            paymentMethod={paymentMethod}
            amount={amount}
            paymentData={paymentData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/receptionist/receptionist-appointments")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Book Appointment</h1>
                <p className="text-gray-500">Complete the steps to book an appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition ${
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white"
                          : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <ChevronRight
                      size={20}
                      className={`mx-2 ${
                        isCompleted ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : currentStep === 5 ? (
                <>
                  Book Appointment
                  <ChevronRight size={20} />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Finish Button for Receipt Step */}
        {currentStep === 6 && (
          <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between">
            <button
              type="button"
              onClick={handlePrintReceipt}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Receipt size={20} />
              Print Receipt
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}