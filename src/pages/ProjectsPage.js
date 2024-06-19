import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import CreateProject from '../components/CreateProject';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleProjectCreated = (newProject) => {
    console.log('New project created:', newProject);
    // Handle the newly created project (e.g., refresh the project list)
  };

  return (
    <div>
      <h1>Projects Click acaa</h1>
      <ProjectList onSelectProject={handleSelectProject} />
      {selectedProject && <div>Project ID: {selectedProject}</div>}
      <CreateProject onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default ProjectsPage;
