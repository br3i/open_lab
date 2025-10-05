import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { mockEjesData } from './mock.data';

import PptxGenJS from 'pptxgenjs';
import * as XLSX from 'xlsx';

Chart.register(...registerables);

// Interfaces para tipado fuerte
interface Medicion {
  anio: number;
  mes: string;
  valor: number;
  fundacion: string;
  nombreEje: string;
  nombreIndicador: string;
  nombreSubIndicador?: string;
}

interface FiltrosDisponibles {
  anios: any[];
  ejes: any[];
  fundaciones: any[];
  indicadores: any[];
  meses: any[];
}

interface FiltrosSeleccionados {
  anios: number[];
  ejes: string[];
  fundaciones: string[];
  indicadores: string[];
  meses: string[];
}

@Component({
  selector: 'app-reportedonacion',
  templateUrl: './reportedonacion.component.html',
  styleUrls: ['./reportedonacion.component.css']
})
export class ReportedonacionComponent implements OnInit, AfterViewInit, OnDestroy {

  // Referencias a los <canvas> en el HTML
  @ViewChild('chartTotalPorEje') chartTotalPorEjeRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartEvolucionMensual') chartEvolucionMensualRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartComparativoFundacion') chartComparativoFundacionRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartProgresoMeta') chartProgresoMetaRef!: ElementRef<HTMLCanvasElement>;

  private chartTotalPorEje!: Chart;
  private chartEvolucionMensual!: Chart;
  private chartComparativoFundacion!: Chart;
  private chartProgresoMeta!: Chart;

  private todasLasMediciones: Medicion[] = [];
  private metasMap = new Map<string, number>();

  public filtrosDisponibles: FiltrosDisponibles = { anios: [], ejes: [], fundaciones: [], indicadores: [], meses: [] };
  public filtrosSeleccionados: FiltrosSeleccionados = { anios: [], ejes: [], fundaciones: [], indicadores: [], meses: [] };

  private datosFiltradosActuales: Medicion[] = [];

  // ===== PROPIEDAD PARA CONTROLAR EL MODAL =====
  public mostrarModalDescarga: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.prepararDatosYFiltros();
  }

  ngAfterViewInit(): void {
    this.renderizarGraficos();
    this.aplicarFiltros(); // Carga inicial de datos en los gráficos
  }

  ngOnDestroy(): void {
    // Buena práctica: destruir los gráficos para evitar fugas de memoria
    this.chartTotalPorEje?.destroy();
    this.chartEvolucionMensual?.destroy();
    this.chartComparativoFundacion?.destroy();
    this.chartProgresoMeta?.destroy();
  }

  // ===== MÉTODOS PARA MANEJAR EL MODAL =====
  abrirModalDescarga(): void {
    this.mostrarModalDescarga = true;
  }

  cerrarModalDescarga(): void {
    this.mostrarModalDescarga = false;
  }


  private prepararDatosYFiltros(): void {
    const anios = new Set<number>();
    const ejes = new Set<string>();
    const fundaciones = new Set<string>();
    const indicadores = new Set<string>();
    const meses = new Set<string>();

    mockEjesData.forEach(eje => {
      ejes.add(eje.nombreEje);
      eje.indicadores.forEach(ind => {
        indicadores.add(ind.nombreIndicador);
        this.metasMap.set(ind.nombreIndicador, ind.meta);

        const procesarMediciones = (mediciones?: any[], subIndNombre?: string) => {
          if (!mediciones) return;
          mediciones.forEach(m => {
            this.todasLasMediciones.push({ ...m, nombreEje: eje.nombreEje, nombreIndicador: ind.nombreIndicador, nombreSubIndicador: subIndNombre });
            anios.add(m.anio);
            fundaciones.add(m.fundacion);
            meses.add(m.mes);
          });
        };

        procesarMediciones(ind.medicionesMensuales);
        ind.subIndicadores?.forEach(sub => {
          indicadores.add(sub.nombreSubIndicador);
          this.metasMap.set(sub.nombreSubIndicador, sub.meta);
          procesarMediciones(sub.medicionesMensuales, sub.nombreSubIndicador);
        });
      });
    });

    this.filtrosDisponibles.anios = Array.from(anios).sort().map(a => ({ label: a.toString(), value: a }));
    this.filtrosDisponibles.ejes = Array.from(ejes).sort().map(e => ({ label: e, value: e }));
    this.filtrosDisponibles.fundaciones = Array.from(fundaciones).sort().map(f => ({ label: f, value: f }));
    this.filtrosDisponibles.indicadores = Array.from(indicadores).sort().map(i => ({ label: i, value: i }));
    this.filtrosDisponibles.meses = Array.from(meses).sort().map(m => ({ label: m, value: m }));
  }

  public aplicarFiltros(): void {
    let datosFiltrados = [...this.todasLasMediciones];

    if (this.filtrosSeleccionados.anios.length > 0) {
      datosFiltrados = datosFiltrados.filter(m => this.filtrosSeleccionados.anios.includes(m.anio));
    }
    if (this.filtrosSeleccionados.ejes.length > 0) {
      datosFiltrados = datosFiltrados.filter(m => this.filtrosSeleccionados.ejes.includes(m.nombreEje));
    }
    if (this.filtrosSeleccionados.fundaciones.length > 0) {
      datosFiltrados = datosFiltrados.filter(m => this.filtrosSeleccionados.fundaciones.includes(m.fundacion));
    }
    if (this.filtrosSeleccionados.indicadores.length > 0) {
      datosFiltrados = datosFiltrados.filter(m =>
        this.filtrosSeleccionados.indicadores.includes(m.nombreIndicador) ||
        (m.nombreSubIndicador && this.filtrosSeleccionados.indicadores.includes(m.nombreSubIndicador))
      );
    }
    if (this.filtrosSeleccionados.meses.length > 0) {
      datosFiltrados = datosFiltrados.filter(m => this.filtrosSeleccionados.meses.includes(m.mes));
    }

    this.datosFiltradosActuales = datosFiltrados;
    this.actualizarGraficos(datosFiltrados);
  }

  public limpiarFiltros(): void {
    this.filtrosSeleccionados = { anios: [], ejes: [], fundaciones: [], indicadores: [], meses: [] };
    this.aplicarFiltros();
  }

  private actualizarGraficos(datos: Medicion[]): void {
    if (!this.chartTotalPorEje) return;
    this.actualizarTotalPorEje(datos);
    this.actualizarEvolucionMensual(datos);
    this.actualizarComparativoFundacion(datos);
    this.actualizarProgresoMeta(datos);
  }

  private actualizarTotalPorEje(datos: Medicion[]): void {
    const dataPorEje = datos.reduce((acc, curr) => {
      acc[curr.nombreEje] = (acc[curr.nombreEje] || 0) + curr.valor;
      return acc;
    }, {} as { [key: string]: number });

    this.chartTotalPorEje.data.labels = Object.keys(dataPorEje);
    this.chartTotalPorEje.data.datasets[0].data = Object.values(dataPorEje);
    this.chartTotalPorEje.update();
  }

  private actualizarEvolucionMensual(datos: Medicion[]): void {
    const ordenMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dataPorMes = datos.reduce((acc, curr) => {
      acc[curr.mes] = (acc[curr.mes] || 0) + curr.valor;
      return acc;
    }, {} as { [key: string]: number });

    const labels = ordenMeses.filter(mes => dataPorMes[mes] !== undefined);
    const data = labels.map(mes => dataPorMes[mes]);

    this.chartEvolucionMensual.data.labels = labels;
    this.chartEvolucionMensual.data.datasets[0].data = data;
    this.chartEvolucionMensual.update();
  }

  private actualizarComparativoFundacion(datos: Medicion[]): void {
    const dataPorFundacion = datos.reduce((acc, curr) => {
      acc[curr.fundacion] = (acc[curr.fundacion] || 0) + curr.valor;
      return acc;
    }, {} as { [key: string]: number });

    this.chartComparativoFundacion.data.labels = Object.keys(dataPorFundacion);
    this.chartComparativoFundacion.data.datasets[0].data = Object.values(dataPorFundacion);
    this.chartComparativoFundacion.update();
  }

  private actualizarProgresoMeta(datos: Medicion[]): void {
    const dataPorIndicador = datos.reduce((acc, curr) => {
      const nombre = curr.nombreSubIndicador || curr.nombreIndicador;
      acc[nombre] = (acc[nombre] || 0) + curr.valor;
      return acc;
    }, {} as { [key: string]: number });

    const labels = Object.keys(dataPorIndicador);
    const data = labels.map(label => {
      const valorActual = dataPorIndicador[label];
      const meta = this.metasMap.get(label) || 0;
      return meta > 0 ? parseFloat(((valorActual / meta) * 100).toFixed(2)) : 0;
    });

    this.chartProgresoMeta.data.labels = labels;
    this.chartProgresoMeta.data.datasets[0].data = data;
    this.chartProgresoMeta.update();
  }

  private renderizarGraficos(): void {
    const pieConfig = (title: string) => ({
      type: 'pie' as const,
      data: { labels: [], datasets: [{ data: [], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26A69A', '#AB47BC'] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: title, font: { size: 16 } } } }
    });
    const lineConfig = (title: string) => ({
      type: 'line' as const,
      data: { labels: [], datasets: [{ label: 'Valor Total', data: [], borderColor: '#42A5F5', fill: false, tension: 0.1 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: title, font: { size: 16 } } } }
    });
    const barConfig = (title: string, label: string = 'Valor Total', color: string = '#66BB6A') => ({
      type: 'bar' as const,
      data: { labels: [], datasets: [{ label: label, data: [], backgroundColor: color }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: title, font: { size: 16 } } } }
    });

    this.chartTotalPorEje = new Chart(this.chartTotalPorEjeRef.nativeElement, pieConfig('Distribución por Eje'));
    this.chartEvolucionMensual = new Chart(this.chartEvolucionMensualRef.nativeElement, lineConfig('Evolución Mensual'));
    this.chartComparativoFundacion = new Chart(this.chartComparativoFundacionRef.nativeElement, barConfig('Comparativo por Fundación'));
    this.chartProgresoMeta = new Chart(this.chartProgresoMetaRef.nativeElement, barConfig('Avance vs Meta (%)', '% de Avance', '#FFA726'));
  }

  // ===== MÉTODOS DE DESCARGA (ACTUALIZADOS) =====

  public async descargarComoPPTX(): Promise<void> {
    if (!this.chartTotalPorEje) {
      // Usaremos un modal de PrimeNG o un toast en un caso real
      console.error('Los gráficos no están listos.');
      return;
    }

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';
    const slideTitulo = pptx.addSlide();
    slideTitulo.addText('Dashboard de Indicadores', { x: 0.5, y: 0.25, fontSize: 24, bold: true, color: '363636' });

    const addChartToSlide = (chart: Chart, title: string) => {
      const newSlide = pptx.addSlide();
      newSlide.addText(title, { x: 0.5, y: 0.25, fontSize: 18, bold: true });
      newSlide.addImage({ data: chart.toBase64Image(), x: 1, y: 1, w: 8, h: 4.5 });
    };

    addChartToSlide(this.chartTotalPorEje, 'Distribución por Eje');
    addChartToSlide(this.chartEvolucionMensual, 'Evolución Mensual');
    addChartToSlide(this.chartComparativoFundacion, 'Comparativo por Fundación');
    addChartToSlide(this.chartProgresoMeta, 'Avance vs Meta (%)');

    await pptx.writeFile({ fileName: 'Dashboard_Indicadores.pptx' });
    this.cerrarModalDescarga(); // Cierra el modal después de la descarga
  }

  public descargarComoExcel(): void {
    if (this.datosFiltradosActuales.length === 0) {
      console.warn('No hay datos seleccionados para exportar.');
      return;
    }

    const datosParaExportar = this.datosFiltradosActuales.map(medicion => ({
      'Eje': medicion.nombreEje,
      'Indicador': medicion.nombreIndicador,
      'Sub-Indicador': medicion.nombreSubIndicador || 'N/A',
      'Fundación': medicion.fundacion,
      'Año': medicion.anio,
      'Mes': medicion.mes,
      'Valor': medicion.valor
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DatosFiltrados');
    XLSX.writeFile(wb, 'Datos_Dashboard.xlsx');
    this.cerrarModalDescarga(); // Cierra el modal después de la descarga
  }
}
