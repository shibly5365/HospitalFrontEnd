import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Users, FileText } from "lucide-react";

const NewAppointmentForm = ({ receptionistId }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    consultationType: "Offline",
    reason: "",
    notes: "",
    timeSlot: null, // updated to hold full slot object
  });

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/receptionist/getAll-patients",
          { withCredentials: true }
        );
        const patientsWithId = res.data.map((p) => ({
          ...p,
          id: p._id || p.id,
        }));
        setPatients(patientsWithId);
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
          "http://localhost:4002/api/receptionist/getdepartmenst",
          { withCredentials: true }
        );
        setDepartments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors when department changes
  useEffect(() => {
    if (!selectedDepartment) return setDoctors([]);
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/receptionist/getalldoctorDepartments/${selectedDepartment}`,
          { withCredentials: true }
        );
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
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
    if (!selectedDoctor) return setAvailableDates([]);
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/receptionist/schedules/available-dates/${selectedDoctor}`,
          { withCredentials: true }
        );
        setAvailableDates(res.data.schedules || []);
      } catch (err) {
        console.error("Error fetching doctor schedule:", err);
      }
    };
    fetchSchedule();
    setSelectedDate("");
    setAvailableSlots([]);
  }, [selectedDoctor]);

  // Fetch slots for doctor + date
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return setAvailableSlots([]);
    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/receptionist/schedules/available-dates/${selectedDoctor}?date=${selectedDate}`,
          { withCredentials: true }
        );
        setAvailableSlots(res.data.schedules || []);
      } catch (err) {
        console.error("Error fetching available slots:", err);
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  // Patient search
  useEffect(() => {
    if (!searchTerm) return setFilteredPatients([]);
    const filtered = patients.filter((p) =>
      (p.fullName + p.email + (p.contact || ""))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.fullName);
    setFilteredPatients([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient) return alert("Please select a patient");
    if (!selectedDoctor) return alert("Please select a doctor");
    if (!selectedDate || !formData.timeSlot)
      return alert("Please select date and time slot");

    const payload = {
      patient: selectedPatient.id,
      doctor: selectedDoctor,
      receptionist: receptionistId,
      appointmentDate: new Date(selectedDate).toISOString(),
      timeSlot: formData.timeSlot, // send full slot object {start,end}
      consultationType: formData.consultationType,
      reason: formData.reason,
      notes: formData.notes,
      role: "receptionist",
    };

    try {
      await axios.post(
        "http://localhost:4002/api/receptionist/book",
        payload,
        { withCredentials: true }
      );
      alert("Appointment booked successfully!");
      // reset form
      setSelectedPatient(null);
      setSearchTerm("");
      setSelectedDepartment("");
      setSelectedDoctor("");
      setSelectedDate("");
      setFormData({
        consultationType: "Offline",
        reason: "",
        notes: "",
        timeSlot: null,
      });
      setAvailableSlots([]);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <Calendar size={20} /> Create Appointment
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Patient */}
        <div>
          <label className="block text-sm font-medium mb-1">
            <Users size={16} /> Patient
          </label>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedPatient(null);
            }}
            className="w-full p-2 border rounded"
          />
          {filteredPatients.length > 0 && (
            <div className="border rounded mt-1 max-h-40 overflow-auto bg-white">
              {filteredPatients.map((p) => (
                <div
                  key={p.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectPatient(p)}
                >
                  {p.fullName} | {p.email} | {p.contact || "N/A"}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id || dept.id} value={dept._id || dept.id}>
                {dept.name || dept}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-sm font-medium mb-1">Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.userId.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Available Dates */}
        {availableDates.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Available Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Date</option>
              {availableDates.map((d) => (
                <option key={d._id} value={d.date.split("T")[0]}>
                  {new Date(d.date).toLocaleDateString()} ({d.dayName})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Available Slots
            </label>
            <select
              value={formData.timeSlot?.start || ""}
              onChange={(e) => {
                const val = e.target.value.trim();
                const allSlots = availableSlots.flatMap((s) => s.slots || []);
                const selectedSlot = allSlots.find((s) => s.start === val);

                if (selectedSlot && selectedSlot.isBooked) {
                  alert("This slot is already booked.");
                  return;
                }

                setFormData({ ...formData, timeSlot: selectedSlot });
              }}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Slot</option>
              {availableSlots
                .flatMap((s) => s.slots || [])
                .map((slot, idx) => (
                  <option
                    key={idx}
                    value={slot.start}
                    disabled={slot.isBooked}
                    style={{ color: slot.isBooked ? "red" : "green" }}
                  >
                    {slot.start} - {slot.end} {slot.isBooked ? "(Booked)" : ""}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Consultation Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Mode</label>
          <select
            value={formData.consultationType}
            onChange={(e) =>
              setFormData({ ...formData, consultationType: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">
            <FileText size={16} /> Reason
          </label>
          <textarea
            rows="2"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default NewAppointmentForm;
