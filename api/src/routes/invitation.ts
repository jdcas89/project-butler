import { currentAuthenticatedUser } from '../middleware/currentAuthenticatedUser';
import express from 'express';
import { getProjectByInvitation } from '../controllers/invitations/getProjectByInvitation';
import { joinProject } from '../controllers/invitations/joinProject';

const INVITATIONS_API = '/api/invitation';
const invitationRouter = express.Router();

invitationRouter.get(`${INVITATIONS_API}/:invitationCode`, currentAuthenticatedUser, getProjectByInvitation);

invitationRouter.put(`${INVITATIONS_API}/:invitationCode/join`, currentAuthenticatedUser, joinProject);

export default invitationRouter;
