import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, FileText, Stethoscope, Users, CheckCircle } from "lucide-react";

const AppointmentForm = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    startTime: "",
    endTime: "",
    consultationType: "Offline",
    reason: "",
    notes: "",
    status: "Pending",
  });

  // Fetch all patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/doctor/allPatients",
          { withCredentials: true }
        );
        console.log("All patients fetched:", res.data);
        setPatients(res.data.patients || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  // Filter patients
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPatients([]);
      return;
    }

    const filtered = patients.filter((p) => {
      const fullName = p.fullName || "";
      const email = p.email || "";
      const phone = p.phone || "";

      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm)
      );
    });

    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  // Fetch available dates when selectedPatient and doctorId are ready
  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!selectedPatient || !doctorId) return;

      console.log("Fetching available dates for doctorId:", doctorId);
      try {
        const res = await axios.get(
          `http://localhost:4002/api/doctor/schedule/${doctorId}`,
          { withCredentials: true }
        );
        console.log("Doctor available dates response:", res.data);
        setAvailableDates(res.data.dates || []);
      } catch (err) {
        console.error("Error fetching doctor available dates:", err);
      }
    };

    fetchAvailableDates();
  }, [selectedPatient, doctorId]);

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    console.log("Selected patient:", patient);

    setSelectedPatient(patient);
    setSearchTerm(patient.fullName);
    setFilteredPatients([]);
    setFormData({
      ...formData,
      appointmentDate: "",
      startTime: "",
      endTime: "",
    });
    setAvailableSlots([]);
  };

  // Handle date selection
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setFormData({
      ...formData,
      appointmentDate: date,
      startTime: "",
      endTime: "",
    });
    setAvailableSlots([]);

    if (!doctorId || !date) return;

    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}?date=${date}`,
        { withCredentials: true }
      );
      console.log("Available slots response:", res.data);
      setAvailableSlots(
        res.data.schedules?.[0]?.slots.filter((s) => !s.isBooked) || []
      );
    } catch (err) {
      console.error("Error fetching available slots:", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient) return alert("Please select a patient");
    if (!formData.appointmentDate || !formData.startTime || !formData.endTime)
      return alert("Please select date and slot");

    const payload = {
      patientId: selectedPatient.id, // adjust if your API expects _id
      doctorId: doctorId,
      appointmentDate: formData.appointmentDate,
      timeSlot: {
        start: formData.startTime,
        end: formData.endTime,
      },
      consultationType: formData.consultationType,
      reason: formData.reason,
      notes: formData.notes,
      status: formData.status,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await axios.post(
        "http://localhost:4002/api/doctor/doctor/create-appointment",
        payload,
        { withCredentials: true }
      );
      console.log("Appointment created:", res.data);
      alert("Appointment created successfully!");

      // Reset form
      setSelectedPatient(null);
      setSearchTerm("");
      setFormData({
        appointmentDate: "",
        startTime: "",
        endTime: "",
        consultationType: "Offline",
        reason: "",
        notes: "",
        status: "Pending",
      });
      setAvailableSlots([]);
      setAvailableDates([]);
    } catch (err) {
      console.error("Error creating appointment:", err.response?.data || err);
      alert(err.response?.data?.message || "Error creating appointment");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar size={20} /> Create New Appointment
        </h2>
        <p className="text-sm opacity-90">
          Schedule an appointment for a patient with doctor availability
        </p>
      </div>

      <form className="p-6 space-y-8" onSubmit={handleSubmit}>
        {/* Patient Selection */}
        <div>
          <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
            <Users size={18} /> Patient Selection
          </h3>
          <div className="flex flex-col relative gap-3">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedPatient(null);
              }}
            />
            {filteredPatients.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10 max-h-60 overflow-auto">
                {filteredPatients.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSelectPatient(p)}
                  >
                    {p.fullName} | {p.email} | {p.phone || "N/A"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div>
          <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
            <Stethoscope size={18} /> Appointment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Appointment Date</label>
              <select
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.appointmentDate}
                onChange={handleDateChange}
                required
              >
                <option value="">Select available date</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Select Slot</label>
              <select
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.startTime}
                onChange={(e) => {
                  const slot = availableSlots.find((s) => s.start === e.target.value);
                  setFormData({
                    ...formData,
                    startTime: slot.start,
                    endTime: slot.end,
                  });
                }}
                required
              >
                <option value="">Select time slot</option>
                {availableSlots.map((slot, idx) => (
                  <option key={idx} value={slot.start}>
                    {slot.start} - {slot.end}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-600 mb-1">Mode</label>
              <select
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.consultationType}
                onChange={(e) =>
                  setFormData({ ...formData, consultationType: e.target.value })
                }
                required
              >
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
            <FileText size={18} /> Additional Information
          </h3>
          <textarea
            rows="2"
            placeholder="Reason for appointment..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-2"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          ></textarea>
          <textarea
            rows="2"
            placeholder="Notes..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>
        </div>

        {/* Appointment Status */}
        <div>
          <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
            <CheckCircle size={18} /> Appointment Status
          </h3>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-3 border rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => {
              setSearchTerm("");
              setSelectedPatient(null);
              setFormData({
                appointmentDate: "",
                startTime: "",
                endTime: "",
                consultationType: "Offline",
                reason: "",
                notes: "",
                status: "Pending",
              });
              setAvailableSlots([]);
              setAvailableDates([]);
            }}
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Calendar size={18} /> Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
