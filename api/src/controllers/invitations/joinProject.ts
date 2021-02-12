import { IProjectRole, ProjectRoleEnum } from '../../model/projectRole';
import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { getProjectByInvitationCode } from '../../services/project';
import { logger } from '../../utils/logger';
import { createProjectRole, getProjectRolesForUser } from '../../services/projectRole';

export const joinProject = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('JOIN project by invitation code');
    const project = await getProjectByInvitationCode(req.params.invitationCode);
    const projectRoles: IProjectRole[] = await getProjectRolesForUser(res.locals.currentUser.id);
    if (projectRoles.find((p) => p.projectId === project.id))
      return res.status(400).send({ message: 'You already belong to this project' });

    if (project) {
      await createProjectRole({
        projectId: project.id,
        userId: res.locals.currentUser.id,
        role: ProjectRoleEnum.PROJECT_MEMBER,
      });
      return res.send(project);
    } else {
      throw new Error('Project does not exist');
    }
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ message: 'Something went wrong' });
  }
};
