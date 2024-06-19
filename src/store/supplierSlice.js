import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await axios.get('/suppliers');
  return response.data;
});

export const createSupplier = createAsyncThunk('suppliers/createSupplier', async (data) => {
  const response = await axios.post('/suppliers', data);
  return response.data;
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.suppliers.push(action.payload);
      });
  },
});

export default supplierSlice.reducer;
