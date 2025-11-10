// ReceptionDashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "./pages/appoint/Header";
import StatsCards from "./pages/appoint/StatsCards";
import Filters from "./pages/appoint/Filters";
import AppointmentsTable from "./pages/appoint/AppointmentsTable";
import EditModal from "./pages/appoint/EditModal";
import ViewModal from "./pages/appoint/ViewModal";


export default function Receptinistappointment() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data for demo purposes
  useEffect(() => {
    const mockData = [
      {
        _id: "1",
        patientInfo: {
          patientId: "PT-2024-001",
          fullName: "Sarah Johnson",
          profileImage: "",
          phone: "+1 234-567-8900",
          email: "sarah.j@email.com"
        },
        doctorInfo: {
          fullName: "Dr. Michael Chen",
          department: "Cardiology"
        },
        appointmentDate: new Date().toISOString(),
        timeSlot: { start: "09:00 AM", end: "09:30 AM" },
        status: "Confirmed",
        reason: "Regular checkup and blood pressure monitoring"
      },
      {
        _id: "2",
        patientInfo: {
          patientId: "PT-2024-002",
          fullName: "James Wilson",
          profileImage: "",
          phone: "+1 234-567-8901",
          email: "james.w@email.com"
        },
        doctorInfo: {
          fullName: "Dr. Emily Rodriguez",
          department: "Orthopedics"
        },
        appointmentDate: new Date().toISOString(),
        timeSlot: { start: "10:30 AM", end: "11:00 AM" },
        status: "Pending",
        reason: "Knee pain assessment"
      },
      {
        _id: "3",
        patientInfo: {
          patientId: "PT-2024-003",
          fullName: "Maria Garcia",
          profileImage: "",
          phone: "+1 234-567-8902",
          email: "maria.g@email.com"
        },
        doctorInfo: {
          fullName: "Dr. Michael Chen",
          department: "Cardiology"
        },
        appointmentDate: new Date().toISOString(),
        timeSlot: { start: "11:30 AM", end: "12:00 PM" },
        status: "With-Doctor",
        reason: "Follow-up consultation"
      },
      {
        _id: "4",
        patientInfo: {
          patientId: "PT-2024-004",
          fullName: "Robert Brown",
          profileImage: "",
          phone: "+1 234-567-8903",
          email: "robert.b@email.com"
        },
        doctorInfo: {
          fullName: "Dr. Sarah Williams",
          department: "Dermatology"
        },
        appointmentDate: new Date(Date.now() + 86400000).toISOString(),
        timeSlot: { start: "02:00 PM", end: "02:30 PM" },
        status: "Confirmed",
        reason: "Skin allergy consultation"
      },
      {
        _id: "5",
        patientInfo: {
          patientId: "PT-2024-005",
          fullName: "Lisa Anderson",
          profileImage: "",
          phone: "+1 234-567-8904",
          email: "lisa.a@email.com"
        },
        doctorInfo: {
          fullName: "Dr. Emily Rodriguez",
          department: "Orthopedics"
        },
        appointmentDate: new Date(Date.now() + 86400000).toISOString(),
        timeSlot: { start: "03:15 PM", end: "03:45 PM" },
        status: "Cancelled",
        reason: "Shoulder pain evaluation"
      }

    ];
    setAppointments(mockData);
    setFilteredAppointments(mockData);
  }, []);

  useEffect(() => {
    let filtered = appointments;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.patientInfo?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.patientInfo?.patientId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.doctorInfo?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // Date filter
    if (dateFilter === "today") {
      const today = new Date().toDateString();
      filtered = filtered.filter(
        (a) => new Date(a.appointmentDate).toDateString() === today
      );
    }

    setFilteredAppointments(filtered);
  }, [searchQuery, statusFilter, dateFilter, appointments]);

  const handleSaveEdit = (updatedAppointment) => {
    setAppointments(
      appointments.map((a) => (a._id === updatedAppointment._id ? updatedAppointment : a))
    );
    setEditAppointment(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const updatedAppointments = appointments.map(a =>
        a._id === appointmentId
          ? { ...a, status: 'Cancelled' }
          : a
      );
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
    }
  };

  const handleAddAppointment = () => {
    const newAppointment = {
      _id: `PT-${Date.now()}`,
      patientInfo: {
        patientId: `PT-2024-${String(appointments.length + 1).padStart(3, '0')}`,
        fullName: "New Patient",
        profileImage: "",
        phone: "+1 234-567-8900",
        email: "new.patient@email.com"
      },
      doctorInfo: {
        fullName: "Dr. New Doctor",
        department: "General"
      },
      appointmentDate: new Date().toISOString(),
      timeSlot: { start: "09:00 AM", end: "09:30 AM" },
      status: "Pending",
      reason: "New appointment"
    };

    setAppointments([...appointments, newAppointment]);
    alert('New appointment added!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header onAddAppointment={handleAddAppointment} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <StatsCards appointments={appointments} />

        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />

        <AppointmentsTable
          appointments={filteredAppointments}
          openMenu={openMenu}
          onMenuToggle={setOpenMenu}
          onViewDetails={setSelectedAppointment}
          onEdit={setEditAppointment}
          onCancel={handleCancelAppointment}
        />
      </div>

      {/* Modals */}
      {editAppointment && (
        <EditModal
          appointment={editAppointment}
          onSave={handleSaveEdit}
          onClose={() => setEditAppointment(null)}
        />
      )}

      {selectedAppointment && (
        <ViewModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onEdit={(appt) => {
            setEditAppointment(appt);
            setSelectedAppointment(null);
          }}
          onCancel={handleCancelAppointment}
        />
      )}

      {/* Click outside to close dropdown */}
      {(openMenu || selectedAppointment || editAppointment) && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => {
            setOpenMenu(null);
            if (!selectedAppointment && !editAppointment) return;
            if (e.target === e.currentTarget) {
              setSelectedAppointment(null);
              setEditAppointment(null);
            }
          }}
        ></div>
      )}
    </div>
  );
}