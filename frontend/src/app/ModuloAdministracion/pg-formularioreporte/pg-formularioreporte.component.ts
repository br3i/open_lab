import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

interface KpiItem {
  id: string;
  name: string;
  axis: string;
  value: number | null;
  description: string;
  target?: number | null;
}

interface ProjectItem {
  id: string;
  name: string;
  expanded: boolean;
  kpis: KpiItem[];
  saved?: boolean;
  color?: string;
}

@Component({
  selector: 'app-pg-formularioreporte',
  templateUrl: './pg-formularioreporte.component.html',
  styleUrls: ['./pg-formularioreporte.component.css']
})
export class PgFormularioreporteComponent implements OnInit {
  projects: ProjectItem[] = [];

  constructor(private messageService: MessageService) { }

  private axes = [
    'Equidad de genero',
    'Nutrición',
    'Ambiente',
    'Educación',
    'Emprendimiento'
  ];

  // Palette used to visually identify each project
  private palette = [
    '#1976d2', // blue
    '#43a047', // green
    '#f57c00', // orange
    '#8e24aa', // purple
    '#e53935', // red
    '#00acc1'  // teal
  ];

  private indicadores = [
    'Instituciones públicas capacitadas',
    'Profesores capacitados',
    'Horas de capacitación profesores',
    'Padres con capacitaciones',
    'Horas de capacitación a Padres',
    'Estudiantes con capacitaciones',
    'Estudiantes Mujeres',
    'Estudiantes Hombres',
    'Horas de capacitación estudiantes'
  ];

  private estimateTargetFromIndicator(ind: string): number {
    const s = ind.toLowerCase();
    // heuristics: return plausible targets depending on indicator type
    if (s.includes('horas')) return 1000 + Math.floor(Math.random() * 4000); // hours
    if (s.includes('profesor') || s.includes('profesores')) return 50 + Math.floor(Math.random() * 450); // teachers
    if (s.includes('instituciones')) return 5 + Math.floor(Math.random() * 200); // institutions
    if (s.includes('padres')) return 50 + Math.floor(Math.random() * 1000);
    if (s.includes('estudiantes') || s.includes('niño') || s.includes('niños') || s.includes('mujeres') || s.includes('hombres')) return 100 + Math.floor(Math.random() * 5000);
    if (s.includes('capacit')) return 100 + Math.floor(Math.random() * 2000);
    // fallback
    return 100 + Math.floor(Math.random() * 1000);
  }

  ngOnInit(): void {
    this.generateFakeProjects();
    this.loadSavedProjects();
  }

