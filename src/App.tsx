import { useState } from 'react';
import { TaskList } from './pages/TaskList';
import { Project } from './pages/Project';

const taskItems = [
  { name: 'Finish homework', completedStatus: true, project: 'Work' },
  { name: 'Clean room', completedStatus: false, project: 'Personal' },
  { name: 'Grocery shopping', completedStatus: true, project: 'Work' },
  { name: 'Study React', completedStatus: false, project: 'Work' },
];

export default function App() {
  const [page, setPage] = useState('project');
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState(taskItems);

  const goToTasks = (projectName: string) => {
    setSelectedProject(projectName);
    setPage('tasks');
  };

  const toggleStatus = (taskName: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (taskName !== task.name) {
          return task; // no change
        }
        return {
          ...task,
          completedStatus: !task.completedStatus,
        };
      });
    });
  };

  const addTask = (taskName: string) => {
    setTasks((tasks) => [
      ...tasks,
      { name: taskName, completedStatus: false, project: 'Personal' },
    ]);
  };

  const deleteTask = (taskName: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.name !== taskName));
  };

  const goToProjectsList = () => {
    setPage('project');
  };

  const filteredTasks = tasks.filter(
    (task) => task.project === selectedProject
  );

  return (
    <>
    <p>{tasks.length}</p>
      {page === 'project' && <Project allTasks={tasks} goToTasks={goToTasks} />}
      {page === 'tasks' && (
        <TaskList
          allTasks={filteredTasks}
          onToggle={toggleStatus}
          onAddTask={addTask}
          onDelete={deleteTask}
          goToProjects={goToProjectsList}
        />
      )}
    </>
  );
}
