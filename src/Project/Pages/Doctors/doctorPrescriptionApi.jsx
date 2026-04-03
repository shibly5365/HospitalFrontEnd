import doctorApi from "./doctorApi";

export const createMedicalRecordApi = (payload) =>
  doctorApi.post("/medi-Creating", payload);

export const createPrescriptionApi = (payload) =>
  doctorApi.post("/creatingPres", payload);

export const createNextVisitAppointmentApi = (payload) =>
  doctorApi.post("/nextAppointment", payload);

export const getAppointmentByIdApi = (appointmentId) =>
  doctorApi.get(`/appointment/${appointmentId}`);
