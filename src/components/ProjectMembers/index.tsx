import React from 'react';
import { User } from '../../shared/types';

const ProjectMembers: React.FC<{ users: User[]; invitationCode: string }> = ({ users }) => {
  return (
    <div>
      <h2 className="font-bold">Project members</h2>
      <div className="flex">
        {users.slice(0, 3).map((u) => (
          <div className="flex m-1 p-2.5 bg-white rounded-full shadow" key={u.id}>
            <p className="hidden hover:visible">
              {u.name}({u.email})
            </p>
            <p className="text-lg font-bold text-blue-900">
              {u.name
                .split(' ')
                .map((x) => x[0])
                .join('')
                .toUpperCase()}
            </p>
          </div>
        ))}
        <div className="flex m-1 p-2.5 bg-white rounded-full shadow">
          <p className="text-2xl font-bold text-blue-900">+</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectMembers;
