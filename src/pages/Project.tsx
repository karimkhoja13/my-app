import { AddProject } from '../components/AddProject';
import { useActions, useAllTasks, useAllProjects } from '../store';

interface Project {
  name: string;
}

interface ProjectProps {
  goToTasks: () => void;
}

export function Project({ goToTasks }: ProjectProps) {

  const { updateSelectedProject, removeProject } = useActions();
  const allTasks = useAllTasks();
  const projects = useAllProjects();

  const handleClick = (projectName: string) => {
    updateSelectedProject(projectName);
    goToTasks();
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
      <AddProject />
      {projectWithStats.map((project) => (
        <div>
          <h3>{project.name}</h3>
          <button onClick={() => handleClick(project.name)}>Go to {project.name} Tasks</button><br />
          <button onClick={() => removeProject(project.name)}>Delete Project</button>
          <p>
            Stats: Total tasks = {project.stats.all} <br />
            Pending tasks = {project.stats.pending} 
            <br />
            Completed tasks = {project.stats.completed}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}
