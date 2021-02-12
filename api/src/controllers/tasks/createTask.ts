import { ProjectRoleEnum } from '../../model/projectRole';
import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { createTask } from '../../services/task';
import { logger } from '../../utils/logger';

export const postTask = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('POST Task');

    if (res.locals.currentProjectRole?.role !== ProjectRoleEnum.PROJECT_ADMINISTRATOR) {
      return res.status(401).send();
    }
    const task = await createTask(req.body.name, req.body.description, res.locals.currentProject);
    return res.status(201).send(task);
  } catch (e) {
    console.log(e);
    return res.send({ message: 'Something went wrong' });
  }
};
