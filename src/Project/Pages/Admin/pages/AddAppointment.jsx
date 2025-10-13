import React, { useState, useEffect } from "react";
import axios from "axios";

const NewAppointmentForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    patient: "",
    department: "",
    doctor: "",
    consultationMode: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    notes: "",
    paymentMode: "",
  });

  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);

  // Populate form when editing
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getAll-patients",
          {
            withCredentials: true,
          }
        );
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getdepartmenst",
          {
            withCredentials: true,
          }
        );
        setDepartments(res.data.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors when department changes
  useEffect(() => {
    if (!formData.department) {
      setDoctors([]);
      return;
    }

    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/getalldoctorDepartments/${formData.department}`,
          { withCredentials: true }
        );
        setDoctors(res.data.doctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();

    // Reset dependent fields
    setFormData((prev) => ({
      ...prev,
      doctor: "",
      date: "",
      startTime: "",
      endTime: "",
    }));
    setAvailableDates([]);
    setSlots([]);
  }, [formData.department]);

  // Fetch available dates when doctor changes
  useEffect(() => {
    if (!formData.doctor) {
      setAvailableDates([]);
      return;
   
    }

    const fetchAvailableDates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/schedules/available-dates/${formData.doctor}`,
          { withCredentials: true }
        );
        setAvailableDates(res.data.dates || []);
      } catch (err) {
        console.error("Error fetching available dates:", err);
      }
    };
    fetchAvailableDates();

    // Reset dependent fields
    setFormData((prev) => ({ ...prev, date: "", startTime: "", endTime: "" }));
    setSlots([]);
  }, [formData.doctor]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!formData.doctor || !formData.date) {
      setSlots([]);
      return;
    }

    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/admin/schedules/available-dates/${formData.doctor}?date=${formData.date}`,
          { withCredentials: true }
        );
        console.log("resslot", res.data.schedules);

        setSlots(res.data.schedules || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };
    fetchSlots();
  }, [formData.doctor, formData.date]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  console.log("pati", patients);
  console.log("depat", departments);
  console.log("doc", doctors);
  console.log("date", availableDates);
  console.log("slot", slots);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[800px] p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Appointment</h2>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Patient Name
            </label>
            <select
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Department & Doctor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!doctors.length}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.userId.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Consultation Mode */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Mode of Consultation
            </label>
            <select
              name="consultationMode"
              value={formData.consultationMode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Offline">In-Person</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Date & Slots */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!availableDates.length}
              >
                <option value="">Select Date</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            {/* Slots */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Available Slots
              </label>
              {slots.length > 0 ? (
                <ul className="border rounded p-2 max-h-40 overflow-y-auto">
                  {slots
                    .flatMap((s) => s.slots || []) // flatten nested slots
                    .map((slot) => (
                      <li
                        key={slot.start}
                        className={`px-2 py-1 rounded mb-1 text-center cursor-pointer ${
                          slot.isBooked
                            ? "bg-red-500 text-white line-through" // booked
                            : formData.startTime === slot.start
                            ? "bg-blue-600 text-white" // selected
                            : "bg-green-500 text-white hover:bg-green-600" // available
                        }`}
                        onClick={() => {
                          if (!slot.isBooked) {
                            setFormData((prev) => ({
                              ...prev,
                              startTime: slot.start,
                              endTime: slot.end,
                            }));
                          }
                        }}
                      >
                        {slot.start} - {slot.end}{" "}
                        {slot.isBooked ? "(Booked)" : "(Available)"}
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No slots available</p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <input
              type="text"
              name="reason"
              placeholder="Reason for appointment"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
       

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quick Notes
            </label>
            <textarea
              name="notes"
              placeholder="Additional Information"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mode of Payment
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentForm;
