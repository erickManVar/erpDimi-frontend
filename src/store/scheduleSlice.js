
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Thunk para obtener los cronogramas desde la API
export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async () => {
  const response = await axios.get('/schedules');
  return response.data;
});

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState: {
    schedules: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default scheduleSlice.reducer;
