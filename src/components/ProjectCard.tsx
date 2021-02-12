import React from 'react';
import { useHistory } from 'react-router-dom';
import { Project } from '../shared/types';

const ProjectCard: React.FC<Project> = ({ name, id, tasks }) => {
  const history = useHistory();
  return (
    <div className="bg-white p-4 shadow rounded cursor-pointer hover:shadow-xl" onClick={() => history.push('/projects/' + id)}>
      <h2 className="text-xl">{name}</h2>
      <p className="text-gray-500">Tasks: {tasks.length}</p>
    </div>
  );
};

export default ProjectCard;
