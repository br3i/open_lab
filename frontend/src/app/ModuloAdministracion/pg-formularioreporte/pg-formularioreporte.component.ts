import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

interface KpiItem {
  id: string;
  name: string;
  axis: string;
  value: number | null;
  description: string;
  target?: number | null;
  reportHistory?: { mes: number; anio: number; valor: number }[];
  reportFrequency?: number;
}

interface ProjectItem {
  id: string;
  name: string;
  expanded: boolean;
  kpis: KpiItem[];
  saved?: boolean;
  color?: string;
  startDate?: Date;
  endDate?: Date;
  reportFrequency?: number;

  // NUEVO: archivos para mock
  files?: File[];
  showFileUpload?: boolean;
}

@Component({
  selector: 'app-pg-formularioreporte',
  templateUrl: './pg-formularioreporte.component.html',
  styleUrls: ['./pg-formularioreporte.component.css']
})
export class PgFormularioreporteComponent implements OnInit {

  projects: ProjectItem[] = [];

  private axes = ['Equidad de genero', 'Nutrición', 'Ambiente', 'Educación', 'Emprendimiento'];
  private palette = ['#1976d2', '#43a047', '#f57c00', '#8e24aa', '#e53935', '#00acc1'];
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

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.generateFakeProjects();
    this.loadSavedProjects();
  }

  private uid(prefix = ''): string { return prefix + Math.random().toString(36).slice(2, 9); }
  private pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

  private estimateTargetFromIndicator(ind: string): number {
    const s = ind.toLowerCase();
    if (s.includes('horas')) return 1000 + Math.floor(Math.random() * 4000);
    if (s.includes('profesor')) return 50 + Math.floor(Math.random() * 450);
    if (s.includes('instituciones')) return 5 + Math.floor(Math.random() * 200);
    if (s.includes('padres')) return 50 + Math.floor(Math.random() * 1000);
    if (s.includes('estudiantes')) return 100 + Math.floor(Math.random() * 5000);
    return 100 + Math.floor(Math.random() * 1000);
  }

  private generateFakeProjects() {
    const count = 3 + Math.floor(Math.random() * 3);
    const usedNames = new Set<string>();

    for (let i = 0; i < count; i++) {
      const mainAxis = this.pick(this.axes);
      const mainIndicator = this.pick(this.indicadores);

      const templates = [
        `${mainAxis} — ${mainIndicator}`,
        `Programa ${mainAxis} ${this.pick(['Comunitario', 'Integral', 'Sostenible', 'Educativo'])}`,
        `Fundación ${mainIndicator.split(' ').slice(0, 2).join(' ')}`,
        `Iniciativa ${mainAxis} de ${this.pick(['Impacto', 'Apoyo', 'Desarrollo'])}`
      ];

      let name = this.pick(templates);
      let attempts = 0;
      while (usedNames.has(name) && attempts < 10) {
        name = this.pick(templates) + (attempts ? ` ${attempts}` : '');
        attempts++;
      }
      usedNames.add(name);

      const projectStart = new Date(2025, Math.floor(Math.random() * 6), 1);
      const projectDurationMonths = 5 + Math.floor(Math.random() * 11);
      const projectEnd = new Date(projectStart);
      projectEnd.setMonth(projectStart.getMonth() + projectDurationMonths);

      const projectFrequency = this.pick([1, 2, 3, 4]);
      const totalReports = Math.floor(projectDurationMonths / projectFrequency);

      const kCount = 3 + Math.floor(Math.random() * 5);
      const kpis: KpiItem[] = [];
      const usedKpis = new Set<string>();

      for (let k = 0; k < kCount; k++) {
        let kname = this.pick(this.indicadores);
        let attempts = 0;
        while (usedKpis.has(kname) && attempts < 10) { kname = this.pick(this.indicadores); attempts++; }
        usedKpis.add(kname);

        const history: { mes: number; anio: number; valor: number }[] = [];
        for (let h = 0; h < totalReports; h++) {
          const date = new Date(projectStart);
          date.setMonth(date.getMonth() + h * projectFrequency);
          history.push({
            mes: date.getMonth() + 1,
            anio: date.getFullYear(),
            valor: Math.floor(Math.random() * 1000)
          });
        }

        kpis.push({
          id: this.uid('kpi_'),
          name: kname,
          axis: this.pick(this.axes),
          value: null,
          description: '',
          target: this.estimateTargetFromIndicator(kname),
          reportFrequency: projectFrequency,
          reportHistory: history
        });
      }

      this.projects.push({
        id: this.uid('proj_'),
        name,
        expanded: false,
        kpis,
        color: this.pick(this.palette),
        startDate: projectStart,
        endDate: projectEnd,
        reportFrequency: projectFrequency,
        files: [],
        showFileUpload: false
      });
    }
  }

  toggle(project: ProjectItem) { project.expanded = !project.expanded; }

  // --- Guardado de KPIs ---
  saveProject(project: ProjectItem) {
    if (!this.needsReport(project)) return;

    const now = new Date();
    const mes = now.getMonth() + 1;
    const anio = now.getFullYear();

    project.kpis.forEach(k => {
      k.reportHistory = k.reportHistory || [];
      k.reportHistory.push({ mes, anio, valor: k.value || 0 });
      k.value = null;
      k.description = '';
    });

    project.saved = true;
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Reporte guardado para ${project.name}` });
  }

  resetProject(project: ProjectItem) {
    project.kpis.forEach(k => { k.value = null; k.description = ''; });
    project.saved = false;
  }

  // --- Archivos mock ---
  toggleFileUpload(project: ProjectItem) {
    project.showFileUpload = !project.showFileUpload;
    if (!project.files) project.files = [];
  }

  onFileSelect(event: any, project: ProjectItem) {
    const files: FileList = event.target.files;
    project.files = [];
    for (let i = 0; i < files.length; i++) {
      project.files.push(files[i]);
    }
  }

  saveFiles(project: ProjectItem) {
    if (!project.files || project.files.length === 0) return;
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `${project.files.length} archivo(s) guardado(s) correctamente`
    });
    project.showFileUpload = false;
  }


  private loadSavedProjects() {
    // no necesitamos persistencia real para mock
  }

  getAxes(project: ProjectItem): string {
    if (!project?.kpis) return '';
    const uniques: string[] = [];
    project.kpis.forEach(k => { if (!uniques.includes(k.axis)) uniques.push(k.axis); });
    return uniques.join(', ');
  }

  getCurrentReportMonth(project: ProjectItem, k: KpiItem): number {
    if (!project.startDate) return 0;
    const start = new Date(project.startDate);
    const now = new Date();
    return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
  }

  getLastReport(k: KpiItem) {
    if (!k.reportHistory || k.reportHistory.length === 0) return null;
    return k.reportHistory[k.reportHistory.length - 1];
  }

  getExpectedReports(project: ProjectItem): number {
    if (!project.startDate || !project.endDate || !project.reportFrequency) return 0;
    const now = new Date();
    const end = project.endDate;
    const current = now > end ? end : now;
    const monthsPassed = (current.getFullYear() - project.startDate.getFullYear()) * 12 + (current.getMonth() - project.startDate.getMonth()) + 1;
    return Math.floor(monthsPassed / project.reportFrequency);
  }

  needsReport(project: ProjectItem): boolean {
    const expected = this.getExpectedReports(project);
    const actual = project.kpis[0]?.reportHistory?.length || 0;
    return actual < expected;
  }

  getMissingReports(project: ProjectItem): number {
    const expected = this.getExpectedReports(project);
    const actual = project.kpis[0]?.reportHistory?.length || 0;
    return Math.max(0, expected - actual);
  }

  getAccumulatedValue(k: KpiItem): number {
    const historyTotal = k.reportHistory?.reduce((sum, r) => sum + (r.valor || 0), 0) || 0;
    const currentVal = k.value || 0;
    return historyTotal + currentVal;
  }

  getAccumulatedPercent(p: ProjectItem, k: KpiItem): number {
    if (!k.target || k.target <= 0) return 0;
    const total = this.getAccumulatedValue(k);
    return Math.min(100, Math.round((total / k.target) * 100));
  }


}
