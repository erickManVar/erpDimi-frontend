import { configureStore } from '@reduxjs/toolkit';
import contractorReducer from './contractorSlice';
import materialReducer from './materialSlice';
import progressReducer from './progressSlice';
import projectReducer from './projectSlice';
import stageReducer from './stageSlice';
import subTaskReducer from './subTaskSlice';
import taskReducer from './taskSlice';
import scheduleReducer from './scheduleSlice';

const store = configureStore({
  reducer: {
    contractors: contractorReducer,
    materials: materialReducer,
    progress: progressReducer,
    projects: projectReducer, // Asegúrate de tener esto
    stages: stageReducer,
    subTasks: subTaskReducer,
    tasks: taskReducer,
    schedules: scheduleReducer,
  },
});

export default store;
