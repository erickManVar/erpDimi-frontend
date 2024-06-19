import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchContractors = createAsyncThunk('contractors/fetchContractors', async (projectId) => {
  const response = await axios.get(`/projects/${projectId}/contractors`);
  return response.data;
});

export const createContractor = createAsyncThunk('contractors/createContractor', async (data) => {
  const response = await axios.post('/contractors', data);
  return response.data;
});

const contractorSlice = createSlice({
  name: 'contractors',
  initialState: {
    contractors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContractors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contractors = action.payload;
      })
      .addCase(fetchContractors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createContractor.fulfilled, (state, action) => {
        state.contractors.push(action.payload);
      });
  },
});

export default contractorSlice.reducer;
