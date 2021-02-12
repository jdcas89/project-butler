import { Document, Model, model, Schema } from 'mongoose';
import { Task, TaskSchema } from './task';

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  invitationCode: string;
  admin: string;
}

export type IProject = Project & Document;

const ProjectSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  invitationCode: { type: String, required: true },
  tasks: [TaskSchema],
  admin: { type: String, required: true },
});

export const ProjectModel: Model<IProject> = model('Project', ProjectSchema);
