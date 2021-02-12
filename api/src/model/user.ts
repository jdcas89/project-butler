import { model, Schema, Model, Document } from 'mongoose';

export interface User {
  id: string;
  name: string;
  email: string;
}

export type IUser = User & Document;

export const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

export const UserModel: Model<IUser> = model('User', UserSchema);
