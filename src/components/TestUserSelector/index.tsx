import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { User } from '../../shared/types';
import { testUsers } from './testUsers';

const LOCALSTORAGE_USER_KEY = 'current_test_user_id';

const TestUserSelector = () => {
  const [hidden, setHidden] = useState(true);

  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);

  const setUser = (id: string) => {
    localStorage.setItem(LOCALSTORAGE_USER_KEY, id);
    setSelectedUser(id);
    window.location.reload();
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem(LOCALSTORAGE_USER_KEY);
    if (userFromLocalStorage) {
      setSelectedUser(userFromLocalStorage);
    } else {
      localStorage.setItem(LOCALSTORAGE_USER_KEY, '1');
      window.location.reload();
    }
  }, []);

  return (
    <div className="absolute right-0.5 top-1/2 bg-white p-2 shadow-xl rounded">
      {hidden ? (
        <FontAwesomeIcon size="lg" icon={faArrowCircleLeft} data-testid="open-user-panel" onClick={() => setHidden(false)} />
      ) : (
        <FontAwesomeIcon size="lg" icon={faArrowCircleRight} onClick={() => setHidden(true)} />
      )}
      {!hidden && (
        <div className="bg-white mt-2">
          {testUsers.map((testUser) => (
            <TestUser selectUser={(id) => setUser(id)} selected={selectedUser === testUser.id} key={testUser.id} user={testUser} />
          ))}
        </div>
      )}
    </div>
  );
};

const TestUser: React.FC<{ user: User; selected: boolean; selectUser: (id: string) => void }> = ({ user, selected, selectUser }) => {
  return (
    <div
      data-testid={`select-user-id-${user.id}`}
      className={selected ? 'bg-blue-300 p-2 rounded text-white' : 'p-2 rounded'}
      onClick={() => selectUser(user.id)}
    >
      <div>
        <p>
          <strong>Id: </strong>
          {user.id}
        </p>
        <p>
          <strong>Name: </strong>
          {user.name}
        </p>
      </div>
    </div>
  );
};

export default TestUserSelector;
