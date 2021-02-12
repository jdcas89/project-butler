import { model, Schema, Model, Document } from 'mongoose';

export interface Task {
  id: string;
  name: string;
  description: string;
  assignee?: string;
  projectId: string;
}

export type ITask = Task & Document;

export const TaskSchema: Schema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  assignee: { type: String, required: false },
  projectId: { type: String, required: true },
});
