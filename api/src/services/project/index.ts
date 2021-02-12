import { IProject, Project, ProjectModel } from '../../model/project';
import { v4 } from 'uuid';
import randomWords from 'random-words';

export const getProjectById = async (projectId: string) => {
  return await ProjectModel.findOne({ id: projectId }).lean().exec();
};

export const getProjectByInvitationCode = async (invitationCode: string) => {
  return await ProjectModel.findOne({ invitationCode }).lean().exec();
};

export const getProjectsByIds = async (projectIds: string[]) => {
  return await ProjectModel.find({ id: { $in: projectIds } })
    .lean()
    .exec();
};

export const createProject = async (projectName: string, adminName: string) => {
  const project = new ProjectModel({
    name: projectName,
    tasks: [],
    id: v4(),
    invitationCode: randomWords({ exactly: 4, join: '-' }),
    admin: adminName,
  });
  return await project.save();
};

export const updateProject = async (projectId: string, projectUpdate: Project) => {
  console.log('in update project', projectUpdate);
  return await ProjectModel.findOneAndUpdate({ id: projectUpdate.id }, { $set: projectUpdate }, { new: true, useFindAndModify: false })
    .lean()
    .exec();
};
