import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchStages = createAsyncThunk('stages/fetchStages', async (projectId) => {
  const response = await axios.get(`/projects/${projectId}/stages`);
  return response.data;
});

export const createStage = createAsyncThunk('stages/createStage', async (data) => {
  const response = await axios.post('/stages', data);
  return response.data;
});

const stageSlice = createSlice({
  name: 'stages',
  initialState: {
    stages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stages = action.payload;
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createStage.fulfilled, (state, action) => {
        state.stages.push(action.payload);
      });
  },
});

export default stageSlice.reducer;
