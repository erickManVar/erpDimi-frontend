import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaterials } from '../store/materialSlice';

const MaterialList = ({ projectId, onSelectMaterial }) => {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.materials.materials);
  const materialStatus = useSelector((state) => state.materials.status);

  useEffect(() => {
    if (materialStatus === 'idle') {
      dispatch(fetchMaterials(projectId));
    }
  }, [materialStatus, dispatch, projectId]);

  return (
    <div>
      <h2>Materials</h2>
      <button onClick={() => onSelectMaterial(null)}>Add Material</button>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <button onClick={() => onSelectMaterial(material.id)}>{material.description}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
