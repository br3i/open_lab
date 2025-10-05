import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-pg-dashboard-multi',
    templateUrl: './pg-dashboard-multi.component.html',
    styleUrls: ['./pg-dashboard-multi.component.css']
})
export class PgDashboardMultiComponent implements OnInit {
    @ViewChild('chartRoles') chartRolesRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartGenero') chartGeneroRef!: ElementRef<HTMLCanvasElement>;

    // mock data
    totalUsuarios = 124;
    totalPerfilesActivos = 97;
    usuariosRecientes: any[] = [];
    usuariosPorRol: any[] = [];
    personasPorGenero: any[] = [];
    treeNodes: any[] = [];

    private chartRoles: Chart | null = null;
    private chartGenero: Chart | null = null;

    overlayVisible = false;

    constructor() { }

    ngOnInit(): void {
        this.loadMock();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.renderCharts(), 50);
    }

    loadMock() {
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

        this.usuariosRecientes = Array.from({ length: 8 }).map((_, i) => ({
            id: i + 1,
            nombre: `Usuario ${i + 1}`,
            rol: this.usuariosPorRol[i % this.usuariosPorRol.length].rol,
            creado: new Date(Date.now() - i * 86400000).toLocaleDateString()
        }));

        this.treeNodes = [
            {
                label: 'Organización', expanded: true, children: [
                    { label: 'Área administrativa' },
                    { label: 'Área operaciones' },
                    {
                        label: 'Voluntariado', children: [
                            { label: 'Registro' },
                            { label: 'Asignaciones' }
                        ]
                    }
                ]
            }
        ];
    }

    renderCharts() {
        const labelsRoles = this.usuariosPorRol.map(r => r.rol);
        const valuesRoles = this.usuariosPorRol.map(r => r.cantidad);

        const ctxRoles = this.chartRolesRef?.nativeElement.getContext('2d');
        if (ctxRoles) {
            this.chartRoles = new Chart(ctxRoles, {
                type: 'pie',
                data: { labels: labelsRoles, datasets: [{ data: valuesRoles, backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'] }] },
                options: { responsive: true }
            });
        }

        const labelsGen = this.personasPorGenero.map(g => g.genero);
        const valuesGen = this.personasPorGenero.map(g => g.cantidad);
        const ctxGen = this.chartGeneroRef?.nativeElement.getContext('2d');
        if (ctxGen) {
            this.chartGenero = new Chart(ctxGen, {
                type: 'bar',
                data: { labels: labelsGen, datasets: [{ label: 'Personas por género', data: valuesGen, backgroundColor: ['#42A5F5', '#FF6384'] }] },
                options: { responsive: true }
            });
        }
    }

    onFileUpload(event: any) {
        // simple mock handler
        console.log('files uploaded', event);
    }

}
