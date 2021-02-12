import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { updateTask } from '../../services/task';

export const assignTask = async (req: Request, res: ExtendedResponse) => {
  try {
    if (res.locals.currentProject) {
      const updatedProject = await updateTask(res.locals.currentProject, req.params.taskId, { assignee: req.body.assigneeId });
      return res.send({ ...updatedProject, users: res.locals.usersForProject });
    } else {
      throw new Error('Project does not exist');
    }
  } catch (e) {
    return res.send({ message: 'Something went wrong' });
  }
};
