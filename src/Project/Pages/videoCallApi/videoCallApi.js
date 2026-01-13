import axios from "axios";

const API_BASE = "http://localhost:4002/api";
export const getVideoCallStatus = (appointmentId) => {
  const role = localStorage.getItem("role"); 

  if (!role) {
    throw new Error("User role not found");
  }

  return axios.get(
    `${API_BASE}/${role}/video-call-status/${appointmentId}`
  );
};


export const createVideoCall = (appointmentId) => {
  return axios.post(
    `${API_BASE}/patient/video-call/${appointmentId}`
  );
};

export const endVideoCall = (appointmentId) => {
  return axios.put(
    `${API_BASE}/patient/video-call-end/${appointmentId}`
  );
};
