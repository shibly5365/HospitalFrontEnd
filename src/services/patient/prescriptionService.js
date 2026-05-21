// src/services/patient/prescriptionService.js

import { apiClient } from "../queryClient";

// ==========================================
// GET ALL PRESCRIPTIONS
// ==========================================

export const getAllPrescriptions = async () => {
  const res = await apiClient.get("/patient/priesc");
  

  return res.data;
};

// ==========================================
// GET PRESCRIPTION BY ID
// ==========================================

export const getPrescriptionById = async (prescriptionId) => {
  const res = await apiClient.get(`/patient/prescriptions/${prescriptionId}`);

  return res.data;
};

// ==========================================
// DOWNLOAD PRESCRIPTION PDF
// ==========================================

export const downloadPrescriptionPdf = async (prescriptionId) => {
  const res = await apiClient.get(
    `/patient/prescriptions/${prescriptionId}/download`,
    {
      responseType: "blob",
    },
  );

  return res.data;
};
