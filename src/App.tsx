import { useState } from 'react';
import { TaskList } from './pages/TaskList';
import { Project } from './pages/Project';
import { AddTask } from './components/AddTask';
import { useTaskStore } from './store';

export default function App() {
  const [page, setPage] = useState('project');
  const [selectedProject, setSelectedProject] = useState('');

  const tasks = useTaskStore((state) => state.tasks);

  const goToTasks = (projectName: string) => {
    setSelectedProject(projectName);
    setPage('tasks');
  };

  const goToProjectsList = () => {
    setPage('project');
  };

  // "select" the needed state and actions, in this case, the firstName value
  // and the action updateFirstName
  const firstName = useTaskStore((state) => state.firstName);
  const updateFirstName = useTaskStore((state) => state.updateFirstName);

  return (
    <>
      <main>
        <label>
          First name
          <input
            // Update the "firstName" state
            onChange={(e) => updateFirstName(e.currentTarget.value)}
            value={firstName}
          />
        </label>

        <p>
          Hello, <strong>{firstName}!</strong>
        </p>
      </main>
      <p>{tasks.length}</p>
      {page === 'project' && <Project allTasks={tasks} goToTasks={goToTasks} />}
      {page === 'tasks' && (
        <div>
          <AddTask />
          <hr />
          <TaskList
            projectFilter={selectedProject}
            goToProjects={goToProjectsList}
          />
        </div>
      )}
    </>
  );
}
