import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4002/api/admin",
  withCredentials: true, // ✅ THIS IS REQUIRED FOR COOKIES
});

// ===============================
// ✅ DASHBOARD COUNTS
// ===============================
export const getDashboardCounts = () =>
  API.get("/dashboard-counts");



// ===============================
// ✅ PENDING APPOINTMENTS
// ===============================
export const getPendingAppointments = () =>
  API.get("/pending-appointments");

// ===============================
// ✅ MONTHLY STATS
// ===============================
export const getPatientMonthlyStats = () =>
  API.get("/patient-monthly-stats");

// ===============================
// ✅ GENDER STATS
// ===============================
export const getPatientGenderStats = () =>
  API.get("/patient-gender-stats");

// ===============================
// ✅ TODAY DOCTORS
// ===============================
export const getTodayDoctors = () =>
  API.get("/today-doctors");

export const getLatestAppointments = (limit = 10) =>
  API.get(`/getlatest?limit=${limit}`);

export const updateAppointmentStatus = (id, status) =>
  API.put(`/updateAppointment/${id}`, { status });