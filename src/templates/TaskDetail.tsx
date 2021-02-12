import React from 'react';
import { Task, User } from '../shared/types';

interface TaskDetailProps {
  closeModal: () => void;
  projectId: string;
  task: Task;
  users: User[];
  onUserSelected: (assigneeId: string) => void;
}
const TaskDetail: React.FC<TaskDetailProps> = ({ closeModal, projectId, task, users, onUserSelected }) => {
  if (task) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div />
          <div className="flex flex-col">
            <label htmlFor="members">Assign task:</label>
            <select
              value={task.assignee}
              name="members"
              id="members"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onUserSelected(event.target.value)}
            >
              <option value="unassigned">Unassigned</option>
              {users.map((u) => (
                <option value={u.id} key={u.id} className="border-gray-100 rounded-b hover:bg-teal-100">
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-gray-700 mt-4"> {task.description}</p>
        <div className="flex justify-between mt-8">
          <button className={`p-2 bg-red-500 rounded shadow text-white `} type="button">
            Delete task
          </button>
          <button
            disabled={!!task.assignee}
            className={`p-2 ${!task.assignee ? 'bg-gray-600' : 'bg-green-500'} rounded shadow text-white`}
            type="button"
          >
            Mark as done
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default TaskDetail;
