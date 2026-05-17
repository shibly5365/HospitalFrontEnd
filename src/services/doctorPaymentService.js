import { apiClient } from "./queryClient";

const doctorPath = (path) => `/doctor${path}`;

// 🔥 Axios instance with cookies
const api = {
  get: (path, config) => apiClient.get(doctorPath(path), config),
  put: (path, data, config) => apiClient.put(doctorPath(path), data, config),
};

// 🔥 GET ALL PAYMENTS
export const getAllPayments = (params) => {
  return api.get("/getallPayments", { params });
};

// 🔥 GET PAYMENT BY ID
export const getPaymentById = (id) => {
  return api.get(`/getallPayments/${id}`);
};

// 🔥 REFUND
export const refundPayment = (id) => {
  return api.put(`/paymentsUpdate/${id}/refund`);
};

// 🔥 STATS
export const getStats = () => {
  return api.get("/stats");
};

// 🔥 WEEKLY
export const getWeeklyRevenue = () => {
  return api.get("/weekly-revenue");
};

// 🔥 METHODS
export const getPaymentMethods = () => {
  return api.get("/payment-methods");
};
