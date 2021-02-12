import { currentAuthenticatedUser } from '../middleware/currentAuthenticatedUser';
import express from 'express';

const USERS_API = '/api';
const userRouter = express.Router();

userRouter.get(`${USERS_API}/me`, currentAuthenticatedUser, async (req, res) => {
  return res.send(res.locals.currentUser);
});

export default userRouter;
