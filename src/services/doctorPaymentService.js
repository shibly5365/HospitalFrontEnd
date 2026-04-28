import axios from "axios";

const API = "http://localhost:4002/api/doctor";

// 🔥 Axios instance with cookies
const api = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ VERY IMPORTANT
});

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
