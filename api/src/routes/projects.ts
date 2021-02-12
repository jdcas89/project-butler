import express from 'express';
import { currentAuthenticatedUser } from '../middleware/currentAuthenticatedUser';
import { currentProject } from '../middleware/currentProject';

import { getAllProjectsForUser } from '../controllers/projects/getAllProjects';
import { postProject } from '../controllers/projects/createProject';
import { getProject } from '../controllers/projects/getProject';
import { deleteProject } from '../controllers/projects/deleteProject';

const PROJECTS_API = '/api/projects';

const projectRouter = express.Router();

projectRouter.get(PROJECTS_API, currentAuthenticatedUser, getAllProjectsForUser);
projectRouter.post(PROJECTS_API, currentAuthenticatedUser, postProject);
projectRouter.get(`${PROJECTS_API}/:projectId`, currentAuthenticatedUser, currentProject, getProject);
projectRouter.delete(`${PROJECTS_API}/:projectId`, currentAuthenticatedUser, deleteProject);

export default projectRouter;
