import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStages } from '../store/stageSlice';

const StageList = ({ projectId, onSelectStage }) => {
  const dispatch = useDispatch();
  const stages = useSelector((state) => state.stages.stages);
  const stageStatus = useSelector((state) => state.stages.status);

  useEffect(() => {
    if (stageStatus === 'idle') {
      dispatch(fetchStages(projectId));
    }
  }, [stageStatus, dispatch, projectId]);

  return (
    <div>
      <h2>Stages</h2>
      <button onClick={() => onSelectStage(null)}>Add Stage</button>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            <button onClick={() => onSelectStage(stage.id)}>{stage.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StageList;
