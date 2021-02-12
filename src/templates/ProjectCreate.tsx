import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createProject } from '../shared/api';

type FormData = {
  name: string;
};

const ProjectCreate: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const { mutate, reset, isSuccess } = useMutation((projectName: string) => createProject(projectName));

  const onSubmit = handleSubmit(({ name }) => {
    mutate(name);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess, reset, closeModal]);

  return (
    <form className="flex flex-col w-full m-auto" onSubmit={onSubmit}>
      <label className="text-gray-600">Project Name</label>
      <input
        data-testid="field-project-name"
        autoFocus
        className="bg-gray-200 border-gray-400 rounded px-3 pt-2 pb-2 focus:border-indigo-400 mt-2"
        name="name"
        ref={register}
      />
      <button data-testid="actions-confirm-create-project" className="p-2 bg-green-500 rounded shadow text-white mt-2" type="submit">
        Create project
      </button>
    </form>
  );
};

export default ProjectCreate;
