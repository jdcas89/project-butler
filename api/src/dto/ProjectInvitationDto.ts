import { User } from '../model/user';

export interface ProjectInvitationDto {
  id: string;
  name: string;
  invitationCode: string;
  users: User[];
  admin: string;
}
