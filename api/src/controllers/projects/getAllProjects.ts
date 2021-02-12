import { IProjectRole } from '../../model/projectRole';
import { getProjectRolesForUser } from '../../services/projectRole';
import { getProjectsByIds } from '../../services/project';
import { ExtendedResponse } from '../../types/types';
import { Request } from 'express';
import { logger } from '../../utils/logger';

export const getAllProjectsForUser = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('GET all projects');
    const projectRoles: IProjectRole[] = await getProjectRolesForUser(res.locals.currentUser.id);
    const projectIds = projectRoles.map((p) => p.projectId);
    const projectsForUser = await getProjectsByIds(projectIds);
    res.send(projectsForUser);
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ message: 'Something went wrong' });
  }
};
