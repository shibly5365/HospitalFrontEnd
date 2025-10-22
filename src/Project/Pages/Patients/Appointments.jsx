import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorsCardAppointments from "./pages/AppointmentsDetails/DoctorsCardAppointments";
import DoctoresDetailsAppointmens from "./pages/AppointmentsDetails/DoctoresDetailsAppointmens";
import TimeSlotsAppointments from "./pages/AppointmentsDetails/TimeSlotsAppointments";
import AppointmensCalender from "./pages/AppointmentsDetails/AppointmensCalender";

export default function PatientAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [query, setQuery] = useState("");
  const [concern, setConcern] = useState(
    "Red, itchy skin for a week. Worse after sun.\nSymptoms:\n• Flaky patches\n• Mild burning\n• Skin sensitivity"
  );
  const [availableDates, setAvailableDates] = useState([]); // ✅ added
  const navigate = useNavigate();

  

  // ✅ Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4002/api/patient/getdepartmenst`,
          { withCredentials: true }
        );
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4002/api/patient/doctors`,
          { withCredentials: true }
        );
        const docs = response.data.doctors || [];
        setDoctors(docs);
        if (docs.length > 0) {
          const firstDoctor = mapDoctor(docs[0]);
          setSelectedDoctor(firstDoctor);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Fetch available dates for selected doctor
  useEffect(() => {
    if (!selectedDoctor?.id) return;

    const fetchAvailableDates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/schedules/available-dates/${selectedDoctor.id}`,
          { withCredentials: true }
        );
        // console.log(res.data);
        
        setAvailableDates(res.data);
        // auto-select first available date
        if (res.data.availableDates?.length > 0) {
          setSelectedDate(new Date(res.data.availableDates[0]));
        }
      } catch (err) {
        console.error("Error fetching available dates:", err);
      }
    };
    fetchAvailableDates();
  }, [selectedDoctor]);

  // ✅ Map doctor object
  const mapDoctor = (doc) => ({
    id: doc._id,
    doctorId: doc.doctorId,
    name: doc.name || doc.fullName,
    title: doc.qualification || doc.title,
    rate: doc.consultationFee || doc.rate,
    img: doc.profileImage,
    experience: doc.experience || "",
    bio: doc.bio || "",
    specialty: Array.isArray(doc.specialization)
      ? doc.specialization
      : [doc.specialization || ""],
    department: doc.department?.name || "General",
    reviews: doc.reviews || [],
    rating: doc.rating || 0,
    availableDays: doc.availableDays || [],
    availableSlots: doc.availableSlots || [],
    appointmentDate: selectedDate,
    appointmentTime: selectedTime,
  });

  // ✅ Get available slots
  const getAvailableSlots = (doctor = selectedDoctor, date = selectedDate) => {
    if (!doctor || !doctor.availableSlots) return [];
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const daySlots = doctor.availableSlots.find((slot) => slot.day === dayName);
    return daySlots?.slots || [];
  };

  // ✅ Book appointment
  const handleBookAppointment = (doctor) => {
    const mappedDoctor = mapDoctor(doctor);
    setSelectedDoctor(mappedDoctor);
    const firstSlot = getAvailableSlots(mappedDoctor, selectedDate)[0] || "";
    setSelectedTime(firstSlot);
    alert(
      `Booked ${mappedDoctor.name} on ${selectedDate.toLocaleDateString(
        "en-US",
        { weekday: "short", day: "numeric", month: "long", year: "numeric" }
      )} at ${firstSlot}`
    );
  };

  const handleCloseDetail = () => setSelectedDoctor(null);

  // ✅ Filter doctors
  const filtered = doctors.filter((d) => {
    const matchesQuery =
      (d.name || "").toLowerCase().includes(query.toLowerCase()) ||
      (Array.isArray(d.specialization)
        ? d.specialization.join(" ")
        : d.specialization || ""
      )
        .toLowerCase()
        .includes(query.toLowerCase());
    const matchesDepartment = selectedDepartment
      ? d.department?.name === selectedDepartment
      : true;
    return matchesQuery && matchesDepartment;
  });
  //   console.log(doctors);
  // console.log(departments);
  // console.log(selectedDepartment);
  // console.log(selectedDate);
  // console.log(selectedTime);
  // console.log(selectedDoctor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pe-0 md:p-8 font-sans text-gray-800">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* LEFT - Booking Section */}
          <div className="xl:w-96 w-full">
            <div className="sticky top-8 space-y-6">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Booking Appointment
                  </div>
                  <div className="text-gray-600 mt-1">
                    Schedule your consultation with top specialists
                  </div>
                </div>

                {/* 🕒 History Button */}
                <button
                  onClick={() => navigate("/patient/appointmentsHistory")}
                  className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-all duration-200"
                >
                  History
                </button>
              </div>

              {/* ✅ Calendar with availableDates */}
              <AppointmensCalender
                selectedDate={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  const firstSlot =
                    getAvailableSlots(selectedDoctor, date)[0] || "";
                  setSelectedTime(firstSlot);
                }}
                availableDates={availableDates} // ✅ passed new prop
              />

              <TimeSlotsAppointments
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
                slots={getAvailableSlots()}
              />

              {/* Patient Concern Box */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-lg font-semibold text-gray-800 mb-4">
                  Patient Concerns
                </div>
                <textarea
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  rows={6}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="Describe your symptoms and concerns..."
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                      📎
                    </button>
                    <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                      🖼️
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {concern.split(/\s+/).filter(Boolean).length} words
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER - Doctor List */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Find Your Doctor
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* 🔍 Search Box */}
                  <div className="relative">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search Doctor..."
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm w-full lg:w-64 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                  </div>

                  {/* 🏥 Department Filter */}
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-500">
                Loading doctors...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((doc) => (
                  <DoctorsCardAppointments
                    key={doc._id}
                    doctor={mapDoctor(doc)}
                    onSelect={handleBookAppointment}
                    onOpenDetail={(doctor) => setSelectedDoctor(doctor)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - Doctor Details */}
          <div className="xl:w-96 w-full">
            {selectedDoctor && (
              <DoctoresDetailsAppointmens
                doctor={selectedDoctor}
                onClose={handleCloseDetail}
                onBook={handleBookAppointment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
