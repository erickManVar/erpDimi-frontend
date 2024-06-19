import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubTasks } from '../store/subTaskSlice';

const SubTaskList = ({ taskId, onSelectSubTask }) => {
  const dispatch = useDispatch();
  const subTasks = useSelector((state) => state.subTasks.subTasks);
  const subTaskStatus = useSelector((state) => state.subTasks.status);

  useEffect(() => {
    if (subTaskStatus === 'idle') {
      dispatch(fetchSubTasks(taskId));
    }
  }, [subTaskStatus, dispatch, taskId]);

  return (
    <div>
      <h2>SubTasks</h2>
      <button onClick={() => onSelectSubTask(null)}>Add SubTask</button>
      <ul>
        {subTasks.map((subTask) => (
          <li key={subTask.id}>
            <button onClick={() => onSelectSubTask(subTask.id)}>{subTask.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskList;
