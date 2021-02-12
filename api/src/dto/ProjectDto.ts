import { User } from '../model/user';
import { Task } from '../model/task';

export interface ProjectDto {
  id: string;
  name: string;
  tasks: Task[];
  invitationCode: string;
  users: User[];
  admin: string;
}
