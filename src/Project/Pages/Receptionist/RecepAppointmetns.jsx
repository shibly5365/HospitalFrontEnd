import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import Header from "./pages/appoint/Header";
import StatsCards from "./pages/appoint/StatsCards";
import { notify } from "../../../units/notification";
import TabNavigation from "./pages/appoi/TabNavigation";
import TabContent from "./pages/appoi/TabContent";
import Modals from "./pages/appoi/Modals";
import { useNavigate } from "react-router-dom";
import ReceptionistSkeleton from "../../../skeletons/ReceptionistSkeleton";

export default function ReceptionistAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(
        "/receptionist/get",
        { withCredentials: true }
      );

      if (res.data.appointments) {
        const transformed = transformAppointments(res.data.appointments);
        setAppointments(transformed);
        setFilteredAppointments(transformed);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      notify.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, dateFilter, appointments]);

  const transformAppointments = (appointmentsData) => {
    return appointmentsData.map((apt) => ({
      _id: apt._id,
      doctor: apt.doctor,
      patient: apt.patient,
      patientInfo: {
        patientId: apt.patient?.patientId || apt.patient?._id,
        fullName: apt.patient?.fullName || "Unknown",
        profileImage: apt.patient?.profileImage || "",
        phone: apt.patient?.contact || "",
        email: apt.patient?.email || "",
      },
      doctorInfo: {
        fullName: apt.doctor?.userId?.fullName 
          ? `Dr. ${apt.doctor.userId.fullName}` 
          : "Unknown Doctor",
        department: apt.doctor?.department?.name || "Unknown",
      },
      appointmentDate: apt.appointmentDate,
      timeSlot: apt.timeSlot || { start: "", end: "" },
      status: apt.status,
      reason: apt.reason || "General Consultation",
      tokenNumber: apt.tokenNumber,
    }));
  };

  const applyFilters = () => {
    let filtered = appointments;

    if (searchQuery) {
      filtered = applySearchFilter(filtered, searchQuery);
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (dateFilter === "today") {
      filtered = applyTodayFilter(filtered);
    }

    setFilteredAppointments(filtered);
  };

  const applySearchFilter = (appointmentsList, query) => {
    return appointmentsList.filter(
      (a) =>
        a.patientInfo?.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        a.patientInfo?.patientId?.toLowerCase().includes(query.toLowerCase()) ||
        a.doctorInfo?.fullName?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const applyTodayFilter = (appointmentsList) => {
    const today = new Date().toDateString();
    return appointmentsList.filter(
      (a) => new Date(a.appointmentDate).toDateString() === today
    );
  };

  const handleSaveEdit = async (updatedAppointment) => {
    try {
      const res = await apiClient.put(
        `/receptionist/udpated/${updatedAppointment._id}`,
        updatedAppointment,
        { withCredentials: true }
      );

      if (res.data) {
        notify.success("Appointment updated successfully");
        await fetchAppointments();
        setEditAppointment(null);
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
      notify.error("Failed to update appointment");
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.find((apt) => apt._id === appointmentId);
    if (appointment) {
      setCancelAppointment(appointment);
    }
  };

  const handleCancelSuccess = async () => {
    setCancelAppointment(null);
    await fetchAppointments();
  };

  const handleReschedule = (appointment) => {
    setRescheduleAppointment(appointment);
  };

  const handleRescheduleSuccess = async () => {
    setRescheduleAppointment(null);
    await fetchAppointments();
  };

  const handleAddAppointment = () => {
   navigate("/receptionist/AddNewAppointments");
  };

  if (loading) {
    return <ReceptionistSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header onAddAppointment={handleAddAppointment} />
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        <StatsCards appointments={appointments} />
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <TabContent
          activeTab={activeTab}
          appointments={appointments}
          filteredAppointments={filteredAppointments}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onViewDetails={setSelectedAppointment}
          onEdit={setEditAppointment}
          onCancel={handleCancelAppointment}
        />
      </div>

      <Modals
        editAppointment={editAppointment}
        selectedAppointment={selectedAppointment}
        rescheduleAppointment={rescheduleAppointment}
        cancelAppointment={cancelAppointment}
        openMenu={openMenu}
        setEditAppointment={setEditAppointment}
        setSelectedAppointment={setSelectedAppointment}
        setRescheduleAppointment={setRescheduleAppointment}
        setCancelAppointment={setCancelAppointment}
        setOpenMenu={setOpenMenu}
        onSaveEdit={handleSaveEdit}
        onCancelAppointment={handleCancelAppointment}
        onReschedule={handleReschedule}
        onCancelSuccess={handleCancelSuccess}
        onRescheduleSuccess={handleRescheduleSuccess}
      />
    </div>
  );
}