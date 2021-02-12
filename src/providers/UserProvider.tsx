import React from 'react';
import { User } from '../shared/types';
import { useQuery } from 'react-query';
import { getCurrentUser } from '../shared/api';

export const UserContext = React.createContext<User | undefined>(undefined);

const UserProvider: React.FC = ({ children }) => {
  const { data } = useQuery<User>('getUser', () => {
    return getCurrentUser();
  });

  if (data) {
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
  }
  return <p>Loading..</p>;
};

export default UserProvider;
