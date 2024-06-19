import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (stageId) => {
  const response = await axios.get(`/stages/${stageId}/tasks`);
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (data) => {
  const response = await axios.post('/tasks', data);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
