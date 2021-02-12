import React from 'react';
import { Task } from '../shared/types';

const TaskCard: React.FC<Task & { onTaskClicked: (id: Task) => void }> = ({ name, description, assignee, id, onTaskClicked }) => {
  return (
    <div
      className="bg-white p-4 shadow rounded cursor-pointer hover:shadow-xl"
      onClick={() => onTaskClicked({ id, name, description, assignee })}
    >
      <h1>{name}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TaskCard;
