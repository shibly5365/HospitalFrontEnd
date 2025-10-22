import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import PatientInfo from "./AppointmensForm/PatientDetailsForm";
import DepartmentDoctor from "./AppointmensForm/DepartmentDoctor";
import Schedule from "./AppointmensForm/ScheduleForm";
import ContactConsultation from "./AppointmensForm/ContactConsultation";
import PaymentSection from "./AppointmensForm/PaymentSection";
import { notify } from "../../../../../Units/notification";


const BookAppointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    dob: "",
    gender: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    timeSlot: "",
    email: "",
    contact: "",
    problems: "",
    consultationType: "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/getdepartmenst",
          { withCredentials: true }
        );
        if (res.data.success) setDepartments(res.data.data || []);
      } catch (err) {
        console.log(err);
        notify.error("Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  const resetForm = () => {
    setFormData({
      firstName: "",
      dob: "",
      gender: "",
      department: "",
      doctor: "",
      appointmentDate: "",
      timeSlot: "",
      email: "",
      contact: "",
      problems: "",
      consultationType: "",
    });
    setDoctors([]);
    setAvailableDates([]);
    setSlots([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consultationType) {
      notify.error("Please select consultation type!");
      return;
    }
    if (!formData.timeSlot) {
      notify.error("Please select a time slot!");
      return;
    }

    setLoading(true);

    const payload = {
      doctorId: formData.doctor,
      appointmentDate: formData.appointmentDate,
      timeSlot: formData.timeSlot.start,
      consultationType: formData.consultationType,
      reason: formData.problems,
      patientName: formData.firstName,
      dob: formData.dob,
      gender: formData.gender,
      email: formData.email,
      department: formData.department,
      contactNumber: formData.contact,
    };

    try {
      const res = await axios.post(
        "http://localhost:4002/api/patient/appointments",
        payload,
        { withCredentials: true }
      );
      if (res.data.appointment) {
        notify.success("Appointment booked successfully!");
        navigate("/patient/patient-appointments");
        resetForm();
      } else {
        notify.error(res.data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error(err);
      notify.error("Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/patient/patient-dashboard")}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <HomeIcon size={20} />
          Home
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h2>
        <p className="text-sm text-gray-500 mb-6">
          Home / Appointment / <span className="text-blue-600">Book Appointment</span>
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PatientInfo formData={formData} setFormData={setFormData} />
          <DepartmentDoctor
            formData={formData}
            setFormData={setFormData}
            departments={departments}
            doctors={doctors}
            setDoctors={setDoctors}
            setAvailableDates={setAvailableDates}
            setSlots={setSlots}
          />
          <Schedule
            formData={formData}
            setFormData={setFormData}
            availableDates={availableDates}
            slots={slots}
            setSlots={setSlots}
          />
          <ContactConsultation formData={formData} setFormData={setFormData} />
          <PaymentSection formData={formData} setFormData={setFormData} />
          <div className="col-span-2 flex gap-4 justify-end mt-4">
            <button type="reset" onClick={resetForm} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-6 py-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
