import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4002/api/patient';

// Async thunk for fetching consultations by doctor
export const fetchConsultationsByDoctor = createAsyncThunk(
  'consultations/fetchConsultationsByDoctor',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/consultations`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch consultations');
    }
  }
);

const consultationsSlice = createSlice({
  name: 'consultations',
  initialState: {
    doctors: [],
    summary: {
      totalDoctors: 0,
      totalVisits: 0,
      upcoming: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setActiveDoctor: (state, action) => {
      // This can be used for UI state if needed
      // Currently handled locally in component
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultationsByDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultationsByDoctor.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.doctors = action.payload.data.doctors || [];
          state.summary = action.payload.data.summary || {
            totalDoctors: 0,
            totalVisits: 0,
            upcoming: 0,
          };
        }
      })
      .addCase(fetchConsultationsByDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setActiveDoctor } = consultationsSlice.actions;
export default consultationsSlice.reducer;
