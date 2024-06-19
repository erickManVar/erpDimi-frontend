import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';

const ProjectList = ({ onSelectProject }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectStatus = useSelector((state) => state.projects.status);

  useEffect(() => {
    if (projectStatus === 'idle') {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={() => onSelectProject(null)}>Add Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => onSelectProject(project.id)}>{project.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
