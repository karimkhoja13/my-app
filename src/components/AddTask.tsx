import { useState } from 'react';
import { useActions, useSelectedProject } from '../store';

export function AddTask() {
  const [newTaskName, setNewTaskName] = useState('');

  const { addTask } = useActions();
  const project = useSelectedProject();

  const handleClick = () => {
    if (!newTaskName.trim()) return;
    addTask(newTaskName);
    setNewTaskName('');
  };

  {
    /* Input to add tasks */
  }
  return (
    <div>
      <input
        type='text'
        placeholder='New task'
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={handleClick}>Add Task to {project}</button>
    </div>
  );
}
