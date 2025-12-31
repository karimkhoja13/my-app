import { useState } from 'react';
// import { TaskList } from './pages/TaskList';
import { TaskList } from './pages/TaskList';
import { Project } from './pages/Project';
import { create } from 'zustand';
import { AddTaskForm } from "./components/AddTask-Zustand"

// 1. Define the shape of a single Task
type Task = {
  name: string;
  completedStatus: boolean;
  project: string;
};

type State = {
  firstName: string;
  tasks: Task[];
};

// 3. Define the Actions (functions)
type Action = {
  updateFirstName: (firstName: State['firstName']) => void;
  addTask: (newTask: Task) => void;
};

// 4. Create the store
export const useTaskStore = create<State & Action>((set) => ({
  firstName: '',
  // Initial State
  tasks: [
    { name: 'Finish homework', completedStatus: true, project: 'Work' },
    { name: 'Clean room', completedStatus: false, project: 'Personal' },
    { name: 'Grocery shopping', completedStatus: true, project: 'Work' },
    { name: 'Study React', completedStatus: false, project: 'Work' },
  ],

  // Actions
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
}));

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
      {page === 'tasks' && (<div>
        <AddTaskForm />
        <hr />
        <TaskList />
        </div>
        // <TaskList
        //   allTasks={filteredTasks}
        //   onToggle={toggleStatus}
        //   onAddTask={addTask}
        //   onDelete={deleteTask}
        //   goToProjects={goToProjectsList}
        // />
      )}
    </>
  );
}
