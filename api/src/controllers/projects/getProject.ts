import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { logger } from '../../utils/logger';
import { ProjectDto } from '../../dto/ProjectDto';

export const getProject = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('GET project');
    const projectResponse: ProjectDto = { ...res.locals.currentProject, users: res.locals.usersForProject };
    return res.send(projectResponse);
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ message: 'Something went wrong' });
  }
};
