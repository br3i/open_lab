import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pg-principalreporte',
    templateUrl: './pg-principalreporte.component.html',
    styleUrls: ['./pg-principalreporte.component.css']
})
export class PgPrincipalreporteComponent implements OnInit { // <-- Añadido OnInit
    selectedOption: number = 1;
    basePath = '/dashadmin/principalreporte';

      tabs = [
      { label: 'Reporte de Donaciones', path: 'reportedonacion' },
      { label: 'Dashboard Natural', path: 'dashboard-natural' },
    ];
        constructor(private router: Router) { }

    ngOnInit(): void {
        const currentUrl = this.router.url;
        const foundIndex = this.tabs.findIndex(tab => currentUrl.endsWith(tab.path));

       if (foundIndex !== -1) {
            this.selectedOption = foundIndex + 1;
        } else {
                       if (currentUrl === this.basePath) {
                this.router.navigate([`${this.basePath}/${this.tabs[0].path}`]);
            }
        }
    }

    CambioSelect(index: number): void {
        this.selectedOption = index;
        const selectedTab = this.tabs[index - 1];
        if (selectedTab) {
            this.router.navigate([`${this.basePath}/${selectedTab.path}`]);
        }
    }
}
