import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get('/projects');
  return response.data;
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (id) => {
  const response = await axios.get(`/projects/${id}`);
  return response.data;
});

export const createProject = createAsyncThunk('projects/createProject', async (projectData) => {
  const response = await axios.post('/projects', projectData);
  return response.data;
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, projectData }) => {
  const response = await axios.put(`/projects/${id}`, projectData);
  return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
  const response = await axios.delete(`/projects/${id}`);
  return response.data;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.meta.arg);
      });
  },
});

export default projectSlice.reducer;
