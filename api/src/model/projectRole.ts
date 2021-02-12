import { model, Schema, Model, Document } from 'mongoose';

export enum ProjectRoleEnum {
  PROJECT_ADMINISTRATOR = 'PROJECT_ADMINISTRATOR',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
}

export interface ProjectRole {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRoleEnum;
}

export type IProjectRole = ProjectRole & Document;

const ProjectRoleSchema: Schema = new Schema({
  id: { type: String, required: true },
  projectId: { type: String, required: true },
  userId: { type: String, required: true },
  role: { type: String, required: true },
});

export const ProjectRoleModel: Model<IProjectRole> = model('ProjectRole', ProjectRoleSchema);
