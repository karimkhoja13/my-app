import { useTaskStore } from '../App';

export function TaskList() {
  // We only pull 'tasks' here. 
  // This component will only re-render when the tasks array changes.
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div>
      <h3>Current Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet! Add one above.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <span style={{ textDecoration: task.completedStatus ? 'line-through' : 'none' }}>
                {task.name}
              </span>
              <small style={{ marginLeft: '10px', color: '#666' }}>
                [{task.project}]
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}