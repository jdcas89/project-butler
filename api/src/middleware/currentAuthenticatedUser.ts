import { NextFunction, Request } from 'express';
import { testUsers } from './testUsers';
import { ExtendedResponse } from '../types/types';
import { createUser, getUserById } from '../services/user';

export const currentAuthenticatedUser = async (req: Request, res: ExtendedResponse, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    // service call to get the current authenticated user
  } else {
    const testUserId: string = (req.headers['test-user'] as string) || '1';
    const user = await getUserById(testUserId);
    if (!user) {
      const newTestUser = testUsers.find((x) => x.id === testUserId);
      if (newTestUser) {
        const newUser = await createUser({ ...newTestUser });
        res.locals.currentUser = newUser;
      }
    } else {
      res.locals.currentUser = user;
    }
  }
  next();
};
