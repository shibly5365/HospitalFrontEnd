import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import Header from "./pages/schedule/Header.jsx";
import SearchFilter from "./pages/schedule/SearchFilter";
import DoctorsGrid from "./pages/schedule/DoctorsGrid";
import ScheduleDetails from "./pages/schedule/ScheduleDetails";

const DoctorScheduleRece = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await apiClient.get(
          "/receptionist/doctors",
          { withCredentials: true }
        );
        // console.log("Doctors data:", res.data);
        setDoctors(res.data.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSelectDoctor = async (doctor) => {
    setSelectedDoctor(doctor);
    setAvailableDates([]);
    setSelectedDate(null);
    setSlots([]);

    try {
      // Fetch available dates for the selected doctor
      const res = await apiClient.get(
        `/patient/doctor/${doctor._id}/available-dates`,
        { withCredentials: true }
      );
      
      console.log("Available dates response:", res.data);
      
      // Assuming response has dates in an array format
      const dates = res.data.availableDates || res.data.data || res.data;
      setAvailableDates(Array.isArray(dates) ? dates : []);
      
    } catch (err) {
      console.error("Error fetching available dates:", err);
      setAvailableDates([]);
    }
  };

  // Fetch slots when a date is selected
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    
    if (!selectedDoctor) return;
    
    try {
      // Format date to YYYY-MM-DD
      const formattedDate = formatDateForAPI(date);
      
      const res = await apiClient.get(
        `/patient/doctor/${selectedDoctor._id}/slots`,
        {
          params: { date: formattedDate },
          withCredentials: true
        }
      );
      
      console.log("Slots response:", res.data);
      
      // Assuming response has slots in an array format
      const fetchedSlots = res.data.availableSlots || res.data.data || res.data || [];
      setSlots(Array.isArray(fetchedSlots) ? fetchedSlots : []);
      
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    }
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    
    // If dateString is already in the correct format
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    
    // Convert from locale date string to YYYY-MM-DD
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          doctors={doctors}
        />

        <DoctorsGrid
          doctors={doctors}
          search={search}
          department={department}
          onSelectDoctor={handleSelectDoctor}
        />

        {selectedDoctor && (
          <ScheduleDetails
            selectedDoctor={selectedDoctor}
            availableDates={availableDates}
            slots={slots}
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect} 
          />
        )}
      </div>
    </div>
  );
};

export default DoctorScheduleRece;