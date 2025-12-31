import { create } from 'zustand';

// 1. Define the shape of a single Task
type Task = {
  name: string;
  completedStatus: boolean;
  project: string;
};

type State = {
  tasks: Task[];
};

// 3. Define the Actions (functions)
type Action = {
  addTask: (newTask: Task) => void;
  toggleTask: (name: string) => void;
  removeTask: (name: string) => void;
};

// 4. Create the store
export const useTaskStore = create<State & Action>((set) => ({
  // Initial State
  tasks: [
    { name: 'Finish homework', completedStatus: true, project: 'Work' },
    { name: 'Clean room', completedStatus: false, project: 'Personal' },
    { name: 'Grocery shopping', completedStatus: true, project: 'Work' },
    { name: 'Study React', completedStatus: false, project: 'Work' },
  ],

  // Actions
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  toggleTask: (name) =>
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
}));
