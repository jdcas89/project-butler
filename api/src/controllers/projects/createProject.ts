import { ProjectRoleEnum } from '../../model/projectRole';
import { ExtendedResponse } from '../../types/types';
import { Request } from 'express';
import { logger } from '../../utils/logger';
import { createProjectRole } from '../../services/projectRole';
import { createProject } from '../../services/project';

export const postProject = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('POST project');
    const project = await createProject(req.body.name, res.locals.currentUser.name);
    if (project) {
      await createProjectRole({
        projectId: project.id,
        userId: res.locals.currentUser.id,
        role: ProjectRoleEnum.PROJECT_ADMINISTRATOR,
      });
    }

    return res.send(project);
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ data: 'Something went wrong' });
  }
};
