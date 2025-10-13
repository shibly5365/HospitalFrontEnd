import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Clock,
  Video,
  Phone,
  MessageSquare,
  MoreVertical,
  Filter,
  CheckCircle,
  XCircle,
} from "lucide-react";
import DashboardNav from "./DashboardNav";
import AppointmentForm from "./DoctorPages/AppointmentForm";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Units/notification";

const DoctorAppointment = () => {
  const [view, setView] = useState("list");
  const [appointments, setAppointments] = useState([]);
  const [statusStats, setStatusStats] = useState(null); // 👈 store status response
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apptRes = await axios.get(
          "http://localhost:4002/api/doctor/appointments",
          { withCredentials: true }
        );

        setAppointments(apptRes.data.appointments || []);
        // console.log(apptRes);
        
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  // console.log(appointments);
  

  const handleUpdateStatus = async (appointmentId, newStatus, notes = "") => {
    try {
      const res = await axios.put(
        "http://localhost:4002/api/doctor/appointments/status",
        {
          appointmentId,
          status: newStatus,
          notes,
        },
        { withCredentials: true }
      );

      console.log("Status updated:", res.data);

      // Update UI without refreshing
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Error updating appointment:", err.response?.data || err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <DashboardNav />
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Appointments</h2>
            <p className="text-gray-600">
              Manage your patient appointments and schedule
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition"
              onClick={() => setShowForm(true)} // 👈 Open modal
            >
              + New Appointment
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search patients by name, phone, or complaint..."
            className="flex-1 p-2 border rounded"
          />
          <select className="border p-2 rounded">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <select className="border p-2 rounded">
            <option>Today</option>
            <option>This Week</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-200 rounded-full w-fit p-1 mb-6">
          <div
            onClick={() => setView("list")}
            className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition ${
              view === "list"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            List View
          </div>
          <div
            onClick={() => setView("calendar")}
            className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition ${
              view === "calendar"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Calendar View
          </div>
        </div>

        {/* List View */}
        {view === "list" && (
          <div className="space-y-3">
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <div
                  key={appt._id || index}
                  className="flex border border-gray-200 rounded-xl overflow-hidden shadow-sm h-24 
             hover:shadow-lg hover:-translate-y-1 transition duration-300 bg-white"
                >
                  {/* Left color bar */}
                  <div
                    className={`w-2 ${
                      index % 2 === 0 ? "bg-blue-500" : "bg-red-500"
                    }`}
                  ></div>

                  {/* Content */}
                  <div className="flex-1 px-4 flex justify-between items-center">
                    {/* Left: patient details */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                        {appt.patient.fullName
                          ? appt.patient.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "NA"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {appt.patient.fullName || "Unknown"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {appt.patient.age
                            ? `${appt.patient.age} yrs, ${appt.patient.gender}`
                            : ""}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {appt.reason || appt.issue}
                        </p>
                      </div>
                    </div>

                    {/* Right: time, status, icons */}
                    <div className="flex items-center space-x-5">
                      {/* Time with Clock Icon */}
                      <div className="flex items-center text-gray-700 font-medium">
                        <Clock size={16} className="mr-1" />
                        <span>{appt.timeSlot?.start || appt.time}</span>
                      </div>

                      {/* Status */}
                      <p
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          appt.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appt.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appt.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {appt.status}
                      </p>

                      {/* Action Buttons Based on Status */}
                      <div className="flex space-x-2">
                        {appt.status === "Confirmed" && (
                          <>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <Video size={16} />
                            </button>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <Phone size={16} />
                            </button>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <MessageSquare size={16} />
                            </button>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <MoreVertical size={16} />
                            </button>
                          </>
                        )}

                        {appt.status === "Pending" && (
                          <div className="flex gap-1">
                            {/* Green Check */}
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-green-500 rounded-md 
      hover:bg-green-50 hover:scale-110 hover:shadow-md transition transform duration-200"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to CONFIRM this appointment?"
                                  )
                                ) {
                                  handleUpdateStatus(appt._id, "Confirmed");
                                  notify.success("Appointment Confirmed ✅");
                                }
                              }}
                            >
                              <CheckCircle size={16} />
                            </button>

                            {/* Red Cross */}
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-red-500 rounded-md 
      hover:bg-red-50 hover:scale-110 hover:shadow-md transition transform duration-200"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to Cancelled this appointment?"
                                  )
                                ) {
                                  handleUpdateStatus(appt._id, "Cancelled");
                                  notify.error("Appointment Cancelled ❌");
                                }
                              }}
                            >
                              <XCircle size={16} />
                            </button>

                            {/* Message */}
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-800 rounded-md 
      hover:bg-gray-100 hover:scale-110 hover:shadow-md transition transform duration-200"
                            >
                              <MessageSquare size={16} />
                            </button>

                            {/* 3 Dots */}
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-800 rounded-md 
      hover:bg-gray-100 hover:scale-110 hover:shadow-md transition transform duration-200"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        )}

                        {appt.status === "Completed" && (
                          <>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <MessageSquare size={16} />
                            </button>
                            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                              <MoreVertical size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No appointments found.
              </p>
            )}
          </div>
        )}

        {/* Calendar View Placeholder */}
        {view === "calendar" && (
          <div className="p-8 text-center text-gray-500 border rounded-lg">
            📅 Calendar view will go here.
          </div>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative w-full max-w-3xl">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              ✕
            </button>

            <div className="bg-white rounded-2xl shadow-lg">
              <AppointmentForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
