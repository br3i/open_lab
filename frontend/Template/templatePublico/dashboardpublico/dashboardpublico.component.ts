import { Component, OnInit } from '@angular/core';
import { EjecutarScript } from './../../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-dashboardpublico',
  templateUrl: './dashboardpublico.component.html',
  styleUrls: ['./dashboardpublico.component.css',
  './../../../../assets/vendor/fontawesome-free/css/all.min.css',
  './../../../../assets/vendor/animate.css/animate.min.css'
  ,'./../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css'
  ,'./../../../../assets/vendor/boxicons/css/boxicons.min.css'
  ,'./../../../../assets/vendor/remixicon/remixicon.css'
  ,'./../../../../assets/vendor/swiper/swiper-bundle.min.css'
  ,'./../../../../assets/css/style.css']
})
export class DashboardpublicoComponent implements OnInit {

  constructor(private js:EjecutarScript) { }
  ngOnInit() {
    this.js.CargarScriptLogin();
  }

}
