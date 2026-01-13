import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

import BookingHeader from "./pages/AppointmentsDetails/BookingHeader";
import TimeSlotsAppointments from "./pages/AppointmentsDetails/TimeSlotsAppointments";
import PatientConcerns from "./pages/AppointmentsDetails/PatientConcerns";
import SearchFilterSection from "./pages/AppointmentsDetails/SearchFilterSection";
import DoctorsCardAppointments from "./pages/AppointmentsDetails/DoctorsCardAppointments";
import DoctoresDetailsAppointmens from "./pages/AppointmentsDetails/DoctoresDetailsAppointmens";
import AppointmensCalender from "./pages/AppointmentsDetails/AppointmensCalender";

export default function PatientAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSlots, setDateSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [query, setQuery] = useState("");
  const [concern, setConcern] = useState(
    "Red, itchy skin for a week. Worse after sun.\nSymptoms:\n• Flaky patches\n• Mild burning\n• Skin sensitivity"
  );

  const navigate = useNavigate();

  // ---------------- Fetch Departments & Doctors ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depRes, docRes] = await Promise.all([
          axios.get("http://localhost:4002/api/patient/getdepartmenst", { withCredentials: true }),
          axios.get("http://localhost:4002/api/patient/getAll-Doctor", { withCredentials: true })
        ]);
        setDepartments(depRes.data.data);
        setDoctors(docRes.data.doctors || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ---------------- Fetch Available Dates ----------------
  useEffect(() => {
    if (!selectedDoctor?.id) return;
    const fetchDates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/doctor/${selectedDoctor.id}/available-dates`,
          { withCredentials: true }
        );
        setAvailableDates((res.data.availableDates || []).map(d => format(new Date(d), "yyyy-MM-dd")));
        setSelectedDate(null);
        setDateSlots([]);
        setSelectedTime("");
      } catch (err) {
        console.error("Error fetching available dates:", err);
        setAvailableDates([]);
      }
    };
    fetchDates();
  }, [selectedDoctor]);

  // ---------------- Fetch Slots for Selected Date ----------------
  useEffect(() => {
    if (!selectedDoctor?.id || !selectedDate) return;
    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/doctor/${selectedDoctor.id}/slots?date=${format(selectedDate, "yyyy-MM-dd")}`,
          { withCredentials: true }
        );
        setDateSlots(res.data.availableSlots || []);
        setSelectedTime("");
      } catch (err) {
        console.error("Error fetching slots:", err);
        setDateSlots([]);
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  // ---------------- Map Doctor ----------------
  const mapDoctor = d => ({
    id: d._id,
    name: d.name || d.fullName,
    title: d.qualification || d.title,
    rate: d.consultationFee || d.rate,
    img: d.profileImage,
    experience: d.experience || "",
    bio: d.bio || "",
    specialty: Array.isArray(d.specialization) ? d.specialization : [d.specialization || ""],
    department: typeof d.department === "string" ? d.department : d.department?.name || "General",
    reviews: d.reviews || [],
    rating: d.rating || 0,
    availableSlots: d.availableSlots || []
  });

  const handleBookAppointment = doctor => {
    if (!selectedDate || !selectedTime) return alert("Please select a date and time!");
    const doc = mapDoctor(doctor);
    alert(`Booked ${doc.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime.start} - ${selectedTime.end}`);
  };

  const filteredDoctors = doctors.filter(d => {
    const name = (d.name || "").toLowerCase();
    const spec = (Array.isArray(d.specialization) ? d.specialization.join(" ") : d.specialization || "").toLowerCase();
    const dept = (typeof d.department === "string" ? d.department : d.department?.name || "").toLowerCase();
    return (name.includes(query.toLowerCase()) || spec.includes(query.toLowerCase())) &&
      (!selectedDepartment || dept === selectedDepartment.toLowerCase().trim());
  });

  console.log(selectedDoctor);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 font-sans text-gray-800">
      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-8">

        {/* LEFT - Calendar & Slots */}
        <div className="xl:w-96 w-full sticky top-8 space-y-6">
          <BookingHeader onHistoryClick={() => navigate("/patient/appointmentsHistory")} />
          <AppointmensCalender
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            doctorAvailableDates={selectedDoctor ? availableDates : null}
          />
          <TimeSlotsAppointments selectedTime={selectedTime} onSelect={setSelectedTime} slots={dateSlots} />
          <PatientConcerns concern={concern} onConcernChange={setConcern} />
        </div>

        {/* CENTER - Doctor List */}
        <div className="flex-1 min-w-0">
          <SearchFilterSection
            query={query} onQueryChange={setQuery}
            selectedDepartment={selectedDepartment} onDepartmentChange={setSelectedDepartment}
            departments={departments}
          />
          {loading ? (
            <div className="text-center text-gray-500">Loading doctors...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDoctors.map(doc => (
                <DoctorsCardAppointments
                  key={doc._id}
                  doctor={mapDoctor(doc)}              // pass each doctor properly
                  selectedDate={selectedDate}          // pass currently selected date
                  selectedSlot={selectedTime}          // pass currently selected time
                  onOpenDetail={setSelectedDoctor}     // when detail button clicked, set selected doctor
                />
              ))}


            </div>
          )}
        </div>

        {/* RIGHT - Doctor Detail */}
        {selectedDoctor && (
          <div className="xl:w-96 w-full">
            <DoctoresDetailsAppointmens
              doctor={selectedDoctor}
              onClose={() => setSelectedDoctor(null)}
              onBook={handleBookAppointment}
            />
          </div>
        )}
      </div>
    </div>
  );
}
