import { Component, OnInit } from '@angular/core';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-inicioportada',
  templateUrl: './pg-inicioportada.component.html',
  styleUrls: [
    './pg-inicioportada.component.css',
    './../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../assets/vendor/animate.css/animate.min.css',
    './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    './../../../assets/vendor/boxicons/css/boxicons.min.css',
    './../../../assets/vendor/remixicon/remixicon.css',
    './../../../assets/vendor/swiper/swiper-bundle.min.css',
    './../../../assets/css/style.css'
  ]
})
export class PgInicioportadaComponent implements OnInit {

  constructor(private js: EjecutarScript) { }

  ngOnInit() {
    this.js.CargarScriptLogin();
  }

  // Método para abrir/cerrar menú móvil
  toggleMenu(): void {
    const navLinks = document.querySelector('#header .navbar ul');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  }
}
