import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgress } from '../store/progressSlice';

const ProgressList = ({ projectId, onSelectProgress }) => {
  const dispatch = useDispatch();
  const progressList = useSelector((state) => state.progress.progress);
  const progressStatus = useSelector((state) => state.progress.status);

  useEffect(() => {
    if (progressStatus === 'idle') {
      dispatch(fetchProgress(projectId));
    }
  }, [progressStatus, dispatch, projectId]);

  return (
    <div>
      <h2>Progress</h2>
      <button onClick={() => onSelectProgress(null)}>Add Progress</button>
      <ul>
        {progressList.map((progress) => (
          <li key={progress.id}>
            <button onClick={() => onSelectProgress(progress.id)}>{`Week ${progress.week}: ${progress.progress}`}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressList;
