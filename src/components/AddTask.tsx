import { useState } from "react";

interface AddTaskProps {
  onAdd: (taskName: string) => void;
}

export function AddTask({ onAdd }: AddTaskProps) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleClick = () => {
    if (newTaskName.trim() === "") return;
    onAdd(newTaskName);
    setNewTaskName(''); // Clear input
  };

  {/* Input to add tasks */}
  return (
    <div>
      <input
      type='text'
      placeholder='New task'
      value={newTaskName}
      onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
}