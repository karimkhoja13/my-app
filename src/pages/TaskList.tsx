import { useState } from 'react';
import { type Task, TaskItem } from '../components/TaskItem';
import { AddTask } from '../components/AddTask';
import { FilterGroup } from '../components/FilterGroup';
import { useTaskStore } from '../App';

export type FilterValues = 'all' | 'pending' | 'completed';

interface TaskListProps {
  projectFilter: string;
  onToggle: (name: string) => void;
  onAddTask: (name: string) => void;
  onDelete: (name: string) => void;
  goToProjects: () => void;
}

export function TaskList({ projectFilter, onToggle, onAddTask, onDelete, goToProjects }: TaskListProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>('all');

  const tasks = useTaskStore((state) => state.tasks);

  const handleToggle = (taskName: string) => {
    onToggle(taskName);
  };

  const onAdd = (newTask: string) => {
    onAddTask(newTask);
  };

  // Delete a task
  const handleDelete = (taskName: string) => {
    onDelete(taskName);
  };

  const tasksFilteredByProject = tasks.filter(
    (task) => task.project === projectFilter
  );

  const handleFilter = (filterName: FilterValues) => {
    return (task: Task): boolean => {
      switch (filterName) {
        case 'all':
          return true;
        case 'pending':
          return task.completedStatus === false;
        case 'completed':
          return task.completedStatus === true;
      }
    };
  };

  const tasksFilteredByStatus = tasksFilteredByProject.filter(handleFilter(selectedFilter));

  return (
    <div>
      <h1>Task List</h1>

      <FilterGroup
        selectedFilter={selectedFilter}
        onFilter={setSelectedFilter}
      />

      {/* <AddTask onAdd={onAdd} /> */}

      {/* <AddTaskForm /> */}

      {/* Task list */}
      <ul>
        {tasksFilteredByStatus.map((t) => (
          <TaskItem
            task={t}
            onToggle={() => handleToggle(t.name)}
            onDelete={() => handleDelete(t.name)}
          />
        ))}
      </ul>

      <button onClick={goToProjects}>Back to Projects List</button>
    </div>
  );
}
