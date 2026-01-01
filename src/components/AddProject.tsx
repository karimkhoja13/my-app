import { useState } from 'react';
import { useActions } from '../store';

export function AddProject() {
  const [newProject, setNewProject] = useState('');

  const { addProject } = useActions();

  const handleClick = () => {
    addProject(newProject);
    setNewProject('');
  };
  return (
    <div>
      <input
        type='text'
        placeholder='New Project'
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
      ></input>
      <button type='submit' onClick={handleClick}>
        Add Project
      </button>
    </div>
  );
}
