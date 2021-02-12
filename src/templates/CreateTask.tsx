import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createTask } from '../shared/api';

type FormData = {
  name: string;
  description?: string;
};

const CreateTask: React.FC<{ closeModal: () => void; projectId: string }> = ({ closeModal, projectId }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const { mutate, reset, isSuccess, isError } = useMutation<any, any, { name: string; description?: string }>(({ name, description }) =>
    createTask(projectId, name, description)
  );

  const onSubmit = handleSubmit(({ name, description }) => {
    mutate({ name, description });
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess, reset, closeModal]);

  return (
    <form className="flex flex-col w-full m-auto" onSubmit={onSubmit}>
      <label className="text-gray-600 mt-2">Task Name</label>
      <input
        autoFocus
        className="bg-gray-200 border-gray-400 rounded px-3 pt-2 pb-2 focus:border-indigo-400 mt-2"
        name="name"
        ref={register}
      />

      <label className="text-gray-600 mt-2">Task Description</label>
      <textarea
        className="bg-gray-200 border-gray-400 rounded px-3 pt-2 pb-2 focus:border-indigo-400 mt-2"
        name="description"
        ref={register}
      />
      {isError && <p className="text-red-600 mt-2">You are not allowed to create tasks</p>}
      <button className="p-2 bg-green-500 rounded shadow text-white mt-2" type="submit">
        Create task
      </button>
    </form>
  );
};

export default CreateTask;
