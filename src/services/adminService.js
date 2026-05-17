import { apiClient } from "./queryClient";

const adminPath = (path) => `/admin${path}`;

const API = {
  get: (path, config) => apiClient.get(adminPath(path), config),
  post: (path, data, config) => apiClient.post(adminPath(path), data, config),
  put: (path, data, config) => apiClient.put(adminPath(path), data, config),
  delete: (path, config) => apiClient.delete(adminPath(path), config),
};

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

export const getDoctorOverview = (id) =>
  API.get(`/doctors/${id}/dashboard/overview`);

export const updateDoctorStatus = (id, status) =>
  API.put(`/update-doctor-status/${id}`, { status });

export const updateDoctorSalary = (id, salary) =>
  API.put(`/update-salary/${id}`, { salary });

// ================= PATIENTS =================

export const getDoctorPatients = (id) =>
  API.get(`/doctors/${id}/patients`);

// ================= ATTENDANCE =================

export const getDoctorAttendance = (id) =>
  API.get(`/doctors/${id}/attendance`);

// ================= LEAVES =================

export const getDoctorLeaves = (id) =>
  API.get(`/doctors/${id}/leaves`);

export const leaveAction = (leaveId, action) =>
  API.post(`/leave-action/${leaveId}`, { action });

// ================= PAYMENTS =================

export const getDoctorPayments = (id) =>
  API.get(`/doctors/${id}/dashboard/payments`);

// ================= ACTIVITY =================

export const getDoctorActivity = (id) =>
  API.get(`/doctors/${id}/dashboard/activity`);
