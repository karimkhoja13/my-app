import { useState } from "react";
import { useTaskStore } from '../store';

export function AddTask() {
  const [newTaskName, setNewTaskName] = useState('');
  const [project, setProject] = useState('Personal');

  const addTask = useTaskStore((state) => state.addTask);

  const handleClick = () => {
    if (!newTaskName.trim()) return; // Don't add empty tasks

    // 3. Call the Zustand action
    addTask({
      name: newTaskName,
      project: project,
      completedStatus: false, // New tasks start as incomplete
    });

    // 4. Clear the input after adding
    setNewTaskName('');
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
      <select value={project} onChange={(e) => setProject(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
}