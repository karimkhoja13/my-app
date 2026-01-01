import { useState } from 'react';
import { type Task, TaskItem } from '../components/TaskItem';
import { FilterGroup } from '../components/FilterGroup';
import { useSelectedProject, useTasks } from '../store';

export type FilterValues = 'all' | 'pending' | 'completed';

interface TaskListProps {
  goToProjects: () => void;
}

export function TaskList({ goToProjects }: TaskListProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>('all');

  const tasks = useTasks();
  const project = useSelectedProject();

  const tasksFilteredByStatus = tasks.filter((task: Task): boolean => {
      switch (selectedFilter) {
        case 'all':
          return true;
        case 'pending':
          return task.completedStatus === false;
        case 'completed':
          return task.completedStatus === true;
      }
    });

  return (
    <div>
      <h2>{project} Tasks</h2>

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
