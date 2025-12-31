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

  return (
    // Centering Wrapper
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',    // Centers horizontally
      minHeight: '80vh',      // Takes up full screen height
      padding: '40px 200px',    // Adds some breathing room
      fontFamily: 'sans-serif'
    }}>
      
      {/* Content Container with a max-width so it doesn't get too wide on desktop */}
      <div style={{ width: '100%', maxWidth: '500px' }}>
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
      </div>
    </main>
  );
}
