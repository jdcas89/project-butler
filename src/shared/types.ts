export enum ProjectRoleEnum {
  PROJECT_ADMINISTRATOR = 'PROJECT_ADMINISTRATOR',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ProjectRole {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRoleEnum;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  invitationCode: string;
  users: User[];
  admin: string;
}
