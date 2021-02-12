import { IProjectRole, ProjectRoleEnum } from '../../model/projectRole';
import { IUser } from '../../model/user';
import { Request } from 'express';
import { ExtendedResponse } from '../../types/types';
import { getProjectByInvitationCode } from '../../services/project';
import { logger } from '../../utils/logger';
import { getProjectRolesForProject } from '../../services/projectRole';
import { getUsersByIds } from '../../services/user';
import { ProjectInvitationDto } from '../../dto/ProjectInvitationDto';

export const getProjectByInvitation = async (req: Request, res: ExtendedResponse) => {
  try {
    logger.info('GET project by invitation code');
    const project = await getProjectByInvitationCode(req.params.invitationCode);
    const projectRoles: IProjectRole[] = await getProjectRolesForProject(project.id);
    const projectAdmin: IProjectRole | undefined = projectRoles.find((p) => p.role === ProjectRoleEnum.PROJECT_ADMINISTRATOR);
    if (projectAdmin) {
      const users: IUser[] = await getUsersByIds(projectRoles.map((pr) => pr.userId));
      const filteredUsers = users.filter((u) => u.id !== res.locals.currentUser || u.id !== projectAdmin.userId);
      const projectResponse: ProjectInvitationDto = {
        ...project,
        users: filteredUsers,
      };
      return res.send(projectResponse);
    } else {
      throw new Error('No admin found for project');
    }
  } catch (e) {
    logger.error(e);
    return res.status(404).send({ message: 'Something went wrong' });
  }
};
