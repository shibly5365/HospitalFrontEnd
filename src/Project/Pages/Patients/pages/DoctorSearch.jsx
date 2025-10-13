import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, User, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DoctorSearch() {
  const [filter, setFilter] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedule, setSchedule] = useState([]);

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/doctors",
          { withCredentials: true }
        );
        console.log("res",res.data);
        
        if (res.data.success) {
          setDoctors(res.data.doctors || []);
        }
      } catch (err) {
        console.error("Error fetching doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch schedule for selected doctor
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!selectedDoctor) return;
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/getschedule/${selectedDoctor._id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          const allSlots = res.data.schedules || [];
          setSchedule(allSlots);
        }
      } catch (err) {
        console.error("Error fetching schedule", err);
      }
    };
    fetchSchedule();
  }, [selectedDoctor]);

  const filteredDoctors = filter
    ? doctors.filter((doc) => doc.specialization === filter)
    : doctors;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side - Doctor list */}
      <div
        className={`transition-all duration-300 ${
          selectedTime ? "w-2/3" : "w-full"
        } p-6 border-r overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Doctors</h1>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border rounded-lg p-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Specialties</option>
              {Array.from(new Set(doctors.map((d) => d.specialization))).map(
                (spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Specialty</th>
              <th className="p-3 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr
                key={doc._id}
                className="hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  setSelectedDoctor(doc);
                  setSelectedTime(null);
                }}
              >
                <td className="p-3 flex items-center gap-2">
                  <User className="w-8 h-8 text-blue-500" /> {doc.fullName || doc.name}
                </td>
                <td className="p-3">{doc.specialization || doc.specialty}</td>
                <td className="p-3">{doc.department || doc.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right side - Doctor details */}
      <AnimatePresence>
        {selectedDoctor && !selectedTime && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 70 }}
            className="w-1/3 bg-white shadow-xl p-6 overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-2">
              {selectedDoctor.fullName || selectedDoctor.name}
            </h2>
            <p className="text-blue-600 font-medium mb-4">
              {selectedDoctor.specialization || selectedDoctor.specialty}
            </p>
            <p className="text-gray-700 mb-6">
              {selectedDoctor.bio || "No bio available."}
            </p>
<h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
  <Calendar className="w-5 h-5" /> Available Slots
</h3>

{schedule.length > 0 ? (
  schedule.map((day) => {
    const freeSlots = day.slots.filter(
      (slot) => !slot.isBooked && !slot.isBreak
    );
    if (freeSlots.length === 0) return null; // skip days with no free slots

    return (
      <div key={day.date} className="mb-4">
        <h4 className="font-medium mb-2 text-gray-600">
          {new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {freeSlots.map((slot) => (
            <div
              key={slot._id}
              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-center cursor-pointer"
              onClick={() =>
                setSelectedTime(`${slot.start} - ${slot.end}`)
              }
            >
              {slot.start} - {slot.end}
            </div>
          ))}
        </div>
      </div>
    );
  })
) : (
  <p className="text-gray-500">No free slots available</p>
)}

          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side - Time confirmation */}
      <AnimatePresence>
        {selectedTime && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 70 }}
            className="w-1/3 bg-white shadow-xl p-6 overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Appointment</h2>
            <p className="mb-2">
              Doctor: {selectedDoctor.fullName || selectedDoctor.name}
            </p>
            <p className="mb-2">
              Specialty: {selectedDoctor.specialization || selectedDoctor.specialty}
            </p>
            <p className="mb-4">Selected Time: {selectedTime}</p>

            <button
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() =>
                alert(
                  `Booked with ${selectedDoctor.fullName || selectedDoctor.name} at ${selectedTime}`
                )
              }
            >
              Confirm Booking
            </button>

            <button
              className="w-full mt-3 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setSelectedTime(null)}
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
