import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

// 1. Define the shape of a single Task
interface Task {
  name: string;
  completedStatus: boolean;
  project: string;
}

type State = {
  tasks: Task[];
  projects: string[];
  selectedProject: string;
  actions: Actions;
};

// 3. Define the Actions (functions)
type Actions = {
  addTask: (name: string) => void;
  toggleTask: (name: string) => void;
  removeTask: (name: string) => void;
  updateSelectedProject: (selectedProject: State['selectedProject']) => void;
  addProject: (name: string) => void;
  removeProject: (name: string) => void;
};

// 4. Create the store
const useTaskStore = create<State>((set) => ({
  // Initial State
  tasks: [
    { name: 'Finish homework', completedStatus: true, project: 'Work' },
    { name: 'Clean room', completedStatus: false, project: 'Personal' },
    { name: 'Grocery shopping', completedStatus: true, project: 'Work' },
    { name: 'Study React', completedStatus: false, project: 'Work' },
  ],
  projects: ['Personal', 'Work'],
  selectedProject: '',
  actions: {
    // Actions
    addTask: (name) => {
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            name: name,
            completedStatus: false,
            project: state.selectedProject,
          },
        ],
      }));
    },
    toggleTask: (name: string) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.name === name
            ? { ...task, completedStatus: !task.completedStatus }
            : task
        ),
      })),
    removeTask: (name) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.name !== name),
      })),
    updateSelectedProject: (selectedProject) =>
      set(() => ({ selectedProject: selectedProject })),
    addProject: (name: string) =>
      set((state) => ({
        projects: [...state.projects, name],
      })),
    removeProject: (name) =>
      set((state) => ({
        projects: state.projects.filter((project) => project !== name),
        tasks: state.tasks.filter((task) => task.project !== name),
      })),
  },
}));

export const useTasks = () => {
  return useTaskStore(
    useShallow((state) =>
      state.tasks.filter((t) => t.project === state.selectedProject)
    )
  );
};

export const useAllTasks = () => {
  return useTaskStore((state) => state.tasks);
};

export const useAllProjects = () => {
  return useTaskStore((state) => state.projects);
};

export const useSelectedProject = () => {
  return useTaskStore((state) => state.selectedProject);
};

export const useActions = () => {
  return useTaskStore((state) => state.actions);
};
