import { Task } from '../../model/task';
import { v4 } from 'uuid';
import { updateProject } from '../project';
import { Project } from '../../model/project';

export const updateTask = async (project: Project, taskId: string, taskUpdate: Partial<Task>) => {
  console.log(taskId, taskUpdate);
  const updatedTasks = project.tasks.map((task) => {
    if (task.id === taskId) {
      task = { ...task, ...taskUpdate };
      console.log('yes', task);
    }
    return task;
  });
  project.tasks = updatedTasks;
  console.log('updated project', project);
  return await updateProject(project.id, project);
};

export const createTask = async (name: string, description: string, project: Project) => {
  const newTask = { name, description, id: v4(), projectId: project.id, assignee: undefined };
  project.tasks.push(newTask);
  updateProject(project.id, project);
};
