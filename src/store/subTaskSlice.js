import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchSubTasks = createAsyncThunk('subTasks/fetchSubTasks', async (taskId) => {
  const response = await axios.get(`/tasks/${taskId}/subtasks`);
  return response.data;
});

export const createSubTask = createAsyncThunk('subTasks/createSubTask', async (data) => {
  const response = await axios.post('/subtasks', data);
  return response.data;
});

const subTaskSlice = createSlice({
  name: 'subTasks',
  initialState: {
    subTasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subTasks = action.payload;
      })
      .addCase(fetchSubTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSubTask.fulfilled, (state, action) => {
        state.subTasks.push(action.payload);
      });
  },
});

export default subTaskSlice.reducer;