  private uid(prefix = ''): string {
    return prefix + Math.random().toString(36).slice(2, 9);
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private generateFakeProjects() {
    const count = 3 + Math.floor(Math.random() * 3); // 3..5 projects
    const usedNames = new Set<string>();

    for (let i = 0; i < count; i++) {
      // Choose a primary axis and indicator to base the project name on
      const mainAxis = this.pick(this.axes);
      const mainIndicator = this.pick(this.indicadores);

      const shortFromIndicator = (s: string) => {
        const stop = ['de', 'la', 'el', 'las', 'los', 'con', 'para', 'a', 'y', 'horas', 'Horas', 'Horas de', 'Horas de'];
        const words = s.split(/\s+/).filter(w => !stop.includes(w));
        return words.slice(0, 2).join(' ');
      };

      const templates = [
        `${mainAxis} — ${shortFromIndicator(mainIndicator)}`,
        `Programa ${mainAxis} ${this.pick(['Comunitario', 'Integral', 'Sostenible', 'Educativo'])}`,
        `Fundación ${shortFromIndicator(mainIndicator)}`,
        `Iniciativa ${mainAxis} de ${this.pick(['Impacto', 'Apoyo', 'Desarrollo'])}`,
        `${shortFromIndicator(mainIndicator)} y ${this.pick(['Bienestar', 'Formación', 'Inclusión'])}`
      ];

      let name = this.pick(templates);
      let attempts = 0;
      while (usedNames.has(name) && attempts < 10) {
        name = this.pick(templates) + (attempts === 0 ? '' : ` ${attempts}`);
        attempts++;
      }
      usedNames.add(name);

      // assign random number of kpis
      const kCount = 3 + Math.floor(Math.random() * 5); // 3..7 kpis
      const kpis: KpiItem[] = [];
      const usedKpis = new Set<string>();

      for (let k = 0; k < kCount; k++) {
        let kname = this.pick(this.indicadores);
        // allow duplicates in different projects but try to avoid repeats inside same project
        let attempts = 0;
        while (usedKpis.has(kname) && attempts < 10) {
          kname = this.pick(this.indicadores);
          attempts++;
        }
        usedKpis.add(kname);

        kpis.push({
          id: this.uid('kpi_'),
          name: kname,
          axis: this.pick(this.axes),
          value: null,
          description: '',
          target: this.estimateTargetFromIndicator(kname)
        });
      }

      this.projects.push({
        id: this.uid('proj_'),
        name,
        expanded: false,
        kpis,
        color: this.pick(this.palette)
      });
    }
  }

  toggle(project: ProjectItem) {
    project.expanded = !project.expanded;
  }

  saveProject(project: ProjectItem) {
    // Basic validation: ensure numeric values are numbers (allow null)
    project.saved = true;
    // close the project card after saving
    project.expanded = false;
    console.log('Guardado proyecto', project.name, project.kpis.map(k => ({ name: k.name, value: k.value, description: k.description })));
    // persist to localStorage so the prototype keeps values across refreshes
    try {
      const store = JSON.parse(localStorage.getItem('pf_proyectos') || '{}');
      store[project.id] = project;
      localStorage.setItem('pf_proyectos', JSON.stringify(store));
      // Mostrar notificación de éxito usando el mismo patrón del proyecto
      try {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Datos guardados para ${project.name}` });
      } catch (e) {
        // si MessageService no está disponible, no bloquear
        console.warn('No se pudo mostrar toast:', e);
      }
    } catch (e) {
      // ignore storage errors in prototype
    }
  }

  resetProject(project: ProjectItem) {
    project.kpis.forEach(k => {
      k.value = null;
      k.description = '';
    });
    project.saved = false;
    try {
      const store = JSON.parse(localStorage.getItem('pf_proyectos') || '{}');
      delete store[project.id];
      localStorage.setItem('pf_proyectos', JSON.stringify(store));
    } catch (e) { }
  }

  private loadSavedProjects() {
    try {
      const store = JSON.parse(localStorage.getItem('pf_proyectos') || '{}');
      if (!store) return;
      this.projects.forEach(p => {
        const saved = store[p.id];
        if (saved && saved.kpis && Array.isArray(saved.kpis)) {
          // merge saved values into generated kpis by name
          for (const sk of saved.kpis) {
            const found = p.kpis.find(x => x.name === sk.name);
            if (found) {
              found.value = sk.value ?? found.value;
              found.description = sk.description ?? found.description;
            }
          }
          p.saved = true;
        }
      });
    } catch (e) {
      // ignore parse errors for prototype
    }
  }

  getAxes(project: ProjectItem): string {
    if (!project || !project.kpis) return '';
    const uniques: string[] = [];
    for (const k of project.kpis) {
      if (!uniques.includes(k.axis)) uniques.push(k.axis);
    }
    return uniques.join(', ');
  }

  getPercent(project: ProjectItem, kpi: KpiItem): number {
    try {
      if (!kpi.target || kpi.target <= 0) return 0; // si no hay meta, no calculamos
      const cur = (kpi.value === null || kpi.value === undefined) ? 0 : Number(kpi.value);
      const pct = Math.round((cur / kpi.target) * 100);
      return Math.max(0, Math.min(100, pct)); // aseguramos que esté entre 0 y 100
    } catch (e) {
      return 0;
    }
  }


}
