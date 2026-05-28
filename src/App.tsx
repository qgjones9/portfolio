import './App.css'
import projects from './data/projects.json'
import type { Project } from './types/project'

export default function App() {
  // Cast the projects to the Project type 
  const projectList = projects as Project[];

  for (const project of projectList) {
    console.log(project);
  }

  return (
     <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <p className="text-zinc-400 mt-2">Tailwind is working.</p>
     </main>
  );
}
