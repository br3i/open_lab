import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ServiciosReportes } from '../../../ModuloServiciosWeb/servicios-reportes.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-reportedonacion',
    templateUrl: './reportedonacion.component.html',
    styleUrls: ['./reportedonacion.component.css']
})
export class ReportedonacionComponent implements OnInit, AfterViewInit {
    @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartGenero') chartGeneroRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartLine') chartLineRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartDoughnut') chartDoughnutRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartPolar') chartPolarRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartRadar') chartRadarRef!: ElementRef<HTMLCanvasElement>;

    totalUsuarios: number = 0;
    totalPerfilesActivos: number = 0;
    usuariosPorRol: Array<any> = [];
    personasPorGenero: Array<any> = [];

    // UI helpers
    q: string = '';
    usuariosRecientes: any[] = [];
    treeNodes: any[] = [];
    timeline: any[] = [];
    // KPI selection
    availableKpis: any[] = [];
    selectedKpis: any[] = [];
    additionalSelectedKpis: any[] = [];
    selectedKpiForPie: any = null;
    // role selection
    availableRoles: any[] = [];
    // per-chart selections
    selectedForLine: any[] = [];
    selectedForDoughnut: any[] = [];
    selectedForPolar: any[] = [];
    selectedForRadar: any[] = [];
    // pie specific
    selectedKpisForPie: any[] = [];
    pieStyle: 'pie' | 'doughnut' = 'pie';
    pieTotal: number = 0;

    private chartInstance: Chart | null = null;
    private chartGeneroInstance: Chart | null = null;
    private chartLineInstance: Chart | null = null;
    private chartDoughnutInstance: Chart | null = null;
    private chartPolarInstance: Chart | null = null;
    private chartRadarInstance: Chart | null = null;
    private dynamicChartInstances: Chart[] = [];
    @ViewChildren('dynamicChart') dynamicChartRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
    @ViewChildren('kpiDonut') kpiDonutRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
    private kpiDonutInstances: Chart[] = [];
    kpiTotals: number[] = [];
    // keep original full-value arrays per KPI so legend toggles can restore/hide without regenerating
    allValuesByKpi: number[][] = [];
    // note: donut segment visibility is handled via legend clicks; originals stored in allValuesByKpi

    constructor(private serviciosReportes: ServiciosReportes) { }

    ngOnInit(): void {
        this.loadDashboard();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.renderChart();
            this.renderGeneroChart();
            this.renderLineChart();
            this.renderDoughnutChart();
            this.renderPolarChart();
            this.renderRadarChart();
            this.initAvailableKpis();
        }, 100);
    }

    private loadDashboard() {
        this.serviciosReportes.getDashboard().subscribe({
            next: (resp) => {
                const datos = resp?.datos ?? resp; // dependiendo de la forma devuelta
                this.totalUsuarios = datos.totalUsuarios ?? 0;
                this.totalPerfilesActivos = datos.totalPerfilesActivos ?? 0;
                this.usuariosPorRol = datos.usuariosPorRol ?? [];
                this.personasPorGenero = datos.personasPorGenero ?? [];

                // Si la base de datos está vacía o no hay datos, usamos mock temporal para visualización
                if (!this.usuariosPorRol || this.usuariosPorRol.length === 0) {
                    this.applyMockData();
                }

                this.renderChart();
                this.renderGeneroChart();
            },
            error: (err) => {
                console.error('Error cargando dashboard:', err);
                // En caso de error con el backend, mostramos datos mock para el desarrollo
                this.applyMockData();
                this.renderChart();
                this.renderGeneroChart();
            }
        });
    }

    private applyMockData() {
        // Datos de ejemplo para probar visualizaciones
        this.totalUsuarios = 124;
        this.totalPerfilesActivos = 97;
        this.usuariosPorRol = [
            { rol: 'Administrador', cantidad: 5 },
            { rol: 'Técnico', cantidad: 28 },
            { rol: 'Voluntario', cantidad: 81 },
            { rol: 'Practicante', cantidad: 10 }
        ];
        this.personasPorGenero = [
            { genero: 'M', cantidad: 70 },
            { genero: 'F', cantidad: 54 }
        ];

        // otros mocks para UI
        this.usuariosRecientes = Array.from({ length: 8 }).map((_, i) => ({ id: i + 1, nombre: `Usuario ${i + 1}`, rol: this.usuariosPorRol[i % this.usuariosPorRol.length].rol, creado: new Date(Date.now() - i * 86400000).toLocaleDateString() }));

        this.treeNodes = [
            { label: 'Organización', expanded: true, children: [{ label: 'Área administrativa' }, { label: 'Área operaciones' }, { label: 'Voluntariado', children: [{ label: 'Registro' }, { label: 'Asignaciones' }] }] }
        ];

        this.timeline = [
            { fecha: '2025-09-01', evento: 'Registro de 10 usuarios' },
            { fecha: '2025-09-05', evento: 'Campaña de donación iniciada' },
            { fecha: '2025-09-12', evento: 'Entrega de materiales' }
        ];

        // mock series para charts adicionales
        this.lineSeries = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            data: [12, 19, 3, 5, 2, 3]
        };

        this.doughnutSeries = {
            labels: ['A', 'B', 'C', 'D'],
            data: [30, 20, 25, 25]
        };

        this.polarSeries = {
            labels: ['Red', 'Blue', 'Yellow', 'Green'],
            data: [11, 16, 7, 14]
        };

        this.radarSeries = {
            labels: ['Velocidad', 'Eficiencia', 'Satisfacción', 'Cobertura', 'Impacto'],
            data: [65, 59, 90, 81, 56]
        };

        // opciones de KPI simuladas
        this.availableKpis = [
            { key: 'kpi_usuarios', label: 'Total Usuarios' },
            { key: 'kpi_perfiles', label: 'Perfiles activos' },
            { key: 'kpi_donaciones', label: 'Donaciones mes' },
            { key: 'kpi_eventos', label: 'Eventos' },
            { key: 'kpi_satisfaccion', label: 'Satisfacción' }
        ];

        // roles disponibles a partir del mock de roles
        this.availableRoles = this.usuariosPorRol.map(r => ({ label: r.rol, value: r.rol }));

        // generar matriz mock role->kpi values
        this.roleKpiData = {};
        this.availableRoles.forEach(role => {
            this.roleKpiData[role.value] = this.availableKpis.map(() => Math.floor(Math.random() * 100));
        });
    }

    // role -> array of numbers aligned with availableKpis
    roleKpiData: Record<string, number[]> = {};

    private initAvailableKpis() {
        if (!this.availableKpis || this.availableKpis.length === 0) {
            this.applyMockData();
        }
    }

    updateRoleChart() {
        // Repinta el gráfico principal usando la selección actual de KPIs
        this.renderChart();
    }

    renderDynamicCharts() {
        // espera a que existan los canvas dinámicos
        setTimeout(() => {
            const refs = this.dynamicChartRefs.toArray();
            // eliminar instancias previas
            this.dynamicChartInstances.forEach(c => c.destroy());
            this.dynamicChartInstances = [];

            this.additionalSelectedKpis.forEach((kpi: any, i: number) => {
                const ref = refs[i];
                if (!ref) return;
                const ctx = ref.nativeElement.getContext('2d');
                if (!ctx) return;

                const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
                const data = Array.from({ length: labels.length }).map(() => Math.floor(Math.random() * 100));

                const chart = new Chart(ctx, {
                    type: 'line',
                    data: { labels, datasets: [{ label: kpi.label, data, borderColor: '#42A5F5', fill: false }] },
                    options: { responsive: true }
                });

                this.dynamicChartInstances.push(chart);
            });
        }, 100);
    }

    renderKpiDonuts() {
        setTimeout(() => {
            const refs = this.kpiDonutRefs.toArray();
            // destroy previous
            this.kpiDonutInstances.forEach(c => c.destroy());
            this.kpiDonutInstances = [];
            this.kpiTotals = [];

            this.selectedKpisForPie.forEach((kp: any, i: number) => {
                const ref = refs[i];
                if (!ref) return;
                const ctx = ref.nativeElement.getContext('2d');
                if (!ctx) return;

                // generate mock distribution by gender and persist original values so toggling legend won't regenerate
                const allLabels = this.personasPorGenero.map((g: any) => g.genero);
                const allValues = allLabels.map(() => Math.floor(Math.random() * 100) + 5);
                // store originals
                this.allValuesByKpi[i] = allValues.slice();

                // initially all visible
                const visibleFlags = allValues.map(() => true);
                const dataset = { data: allValues.slice(), backgroundColor: ['#42A5F5', '#FF6384', '#FFCE56', '#4BC0C0'] } as any;
                const total = allValues.reduce((a, b) => a + b, 0);
                this.kpiTotals[i] = total;

                const self = this;
                const chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: { labels: allLabels, datasets: [dataset] },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                onClick: function (e: any, legendItem: any, legend: any) {
                                    const ci: any = legend.chart;
                                    // attach visibleFlags to chart instance if not present
                                    if (!ci._visibleFlags) ci._visibleFlags = visibleFlags.slice();
                                    const idx = legendItem.index;
                                    ci._visibleFlags[idx] = !ci._visibleFlags[idx];
                                    const orig = self.allValuesByKpi[i] || [];
                                    const newData = orig.map((v: number, j: number) => ci._visibleFlags[j] ? v : 0);
                                    ci.data.datasets[0].data = newData;
                                    ci.update();
                                    // update component totals
                                    self.kpiTotals[i] = newData.reduce((a: number, b: number) => a + b, 0);
                                }
                            },
                            tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.raw}` } }
                        }
                    }
                });

                this.kpiDonutInstances.push(chart);
            });
        }, 50);
    }

    // Note: legend click toggles donut segments; no separate selector logic required.

    // helpers to create series from selected KPIs (mocked)
    private seriesFromKpis(kpis: any[]) {
        const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
        const datasets = kpis.map(k => ({ label: k.label, data: Array.from({ length: labels.length }).map(() => Math.floor(Math.random() * 100)) }));
        return { labels, datasets };
    }

    updateLineChart() {
        const s = this.seriesFromKpis(this.selectedForLine.length ? this.selectedForLine : [{ label: 'Default' }]);
        if (this.chartLineInstance) {
            this.chartLineInstance.data.labels = s.labels;
            this.chartLineInstance.data.datasets = s.datasets as any;
            this.chartLineInstance.update();
        } else {
            this.lineSeries = s; // use for initial render
            this.renderLineChart();
        }
    }

    updateDoughnutChart() {
        const s = this.seriesFromKpis(this.selectedForDoughnut.length ? this.selectedForDoughnut : [{ label: 'Default' }]);
        // doughnut expects single dataset; combine datasets values
        const labels = s.labels;
        const combined = s.datasets.map((d: any) => d.data.reduce((a: number, b: number) => a + b, 0));
        if (this.chartDoughnutInstance) {
            this.chartDoughnutInstance.data.labels = s.datasets.map((d: any) => d.label);
            (this.chartDoughnutInstance.data.datasets[0].data as number[]) = combined;
            this.chartDoughnutInstance.update();
        } else {
            this.doughnutSeries = { labels: s.datasets.map((d: any) => d.label), data: combined };
            this.renderDoughnutChart();
        }
    }

    updatePolarChart() {
        const s = this.seriesFromKpis(this.selectedForPolar.length ? this.selectedForPolar : [{ label: 'Default' }]);
        const combined = s.datasets.map((d: any) => d.data.reduce((a: number, b: number) => a + b, 0));
        if (this.chartPolarInstance) {
            this.chartPolarInstance.data.labels = s.datasets.map((d: any) => d.label);
            (this.chartPolarInstance.data.datasets[0].data as number[]) = combined;
            this.chartPolarInstance.update();
        } else {
            this.polarSeries = { labels: s.datasets.map((d: any) => d.label), data: combined };
            this.renderPolarChart();
        }
    }

    updateRadarChart() {
        // Re-render radar where labels = roles and each selected KPI is a dataset (click legend to toggle KPIs)
        this.renderRadarChart();
    }

    // placeholders for mock series
    lineSeries: any = { labels: [], data: [] };
    doughnutSeries: any = { labels: [], data: [] };
    polarSeries: any = { labels: [], data: [] };
    radarSeries: any = { labels: [], data: [] };

    private renderChart() {
        // Ahora mostramos KPIs en el eje X y cada rol como una serie
        const kpis = (this.selectedKpis && this.selectedKpis.length > 0) ? this.selectedKpis : this.availableKpis;
        const labels = kpis.map((k: any) => k.label);

        // roles a mostrar
        const rolesToShow = this.usuariosPorRol.map(r => r.rol);

        const datasets = rolesToShow.map((role: any, idx: number) => {
            // Para cada KPI seleccionado, buscamos su índice en availableKpis y tomamos el valor correspondiente de roleKpiData
            const values = kpis.map((kp: any) => {
                const idxK = this.availableKpis.findIndex(a => a.key === kp.key);
                const roleVals = this.roleKpiData[role] || [];
                return (roleVals[idxK] != null) ? roleVals[idxK] : Math.floor(Math.random() * 50);
            });
            const color = `hsl(${(idx * 60) % 360} 70% 50%)`;
            return { label: role, data: values, backgroundColor: color };
        });

        setTimeout(() => {
            const ctx = this.chartRef?.nativeElement.getContext('2d');
            if (!ctx) return;

            if (this.chartInstance) {
                this.chartInstance.data.labels = labels;
                this.chartInstance.data.datasets = datasets as any;
                this.chartInstance.update();
                return;
            }

            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: { labels, datasets: datasets as any },
                options: { responsive: true, scales: { x: { stacked: false }, y: { beginAtZero: true } } }
            });
        }, 50);
    }

    private renderLineChart() {
        const labels = this.lineSeries.labels;
        const values = this.lineSeries.data;
        setTimeout(() => {
            const ctx = this.chartLineRef?.nativeElement.getContext('2d');
            if (!ctx) return;
            if (this.chartLineInstance) {
                this.chartLineInstance.data.labels = labels;
                (this.chartLineInstance.data.datasets[0].data as number[]) = values;
                this.chartLineInstance.update();
                return;
            }
            this.chartLineInstance = new Chart(ctx, {
                type: 'line',
                data: { labels, datasets: [{ label: 'Series', data: values, borderColor: '#42A5F5', fill: false }] },
                options: { responsive: true }
            });
        }, 50);
    }

    private renderDoughnutChart() {
        const labels = this.doughnutSeries.labels;
        const values = this.doughnutSeries.data;
        setTimeout(() => {
            const ctx = this.chartDoughnutRef?.nativeElement.getContext('2d');
            if (!ctx) return;
            if (this.chartDoughnutInstance) {
                this.chartDoughnutInstance.data.labels = labels;
                (this.chartDoughnutInstance.data.datasets[0].data as number[]) = values;
                this.chartDoughnutInstance.update();
                return;
            }
            this.chartDoughnutInstance = new Chart(ctx, {
                type: 'doughnut',
                data: { labels, datasets: [{ data: values, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }] },
                options: { responsive: true }
            });
        }, 50);
    }

    private renderPolarChart() {
        const labels = this.polarSeries.labels;
        const values = this.polarSeries.data;
        setTimeout(() => {
            const ctx = this.chartPolarRef?.nativeElement.getContext('2d');
            if (!ctx) return;
            if (this.chartPolarInstance) {
                this.chartPolarInstance.data.labels = labels;
                (this.chartPolarInstance.data.datasets[0].data as number[]) = values;
                this.chartPolarInstance.update();
                return;
            }
            this.chartPolarInstance = new Chart(ctx, {
                type: 'polarArea',
                data: { labels, datasets: [{ data: values, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }] },
                options: { responsive: true }
            });
        }, 50);
    }

    private renderRadarChart() {
        // Build radar where axes = roles and datasets = selected KPIs
        const kpis = (this.selectedForRadar && this.selectedForRadar.length > 0) ? this.selectedForRadar : this.availableKpis;
        const labels = this.usuariosPorRol.map(r => r.rol);

        // datasets per KPI
        const datasets = kpis.map((kp: any, ki: number) => {
            const idxK = this.availableKpis.findIndex(a => a.key === kp.key);
            const data = labels.map((role: any) => {
                const roleVals = this.roleKpiData[role] || [];
                return (roleVals[idxK] != null) ? roleVals[idxK] : Math.floor(Math.random() * 50);
            });
            const hue = (ki * 72) % 360;
            return {
                label: kp.label,
                data,
                backgroundColor: `hsla(${hue},70%,50%,0.2)`,
                borderColor: `hsl(${hue} 70% 40%)`,
                fill: true
            } as any;
        });

        setTimeout(() => {
            const ctx = this.chartRadarRef?.nativeElement.getContext('2d');
            if (!ctx) return;
            if (this.chartRadarInstance) {
                this.chartRadarInstance.data.labels = labels;
                this.chartRadarInstance.data.datasets = datasets as any;
                this.chartRadarInstance.update();
                return;
            }
            this.chartRadarInstance = new Chart(ctx, {
                type: 'radar',
                data: { labels, datasets: datasets as any },
                options: { responsive: true }
            });
        }, 50);
    }

    private renderGeneroChart() {
        // Build labels (genders) and combine KPI values if selected
        const labels = this.personasPorGenero.map((g: any) => g.genero);

        // if KPIs chosen for pie, combine values per gender using roleKpiData mock as source (distribute randomly per gender)
        let values: number[] = this.personasPorGenero.map((g: any) => g.cantidad);
        if (this.selectedKpisForPie && this.selectedKpisForPie.length > 0) {
            // combine by summing random contributions per selected KPI
            values = labels.map(() => 0);
            this.selectedKpisForPie.forEach((kp: any) => {
                const idxK = this.availableKpis.findIndex(a => a.key === kp.key);
                // simulate distribution across genders
                this.personasPorGenero.forEach((g: any, gi: number) => {
                    values[gi] += Math.floor(Math.random() * 50) + (g.cantidad || 0);
                });
            });
        }

        this.pieTotal = values.reduce((a, b) => a + b, 0);

        setTimeout(() => {
            const ctx = this.chartGeneroRef?.nativeElement.getContext('2d');
            if (!ctx) return;

            const dataset = { data: values, backgroundColor: ['#42A5F5', '#FF6384'] } as any;

            if (this.chartGeneroInstance) {
                this.chartGeneroInstance.data.labels = labels;
                this.chartGeneroInstance.data.datasets = [dataset];
                this.chartGeneroInstance.update();
                return;
            }

            // Register a small plugin to draw center text on doughnut
            const centerTextPlugin = {
                id: 'centerText',
                beforeDraw: (chart: any) => {
                    if (chart.config.type !== 'doughnut') return;
                    const width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx;
                    ctx.restore();
                    const fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";
                    const text = String(this.pieTotal),
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            };

            Chart.register(centerTextPlugin);

            this.chartGeneroInstance = new Chart(ctx, {
                type: (this.pieStyle as any),
                data: { labels: labels, datasets: [dataset] },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context: any) => {
                                    const val = context.raw as number;
                                    const percent = ((val / this.pieTotal) * 100).toFixed(1);
                                    return `${context.label}: ${val} (${percent}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }, 50);
    }

    onSearch() {
        // filtro simple en memoria
        const q = this.q?.toLowerCase().trim();
        if (!q) return;
        const found = this.usuariosRecientes.filter(u => u.nombre.toLowerCase().includes(q) || (u.rol || '').toLowerCase().includes(q));
        console.log('Search result', found);
    }

    onOverlayHide() {
        // placeholder: puedes mostrar mensajes u otras acciones
        console.log('Overlay hidden');
    }

    onFileUpload(event: any) {
        // simple mock handler
        console.log('files uploaded', event);
    }
}
