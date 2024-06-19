import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async (projectId) => {
  const response = await axios.get(`/projects/${projectId}/materials`);
  return response.data;
});

export const createMaterial = createAsyncThunk('materials/createMaterial', async (data) => {
  const response = await axios.post('/materials', data);
  return response.data;
});

const materialSlice = createSlice({
  name: 'materials',
  initialState: {
    materials: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials.push(action.payload);
      });
  },
});

export default materialSlice.reducer;
