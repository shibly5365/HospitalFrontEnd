import { apiClient } from "../../services/queryClient";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PATIENT_API = '/patient';

// Async thunk for fetching medical records
export const fetchMedicalRecords = createAsyncThunk(
  'medicalRecords/fetchMedicalRecords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `${PATIENT_API}/medicalRecord`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch medical records');
    }
  }
);

// Async thunk for fetching medical record by ID
export const fetchMedicalRecordById = createAsyncThunk(
  'medicalRecords/fetchMedicalRecordById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `${PATIENT_API}/medical/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch medical record');
    }
  }
);

// Async thunk for deleting medical record
export const deleteMedicalRecord = createAsyncThunk(
  'medicalRecords/deleteMedicalRecord',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `${PATIENT_API}/dlt/${id}`,
        { withCredentials: true }
      );
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete medical record');
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: 'medicalRecords',
  initialState: {
    patient: {
      name: '',
      age: null,
      gender: 'Not Specified',
      bloodGroup: 'Not Specified',
      contact: '',
      phone: '',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      allergies: 'None',
      chronic: 'None',
      height: null,
      weight: null,
    },
    prescriptions: [],
    consultations: [],
    labReports: [],
    vitals: {},
    selectedRecord: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedRecord: (state) => {
      state.selectedRecord = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all medical records
      .addCase(fetchMedicalRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.patient = action.payload.data.patient || state.patient;
          state.prescriptions = action.payload.data.prescriptions || [];
          state.consultations = action.payload.data.consultations || [];
          state.labReports = action.payload.data.labReports || [];
          state.vitals = action.payload.data.vitals || {};
        }
      })
      .addCase(fetchMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch medical record by ID
      .addCase(fetchMedicalRecordById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecordById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.selectedRecord = action.payload.record;
        }
      })
      .addCase(fetchMedicalRecordById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete medical record
      .addCase(deleteMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted record from lists
        state.consultations = state.consultations.filter(
          (record) => record.id !== action.payload.id
        );
      })
      .addCase(deleteMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedRecord } = medicalRecordsSlice.actions;
export default medicalRecordsSlice.reducer;
