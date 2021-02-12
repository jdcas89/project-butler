import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProjects } from '../shared/api';
import { Project } from '../shared/types';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import ProjectJoin from './ProjectJoin';
import ProjectCreate from './ProjectCreate';

const Projects = () => {
  const { data: projects, refetch, isLoading, isError } = useQuery<Project[]>('getProjects', () => getProjects());

  const [joinModalOpen, setJoinModal] = useState<boolean>(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [joinModalOpen, createProjectModalOpen]);

  if (projects && !isError && !isLoading) {
    return (
      <div className="bg-blue-100 h-screen p-4">
        {joinModalOpen && (
          <Modal setModalOpen={setJoinModal} title="Join project" open={joinModalOpen}>
            <ProjectJoin closeModal={() => setJoinModal(false)} />
          </Modal>
        )}
        {createProjectModalOpen && (
          <Modal setModalOpen={setCreateProjectModalOpen} title="Create Project" open={createProjectModalOpen}>
            <ProjectCreate closeModal={() => setCreateProjectModalOpen(false)} />
          </Modal>
        )}
        <div className="flex justify-between">
          <h1>Projects overview</h1>
          <div>
            <button className="p-2 bg-blue-900 rounded shadow text-white leading-loose mr-2" onClick={() => setJoinModal(true)}>
              Join project
            </button>
            <button
              data-testid="actions-create-project"
              className="p-2 bg-green-500 rounded shadow text-white leading-loose"
              onClick={() => setCreateProjectModalOpen(true)}
            >
              Create project
            </button>
          </div>
        </div>

        {projects.length === 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            <p>No projects found</p>
          </div>
        )}
        {projects.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">{projects && projects.map((p) => <ProjectCard key={p.id} {...p} />)}</div>
        )}
      </div>
    );
  }

  return <>Loading...</>;
};

export default Projects;
