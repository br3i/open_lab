import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-inicio',
  templateUrl: './pg-inicio.component.html',
  styleUrls: ['./pg-inicio.component.css']
})
export class PgInicioComponent {

  constructor(private router: Router) {}


  navegarDonaciones() {
    this.router.navigate(['./dashadmin/principalrecepciondonacion/conveniovigente']);
  }

  // Función para navegar a Organización
  navegarReportes() {
    this.router.navigate(['./dashadmin/principalreporte/reportedonacion']);
  }

  // Función para navegar a Voluntarios
  navegarBeneficiarios() {
    this.router.navigate(['./dashadmin/principalfundacion/fundacionaceptado']);
  }

  navegarDashboardNatural(): void {
    this.router.navigate(['/dashadmin/dashboard-natural']);
  }
}
