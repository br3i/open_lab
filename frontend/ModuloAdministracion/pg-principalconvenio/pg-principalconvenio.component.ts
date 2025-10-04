import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-principalconvenio',
  templateUrl: './pg-principalconvenio.component.html',
  styleUrls: ['./pg-principalconvenio.component.css'],
})
export class PgPrincipalconvenioComponent {
  selectedOption: number = 1; // Índice de la pestaña activa, inicializado en la primera pestaña.
  basePath = '/dashadmin/principalconvenio'; // Base para las rutas.

  constructor(private router: Router) {}

ngOnInit(): void {
  const currentPath = this.router.url;

  if (currentPath.includes('/listadoconvenios')) {
    this.selectedOption = 1;
  } else if (currentPath.includes('/listadocontratos')) {
    this.selectedOption = 2;
  } else if (currentPath.includes('/gestioncontrato')) {
    this.selectedOption = 3;
  } else if (
    currentPath.includes('/convenionuevo') ||
    currentPath.includes('/convenioeditar')
  ) {
    // Mantenemos donde está, ya que es formulario
    this.selectedOption = 1;
  } else {
    // Solo si no está en ninguna de las rutas válidas hijas
    this.router.navigate([`${this.basePath}/listadoconvenios`]);
  }
}


  CambioSelect(option: number): void {
    this.selectedOption = option; // Actualizar el índice de la pestaña activa.

    switch (option) {
      case 1:
        this.router.navigate([`${this.basePath}/listadoconvenios`]);
        break;
      case 2:
        this.router.navigate([`${this.basePath}/listadocontratos`]);
        break;
      case 3:
        this.router.navigate([`${this.basePath}/gestioncontrato`]);
        break;
      default:
        this.router.navigate([`${this.basePath}/listadoconvenios`]);
        break;
    }
  }
}
