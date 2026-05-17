import { apiClient } from "../../../services/queryClient";

// ✅ JOIN CALL (instead of createVideoCall)
export const createVideoCall = (appointmentId, role) => {
  return apiClient.get(
    `/${role}/appointments/${appointmentId}/join-call`,
    { withCredentials: true }
  );
};

// ✅ GET STATUS (optional)
export const getVideoCallStatus = (appointmentId, role) => {
  return apiClient.get(
    `/${role}/appointments/${appointmentId}/join-call`,
    { withCredentials: true }
  );
};

// ✅ END CALL
export const endVideoCall = (appointmentId, role) => {
  return apiClient.post(
    `/${role}/appointments/end-call`,
    { appointmentId },
    { withCredentials: true }
  );
};