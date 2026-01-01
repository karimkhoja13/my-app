import { useActions } from "../store";

export interface Task {
  name: string;
  completedStatus: boolean;
  project: string;
}

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, removeTask } = useActions();
  return (
    <li
      style={{ color: task.completedStatus ? 'black' : 'red' }}
      key={task.name}
    >
      <label>
        <input
          type='checkbox'
          checked={task.completedStatus}
          onChange={() => toggleTask(task.name)}
        />{' '}
        {task.name} {task.completedStatus ? '(Completed)' : '(Pending)'} -{' '}
        {task.project}
      </label>{' '}
      <button onClick={() => removeTask(task.name)}>🗑️</button>
    </li>
  );
}
