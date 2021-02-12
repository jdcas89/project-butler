import { Response } from 'express';
import { ProjectRole } from '../model/projectRole';
import { Project } from '../model/project';
import { User } from '../model/user';

export interface ExtendedResponse extends Response {
  locals: {
    currentProject: Project;
    currentProjectRole: ProjectRole;
    currentUser: User;
    usersForProject: User[];
  };
}
