import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-principalorganizacion',
  templateUrl: './pg-principalorganizacion.component.html',
  styleUrls: ['./pg-principalorganizacion.component.css']
})
export class PgPrincipalorganizacionComponent {

  selectedOption: number = 1; // Índice de la pestaña activa, inicializado en la primera pestaña.
  basePath = '/dashadmin/principalorganizacion'; // Base para las rutas.

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Sincronizar la pestaña activa con la ruta actual al cargar el componente.
    const currentPath = this.router.url;
   if (currentPath.includes('/personal')) {
      this.selectedOption = 1;
    } else if (currentPath.includes('/gestioncontrato')) {
      this.selectedOption = 3;
    } else {
      this.selectedOption = 1; // Por defecto, selecciona la primera pestaña.
    }
  }

  CambioSelect(option: number): void {
    this.selectedOption = option; // Actualizar el índice de la pestaña activa.

    switch (option) {
      case 1:
        this.router.navigate([`${this.basePath}/listadoscentros`]);
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
