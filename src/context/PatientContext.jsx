import React, { createContext, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicalRecords,
  fetchMedicalRecordById,
  deleteMedicalRecord,
} from "../store/slices/medicalRecordsSlice";
import { fetchConsultationsByDoctor } from "../store/slices/consultationsSlice";
import { notify } from "../UnitsTemp/notification";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Medical Records selectors
  const medicalRecordsState = useSelector((state) => state.medicalRecords);
  const consultationsState = useSelector((state) => state.consultations);

  // Medical Records actions
  const loadMedicalRecords = useCallback(async () => {
    try {
      await dispatch(fetchMedicalRecords()).unwrap();
    } catch (error) {
      notify.error(error || "Failed to load medical records");
    }
  }, [dispatch]);

  const loadMedicalRecordById = useCallback(
    async (id) => {
      try {
        await dispatch(fetchMedicalRecordById(id)).unwrap();
      } catch (error) {
        notify.error(error || "Failed to load medical record");
      }
    },
    [dispatch]
  );

  const removeMedicalRecord = useCallback(
    async (id) => {
      try {
        await dispatch(deleteMedicalRecord(id)).unwrap();
        notify.success("Medical record deleted successfully");
        // Reload medical records after deletion
        await dispatch(fetchMedicalRecords()).unwrap();
      } catch (error) {
        notify.error(error || "Failed to delete medical record");
      }
    },
    [dispatch]
  );

  // Consultations actions
  const loadConsultations = useCallback(async () => {
    try {
      await dispatch(fetchConsultationsByDoctor()).unwrap();
    } catch (error) {
      notify.error(error || "Failed to load consultations");
    }
  }, [dispatch]);

  const value = {
    // Medical Records
    medicalRecords: {
      patient: medicalRecordsState.patient,
      prescriptions: medicalRecordsState.prescriptions,
      consultations: medicalRecordsState.consultations,
      labReports: medicalRecordsState.labReports,
      vitals: medicalRecordsState.vitals,
      selectedRecord: medicalRecordsState.selectedRecord,
      loading: medicalRecordsState.loading,
      error: medicalRecordsState.error,
      loadMedicalRecords,
      loadMedicalRecordById,
      removeMedicalRecord,
    },
    // Consultations
    consultations: {
      doctors: consultationsState.doctors,
      summary: consultationsState.summary,
      loading: consultationsState.loading,
      error: consultationsState.error,
      loadConsultations,
    },
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within PatientProvider");
  }
  return context;
};
