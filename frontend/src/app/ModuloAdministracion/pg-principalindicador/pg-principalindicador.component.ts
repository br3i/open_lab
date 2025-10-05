import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-principalindicador',
  templateUrl: './pg-principalindicador.component.html',
  styleUrls: ['./pg-principalindicador.component.css']
})
export class PgPrincipalindicadorComponent {

  selectedOption: number = 1; // Índice de la pestaña activa, inicializado en la primera pestaña.
  basePath = '/dashadmin/principalindicador'; // Base para las rutas.

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Sincronizar la pestaña activa con la ruta actual al cargar el componente.
    const currentPath = this.router.url;
   if (currentPath.includes('/indicador')) {
      this.selectedOption = 1;
    } else if (currentPath.includes('/indicador')) {
      this.selectedOption = 3;
    } else {
      this.selectedOption = 1; // Por defecto, selecciona la primera pestaña.
    }
  }

  CambioSelect(option: number): void {
    this.selectedOption = option; // Actualizar el índice de la pestaña activa.

    switch (option) {
      case 1:
        this.router.navigate([`${this.basePath}/indicador`]);
        break;
      case 2:
        this.router.navigate([`${this.basePath}/personal`]);
        break;
      case 3:
        this.router.navigate([`${this.basePath}/gestioncontrato`]);
        break;
      default:
        this.router.navigate([`${this.basePath}/listadoscentros`]);
        break;
    }
  }
}
