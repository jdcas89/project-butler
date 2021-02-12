import { currentAuthenticatedUser } from '../middleware/currentAuthenticatedUser';
import express from 'express';
import { currentProject } from '../middleware/currentProject';
import { postTask } from '../controllers/tasks/createTask';
import { assignTask } from '../controllers/tasks/assignTask';

const TASKS_API = '/api/projects/:projectId/tasks';

const tasksRouter = express.Router();

tasksRouter.post(`${TASKS_API}`, currentAuthenticatedUser, currentProject, postTask);
tasksRouter.put(`${TASKS_API}/:taskId/assign`, currentAuthenticatedUser, currentProject, assignTask);

export default tasksRouter;
