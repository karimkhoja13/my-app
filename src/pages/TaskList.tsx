import { useState } from 'react';
import { type Task, TaskItem } from '../components/TaskItem';
import { FilterGroup } from '../components/FilterGroup';
import { useTaskStore } from '../store';

export type FilterValues = 'all' | 'pending' | 'completed';

interface TaskListProps {
  projectFilter: string;
  goToProjects: () => void;
}

export function TaskList({ projectFilter, goToProjects }: TaskListProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>('all');

  const tasks = useTaskStore((state) => state.tasks);

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

  const tasksFilteredByStatus = tasksFilteredByProject.filter(
    handleFilter(selectedFilter)
  );

  return (
    <div>
      <h1>Task List</h1>

      <FilterGroup
        selectedFilter={selectedFilter}
        onFilter={setSelectedFilter}
      />

      <ul>
        {tasksFilteredByStatus.map((t) => (
          <TaskItem task={t} />
        ))}
      </ul>

      <button onClick={goToProjects}>Back to Projects List</button>
    </div>
  );
}
