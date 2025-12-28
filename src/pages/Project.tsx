import type { Task } from '../components/TaskItem';

interface Project {
  name: string;
}

interface ProjectProps {
  allTasks: Task[];
  goToTasks: (projectName: string) => void;
}

export function Project({ allTasks, goToTasks }: ProjectProps) {
  const projects = ['Personal', 'Work'];

  const handleClick = (projectName: string) => {
    goToTasks(projectName);
  };

  const projectWithStats = projects.map((project) => {
    const stats = allTasks
      .filter((task) => task.project === project)
      .reduce(
        (acc, task) => {
          return {
            all: acc.all + 1,
            completed: acc.completed + (task.completedStatus ? 1 : 0),
            pending: acc.pending + (task.completedStatus ? 0 : 1),
          };
        },
        { all: 0, pending: 0, completed: 0 }
      );
    return {
      name: project,
      stats,
    };
  });

  return (
    <div>
      {projectWithStats.map((project) => (
        <div onClick={() => handleClick(project.name)}>
          <h2>{project.name}</h2>
          Stats:
          <p>Total tasks = {project.stats.all}</p>
          <p>Pending tasks = {project.stats.pending}</p>
          <p>Completed tasks = {project.stats.completed}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
