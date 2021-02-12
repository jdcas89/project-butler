import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getProjectByInvitation, joinProjectByInvitationCode } from '../shared/api';

type FormData = {
  invitationCode: string;
};

const ProjectJoin: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const { mutate, data, reset, isLoading, isError } = useMutation('getProjectByInvitation', (invitationCode: string) =>
    getProjectByInvitation(invitationCode)
  );

  const { mutate: joinMutation, isSuccess, reset: resetJoin, data: joinData } = useMutation(
    'joinProjectByInvitationCode',
    (invitationCode: string) => joinProjectByInvitationCode(invitationCode)
  );

  const onSubmit = handleSubmit(({ invitationCode }) => {
    mutate(invitationCode);
  });

  const onJoin = (invitationCode: string) => {
    joinMutation(invitationCode);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, joinData, closeModal]);

  return (
    <form className="flex flex-col w-full" onSubmit={onSubmit}>
      <br />
      <label className="text-gray-600">Enter your invitation code</label>
      <input autoFocus className="bg-gray-200 rounded px-3 pt-2 pb-2 focus:border-indigo-400 mt-2" name="invitationCode" ref={register} />
      {isError && !isLoading && <p className="text-red-600 mt-2">Something went wrong fetching your project</p>}
      <button className="p-2 bg-green-500 rounded shadow text-white mt-2" type="submit">
        Fetch project
      </button>

      {data && (
        <div className="text-center mt-4">
          <p className="text-green-600">Project {data.name} loaded</p>
          <p>Do you want to join?</p>
          <button className="p-2 bg-green-500 rounded shadow text-white mt-2" type="button" onClick={() => onJoin(data?.invitationCode)}>
            Join Project
          </button>
        </div>
      )}
    </form>
  );
};

export default ProjectJoin;
