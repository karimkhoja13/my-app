import React, { useState } from 'react';
import { useTaskStore } from '../App'; // Path to your store file

export function AddTaskForm() {
  // 1. Grab the addTask action from the store
  const addTask = useTaskStore((state) => state.addTask);

  // 2. Local state for the form inputs (to keep typing snappy)
  const [name, setName] = useState('');
  const [project, setProject] = useState('Work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return; // Don't add empty tasks

    // 3. Call the Zustand action
    addTask({
      name: name,
      project: project,
      completedStatus: false, // New tasks start as incomplete
    });

    // 4. Clear the input after adding
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <select value={project} onChange={(e) => setProject(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}