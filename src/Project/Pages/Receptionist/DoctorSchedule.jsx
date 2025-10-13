import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorScheduleRece = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // New: track selected date

  const departmentColors = {
    Cardiology: "bg-red-100 text-red-600",
    Neurology: "bg-purple-100 text-purple-600",
    Orthopedics: "bg-green-100 text-green-600",
    Pediatrics: "bg-yellow-100 text-yellow-600",
    Dermatology: "bg-pink-100 text-pink-600",
    General: "bg-blue-100 text-blue-600",
    Radiology: "bg-indigo-100 text-indigo-600",
    Oncology: "bg-orange-100 text-orange-600",
    "General Gynecology": "bg-teal-100 text-teal-600",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/receptionist/doctors",
          { withCredentials: true }
        );
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const departments = ["All", ...new Set(doctors.map((d) => d.specialization))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDepartment =
      department === "All" || doc.specialization === department;
    const matchesSearch =
      doc.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(search.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const handleSelectDoctor = async (doctor) => {
    setSelectedDoctor(doctor);
    setSchedule([]);
    setAvailableDates([]);
    setSelectedDate(null);

    try {
      const res = await axios.get(
        `http://localhost:4002/api/receptionist/schedules/available-dates/${doctor._id}`,
        { withCredentials: true }
      );

      const doctorSchedules = res.data.schedules || [];
      const availableDates = res.data.dates || [];

      setSchedule(doctorSchedules);
      setAvailableDates(
        availableDates.map((d) => new Date(d).toLocaleDateString())
      );
    } catch (err) {
      console.error("Error fetching doctor schedule:", err);
    }
  };

  // Filter schedule by selected date
  const filteredSchedule = selectedDate
    ? schedule.filter(
        (dayObj) =>
          new Date(dayObj.date).toLocaleDateString() === selectedDate
      )
    : [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold">Doctor Schedules</h2>
        <p className="mt-2">
          Find doctors, check availability, and book appointments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search doctor or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {departments.map((dept, idx) => (
            <option key={idx} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Available Doctors */}
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
        <span className="text-blue-600">🩺</span> Available Doctors
      </h3>

      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 text-center">No doctors found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => handleSelectDoctor(doctor)}
            >
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 mb-4">
                  <span className="text-2xl text-gray-500">👤</span>
                </div>
              )}
              <h4 className="text-lg font-semibold">Dr {doctor.name}</h4>
              <span
                className={`text-sm font-medium mt-2 px-3 py-1 rounded-full ${
                  departmentColors[doctor.specialization] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {doctor.specialization}
              </span>
              <p className="mt-2 text-gray-600 text-sm">{doctor.experience}</p>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Details */}
      {selectedDoctor && (
        <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {selectedDoctor.name}
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                departmentColors[selectedDoctor.specialization] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedDoctor.specialization}
            </span>
          </h3>

          <p className="text-gray-600 mb-4">{selectedDoctor.experience}</p>

          <h4 className="font-medium mb-2">Available Dates:</h4>
          {availableDates.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {availableDates.map((date, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedDate === date
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available dates</p>
          )}

          <h4 className="font-medium mb-2">Time Slots:</h4>
          {filteredSchedule.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredSchedule[0].slots?.map((slot, sIdx) => (
                <span
                  key={sIdx}
                  className={`px-3 py-1 rounded-full text-sm ${
                    slot.isBooked
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {slot.start} - {slot.end}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              {selectedDate ? "No slots for this date" : "Select a date"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorScheduleRece;
