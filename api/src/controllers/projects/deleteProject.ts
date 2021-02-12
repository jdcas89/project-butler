import { Project } from '../../model/project';
import { IProjectRole, ProjectRole } from '../../model/projectRole';
import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { logger } from '../../utils/logger';
import { getProjectById } from '../../services/project';
import { getProjectRolesForUser } from '../../services/projectRole';

export const deleteProject = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('Delete project');
    const project = await getProjectById(req.params.projectId);
    const projectRoles: IProjectRole[] = await getProjectRolesForUser(res.locals.currentUser.id);
    if (!projectRoles.find((p) => p.projectId === project.id)) return res.status(401).send({ message: 'Unauthorized' });

    return res.send(project);
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ message: 'Something went wrong' });
  }
};
