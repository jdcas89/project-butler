import { ProjectRoleModel, ProjectRoleEnum } from '../../model/projectRole';
import { v4 } from 'uuid';

export const getProjectRolesForUser = async (userId: string) => {
  return await ProjectRoleModel.find({ userId }).lean().exec();
};

export const getProjectRolesForProject = async (projectId: string) => {
  return await ProjectRoleModel.find({ projectId }).lean().exec();
};

export const createProjectRole = async ({ projectId, userId, role }: { projectId: string; userId: string; role: ProjectRoleEnum }) => {
  const projectRole = new ProjectRoleModel({
    id: v4(),
    projectId,
    userId,
    role,
  });
  return await projectRole.save();
};
