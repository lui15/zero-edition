import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  category: 'video' | 'photo' | 'web';
  file: string;
  link?: string;
  fullPath?: string; // Ruta completa generada
}
@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  private readonly assetsPath = '/assets/portfolio/';

  currentFilter: string = 'all';
  selectedProject: Project | null = null;

  projects: Project[] = [
    { id: 1, title: 'RETRATO CORPORATIVO', category: 'photo', file: 'imagen1.jpg' },
    { id: 2, title: 'AUDIOVISUAL DE EVENTO', category: 'video', file: 'video1.mp4' },
    {
      id: 3,
      title: 'PAGINA WEB - GYM',
      category: 'web',
      file: 'web1.png',
      link: 'https://practica-04.netlify.app/',
    },
    { id: 4, title: 'FOTOGRAFIA DE EVENTO', category: 'photo', file: 'imagen2.jpg' },
    {
      id: 5,
      title: 'PAGINA WEB - PLANTAS',
      category: 'web',
      file: 'web2.png',
      link: 'https://plantex15.netlify.app/',
    },
    {
      id: 6,
      title: 'PAGINA WEB - SHUSHI',
      category: 'web',
      file: 'web3.png',
      link: 'https://sushi5.netlify.app/',
    },
    { id: 1, title: 'RETRATO CORPORATIVO', category: 'photo', file: 'imagen3.jpg' },
    { id: 2, title: 'SPOT PUBLICITARIO', category: 'video', file: 'video2.mp4' },
    { id: 1, title: 'FOTOGRAFIA DE EVENTO', category: 'photo', file: 'imagen4.jpg' },
    { id: 2, title: 'AUDIOVISUAL DE EVENTO', category: 'video', file: 'video3.mp4' },
  ];

  filteredProjects: Project[] = [];

  ngOnInit() {
    // Generamos las rutas completas al iniciar
    this.projects = this.projects.map((p) => ({
      ...p,
      fullPath: `${this.assetsPath}${p.file}`,
    }));
    this.filteredProjects = this.projects;
  }

  filter(category: string) {
    this.currentFilter = category;
    this.filteredProjects =
      category === 'all' ? this.projects : this.projects.filter((p) => p.category === category);
  }

  openProject(project: Project) {
    if (project.category === 'web' && project.link) {
      window.open(project.link, '_blank');
    } else {
      this.selectedProject = project;
      document.body.style.overflow = 'hidden';
    }
  }

  closeProject() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  handleImageError(event: any) {
    console.error('No se encontró el archivo en:', event.target.src);
    event.target.src = 'https://placehold.co/600x800/111/f7af04?text=Error+Ruta';
  }
}
