import React from 'react';

interface Task {
  id: number;
  title: string;
  client?: string;
  status: string;
}

interface Props {
  task: Task;
  onUpdate: (task: Task) => void;
} 

export default function TaskCard({ task, onUpdate }: Props) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-white">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">Client: {task.client}</p>
      <p className="text-xs mt-2">Status: {task.status}</p>
      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-1 rounded bg-sky-500 text-white"
          onClick={() => onUpdate({ ...task, status: 'IN_PROGRESS' })}
        >
          Start
        </button>
        <button
          className="px-3 py-1 rounded bg-green-600 text-white"
          onClick={() => onUpdate({ ...task, status: 'COMPLETED' })}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
