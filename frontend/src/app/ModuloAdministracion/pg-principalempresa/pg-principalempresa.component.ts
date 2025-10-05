import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-principalempresa',
  templateUrl: './pg-principalempresa.component.html',
  styleUrls: ['./pg-principalempresa.component.css']
})
export class PgPrincipalempresaComponent implements OnInit {
  selectedOption: number = 1;
  basePath = '/dashadmin/principalempresa';

  tabs = [
    { label: 'Tipo de empresa', path: 'tipoempresa' },
    { label: 'Tipo de solicitud', path: 'tiposolicitud' },
    { label: 'Solicitud de fundaciones', path: 'empresapendiente' },
    { label: 'Fundaciones aceptadas', path: 'empresaaceptado' },
    { label: 'Fundaciones rechazadas', path: 'empresarechazado' },
    { label: 'Registro de empresa', path: 'registroempresa' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const currentPath = this.router.url;
    const foundIndex = this.tabs.findIndex(tab => currentPath.includes(tab.path));
    this.selectedOption = foundIndex >= 0 ? foundIndex + 1 : 1;
  }

  CambioSelect(index: number): void {
    this.selectedOption = index;
    const selectedTab = this.tabs[index - 1];
    this.router.navigate([`${this.basePath}/${selectedTab.path}`]);
  }
}
