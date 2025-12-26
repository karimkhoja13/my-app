export interface Task {
  name: string;
  completedStatus: boolean;
  project: string;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <li
      style={{ color: task.completedStatus ? 'black' : 'red' }}
      key={task.name}
    >
      <label>
        <input
          type='checkbox'
          checked={task.completedStatus}
          onChange={onToggle}
        />{' '}
        {task.name} {task.completedStatus ? '(Completed)' : '(Pending)'} -{' '}
        {task.project}
      </label>{' '}
      <button onClick={onDelete}>🗑️</button>
    </li>
  );
}
