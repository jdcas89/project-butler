import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { assignTask, getProject } from '../shared/api';
import { Project, Task } from '../shared/types';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal';
import CreateTask from './CreateTask';
import ProjectMembers from '../components/ProjectMembers';
import TaskDetail from './TaskDetail';
import { APP_URL } from '../config/constants';

const ProjectDetails = () => {
  const queryClient = useQueryClient();

  const match = useRouteMatch<{ projectId: string }>('/projects/:projectId');
  const { data, isLoading, isSuccess, refetch, isError, error } = useQuery<Project, Error>('getProject', () => {
    return getProject(match?.params.projectId);
  });

  const history = useHistory();

  const [createTaskModal, setCreateTaskModalOpen] = useState<boolean>(false);
  const [detailTaskModal, setDetailTaskModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>();

  const { mutate: assignTaskMutation } = useMutation<any, any, { projectId: string; taskId: string; assigneeId: string }>(
    'assignTask',
    ({ assigneeId, projectId, taskId }) => assignTask(projectId, taskId, assigneeId),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData('getProject', data);
        setCurrentTask((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              assigneeId: variables.assigneeId,
            };
          }
        });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [createTaskModal, refetch]);

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const copyInvitation = () => {
    if (data) {
      navigator.clipboard.writeText(`${APP_URL}/invitation/${data.invitationCode}`).then(
        function () {
          console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        }
      );
    }
  };

  if (data && !isLoading && isSuccess) {
    return (
      <div className="bg-blue-100 h-screen p-4">
        {createTaskModal && (
          <Modal setModalOpen={setCreateTaskModalOpen} title="Create Task" open={createTaskModal}>
            <CreateTask projectId={data.id} closeModal={() => setCreateTaskModalOpen(false)} />
          </Modal>
        )}

        {detailTaskModal && currentTask && (
          <Modal setModalOpen={setDetailTaskModalOpen} title={currentTask?.name || ''} open={detailTaskModal}>
            <TaskDetail
              users={data.users}
              task={currentTask}
              projectId={data.id}
              closeModal={() => {
                setDetailTaskModalOpen(false);
              }}
              onUserSelected={(assigneeId) => {
                assignTaskMutation({ assigneeId, taskId: currentTask.id, projectId: data.id });
              }}
            />
          </Modal>
        )}
        <div className="flex justify-between">
          <div className="flex items-center mb-4">
            <button className="p-2 bg-green-500 rounded shadow text-white leading-loose mr-2" onClick={() => history.push('/')}>
              Back to all projects
            </button>
            <h1 className="font-bold text-lg" data-testid="project-title">
              Project: {data.name}
            </h1>
          </div>
          <div>
            <button className="p-2 bg-green-500 rounded shadow text-white leading-loose" onClick={() => setCreateTaskModalOpen(true)}>
              Create task
            </button>
          </div>
        </div>
        <div className="flex justify-between mx-4 my-2">
          <div className="p-2 bg-white w-auto mt-2" onClick={copyInvitation}>
            <p>Invitation link</p>
            <span data-testid="invitation-link" className="font-bold text-blue-900">{`${APP_URL}/invitation/${data.invitationCode}`}</span>
          </div>
          <ProjectMembers invitationCode={data.invitationCode} users={data.users} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-8">
          {data &&
            data.tasks.map((t) => (
              <TaskCard
                onTaskClicked={(task) => {
                  setCurrentTask(task);
                  setDetailTaskModalOpen(true);
                }}
                key={t.id}
                {...t}
              />
            ))}
        </div>
      </div>
    );
  }

  return <>Loading...</>;
};

export default ProjectDetails;
