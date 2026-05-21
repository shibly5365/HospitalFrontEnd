import { configureStore } from "@reduxjs/toolkit";
import medicalRecordsReducer from "./slices/medicalRecordsSlice";
import consultationsReducer from "./slices/consultationsSlice";

export const store = configureStore({
  reducer: {
    medicalRecords: medicalRecordsReducer,
    consultations: consultationsReducer,
  },
});

export default store;
