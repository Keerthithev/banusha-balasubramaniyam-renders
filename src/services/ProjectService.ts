
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  images: string[];
  videos?: {
    url: string;
    thumbnail?: string;
  }[];
  date: string;
  client?: string;
  location?: string;
}

class ProjectService {
  private static readonly PROJECTS_KEY = 'moduno_projects';
  
  static getProjects(): Project[] {
    const projects = localStorage.getItem(this.PROJECTS_KEY);
    if (!projects) return [];
    try {
      return JSON.parse(projects);
    } catch {
      return [];
    }
  }
  
  static getProject(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find(project => project.id === id);
  }
  
  static addProject(project: Omit<Project, 'id'>): Project {
    const projects = this.getProjects();
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    
    projects.push(newProject);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
    return newProject;
  }
  
  static updateProject(id: string, projectData: Partial<Project>): Project | undefined {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return undefined;
    
    const updatedProject = { ...projects[index], ...projectData };
    projects[index] = updatedProject;
    
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
    return updatedProject;
  }
  
  static deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (filteredProjects.length === projects.length) return false;
    
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(filteredProjects));
    return true;
  }
}

export default ProjectService;
