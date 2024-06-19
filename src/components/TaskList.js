import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';

const TaskList = ({ stageId, onSelectTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks(stageId));
    }
  }, [taskStatus, dispatch, stageId]);

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => onSelectTask(null)}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => onSelectTask(task.id)}>{task.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
