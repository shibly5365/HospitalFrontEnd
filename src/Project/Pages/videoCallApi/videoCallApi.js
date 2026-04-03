import axios from "axios";

const API_BASE = "http://localhost:4002/api";

const config = {
  withCredentials: true,
};

export const getVideoCallStatus = (appointmentId) =>
  axios.get(`${API_BASE}/video-call-status/${appointmentId}`, config);

export const createVideoCall = (appointmentId) =>
  axios.post(`${API_BASE}/video-call/${appointmentId}`, {}, config);

export const endVideoCall = (appointmentId) =>
  axios.put(`${API_BASE}/video-call-end/${appointmentId}`, {}, config);
