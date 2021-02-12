import { IProjectRole } from '../model/projectRole';
import { NextFunction, Request } from 'express';
import { ExtendedResponse } from '../types/types';
import { IUser } from '../model/user';
import { getProjectById } from '../services/project';
import { getProjectRolesForProject } from '../services/projectRole';
import { getUsersByIds } from '../services/user';
import { Project } from '../model/project';

export const currentProject = async (req: Request, res: ExtendedResponse, next: NextFunction) => {
  if (res.locals.currentUser) {
    const project: Project = await getProjectById(req.params.projectId);
    const projectRoles: IProjectRole[] = await getProjectRolesForProject(req.params.projectId);

    const currentProjectRole = projectRoles.find((p) => p.userId === res.locals.currentUser.id);
    if (!currentProjectRole) return res.status(401).send({ message: 'Unauthorized' });

    const currentUsers = await getUsersByIds(projectRoles.map((p) => p.userId));
    res.locals.currentProject = project;
    res.locals.usersForProject = currentUsers;
    res.locals.currentProjectRole = currentProjectRole;
    next();
  } else {
    return res.status(401).send();
  }
};
