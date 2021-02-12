import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { getProjectByInvitation, joinProjectByInvitationCode } from '../shared/api';
import { UserContext } from '../providers/UserProvider';

const Invitation = () => {
  const { invitationCode } = useParams<{ invitationCode: string }>();

  const history = useHistory();
  const currentUser = useContext(UserContext);
  const { data, isLoading, isError } = useQuery('getProjectByInvitation', () => getProjectByInvitation(invitationCode));

  const { mutate: joinMutation, isSuccess, reset: resetJoin, data: joinData } = useMutation(
    'joinProjectByInvitationCode',
    (invitationCode: string) => joinProjectByInvitationCode(invitationCode),
    {
      onSuccess: () => {
        if (data) {
          history.push('/projects/' + data.id);
        }
      },
    }
  );
  console.log(data, currentUser);

  if (data?.users.find((u) => u.id === currentUser?.id)) {
    history.push('/projects/' + data.id);
  }

  const onJoin = (invitationCode: string) => {
    joinMutation(invitationCode);
  };

  if (data) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center bg-blue-400">
        <div className="flex flex-col p-4 shadow rounded bg-white w-1/2 text-center">
          <h1>{data.admin}</h1>
          <h1 className="bold text-lg"> invited to join project:</h1>
          <h1>{data.name}</h1>
          <br />
          <p>Do you want to join?</p>
          <button
            className="p-2 bg-green-500 rounded shadow text-white mt-2 w-1/2 m-auto"
            type="button"
            data-testid="actions-join-project"
            onClick={() => onJoin(data?.invitationCode)}
          >
            Join Project
          </button>
        </div>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default Invitation;
