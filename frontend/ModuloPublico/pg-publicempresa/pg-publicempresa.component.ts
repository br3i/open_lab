import { Component } from '@angular/core';

@Component({
  selector: 'app-pg-publicbeneficiario',
  templateUrl: './pg-publicempresa.component.html',
  styleUrls: ['./pg-publicempresa.component.css', './../../../assets/vendor/fontawesome-free/css/all.min.css',
  './../../../assets/vendor/animate.css/animate.min.css'
  ,'./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css'
  ,'./../../../assets/vendor/boxicons/css/boxicons.min.css'
  ,'./../../../assets/vendor/remixicon/remixicon.css'
  ,'./../../../assets/vendor/swiper/swiper-bundle.min.css'
  ,'./../../../assets/css/style.css']
})
export class PgPublicempresaComponent {
  activeAccordionIndex: number | null = null; // Índice del acordeón activo, null significa que ninguno está activo.
}

