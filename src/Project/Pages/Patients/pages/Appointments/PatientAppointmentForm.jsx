import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";
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
        console.log(res.data);
        
        if (res.data.success) setDepartments(res.data.data || []);
      } catch (err) {
        console.log("Error fetching departments:", err);
        notify.error("Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle timeSlot separately
    if (name === "timeSlot") {
      const selectedSlot = slots.find((s) => s.start === value);
      setFormData((prev) => ({ ...prev, timeSlot: selectedSlot || "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "department") {
      setDoctors([]);
      setAvailableDates([]);
      setSlots([]);
      setFormData((prev) => ({
        ...prev,
        doctor: "",
        appointmentDate: "",
        timeSlot: "",
      }));
      fetchDoctors(value);
    }

    if (name === "doctor") {
      setAvailableDates([]);
      setSlots([]);
      setFormData((prev) => ({ ...prev, appointmentDate: "", timeSlot: "" }));
      fetchAvailableDates(value);
    }

    if (name === "appointmentDate" && formData.doctor) {
      setSlots([]);
      setFormData((prev) => ({ ...prev, timeSlot: "" }));
      fetchDoctorSlots(formData.doctor, value);
    }
  };

  const fetchDoctors = async (departmentId) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/doctors/department/${departmentId}`,
        { withCredentials: true }
      );
      if (res.data.success) setDoctors(res.data.doctors || []);
    } catch (err) {
      console.log("Error fetching doctors:", err);
      notify.error("Failed to fetch doctors");
    }
  };

  const fetchAvailableDates = async (doctorId) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}`,
        { withCredentials: true }
      );
      if (res.data.success) setAvailableDates(res.data.dates || []);
    } catch (err) {
      console.log("Failed to fetch available dates", err);
      notify.error("Failed to fetch available dates");
    }
  };

  const fetchDoctorSlots = async (doctorId, date) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}?date=${date}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const allSlots = res.data.schedules.flatMap((sch) =>
          (sch.slots || []).map((slot) => ({ ...slot, date: sch.date }))
        );
        setSlots(allSlots);
      }
    } catch (err) {
      console.log("Error fetching slots:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate DOB
    if (new Date(formData.dob) >= new Date()) {
      notify.error("Date of Birth cannot be in the future!");
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
      timeSlot: formData.timeSlot.start, // just the start time string
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

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Book Appointment
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Home / Appointment /{" "}
          <span className="text-blue-600">Book Appointment</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-1">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          {doctors.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Doctor *
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.userId.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Appointment Date */}
          {availableDates.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Appointment Date *
              </label>
              <select
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">Select Date</option>
                {availableDates.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time Slots */}
          {slots.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Available Time Slots *
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot ? formData.timeSlot.start : ""}
                onChange={(e) => {
                  const selected = slots.find(
                    (s) =>
                      s.start === e.target.value &&
                      new Date(s.date).toISOString().split("T")[0] ===
                        formData.appointmentDate
                  );
                  if (selected)
                    setFormData((prev) => ({ ...prev, timeSlot: selected }));
                }}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                disabled={!formData.appointmentDate}
              >
                <option value="">
                  {formData.appointmentDate
                    ? "Select Slot"
                    : "Select a date first"}
                </option>
                {formData.appointmentDate &&
                  slots
                    .filter(
                      (slot) =>
                        new Date(slot.date).toISOString().split("T")[0] ===
                        formData.appointmentDate
                    )
                    .map((slot, i) => (
                      <option
                        key={i}
                        value={slot.start}
                        disabled={slot.isBooked}
                        style={{ color: slot.isBooked ? "red" : "green" }}
                      >
                        {slot.start} - {slot.end}{" "}
                        {slot.isBooked ? "(Booked)" : ""}
                      </option>
                    ))}
              </select>
            </div>
          )}

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Contact Number *
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Consultation Type *
            </label>
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Type</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Problems */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Health Problem / Reason
            </label>
            <textarea
              name="problems"
              value={formData.problems}
              onChange={handleChange}
              placeholder="Describe the health issue..."
              rows="4"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-4 justify-end mt-4">
            <button
              type="reset"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
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
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
