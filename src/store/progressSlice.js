import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchProgress = createAsyncThunk('progress/fetchProgress', async (projectId) => {
  const response = await axios.get(`/projects/${projectId}/progress`);
  return response.data;
});

export const createProgress = createAsyncThunk('progress/createProgress', async (data) => {
  const response = await axios.post('/progress', data);
  return response.data;
});

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progress: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.progress = action.payload;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProgress.fulfilled, (state, action) => {
        state.progress.push(action.payload);
      });
  },
});

export default progressSlice.reducer;
