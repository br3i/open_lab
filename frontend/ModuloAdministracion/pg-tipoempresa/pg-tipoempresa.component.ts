import { Component, OnInit } from '@angular/core';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-pg-tipoempresa',
  templateUrl: './pg-tipoempresa.component.html',
  styleUrls: ['./pg-tipoempresa.component.css'],
  providers: [MessageService]
})
export class PgTipoempresaComponent implements OnInit {

  lsListado: any = [];
  objSeleccion: any = "-1";
  strNombre: any = "";
  strEstado: any = "";
  visibleEditar: boolean = false;
  visibleEstado: boolean = false;
  visibleNuevo: boolean = false;
  selectedSize: any = 'p-datatable-sm';
  constructor
    (
      private servicios: ServiciosWebCentral,
      private messageService: MessageService,
      private mensajes: Mensajes
    ) { }
  async ngOnInit() {
    await this.ListadoInformacion();
  }

  ModalNuevoInformacion() {
    this.strNombre = "";
    this.visibleNuevo = true;
  }
  ModalEditarInformacion(seleccion: any) {
    this.objSeleccion = seleccion;
    this.visibleEditar = true;
  }
  ModalCambiarEstado(seleccion: any) {
    this.objSeleccion = seleccion;
    if (this.objSeleccion.ouestadotipo) {
      this.strEstado = "Desactivar";
    } else {
      this.strEstado = "Activar";
    }
    this.visibleEstado = true;
  }
  async ListadoInformacion() {

    const data = await new Promise<any>(resolve => this.servicios.ListadoTipoEmpresa().subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsListado = data.datos.sort((a: any, b: any) => {
        return b.ouestadotipo - a.ouestadotipo;
      })
    }
  }

  async RegistrarNuevo() {
    if (this.strNombre != "") {
      const data = await new Promise<any>(resolve => this.servicios.NuevoTipoEmpresa(this.strNombre).subscribe(translated => { resolve(translated) }));

      if (data.success) {
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
        this.visibleNuevo = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre });
    }
  }
  async RegistrarActualizacion() {
    if (this.objSeleccion.oustrnombretipo != "") {
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionTipoEmpresa(this.objSeleccion.ouidtipoempresa, this.objSeleccion.oustrnombretipo).subscribe(translated => { resolve(translated) }));

      if (data.success) {
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEditar = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre });
    }
  }
  async EstadoCambiarActualizacion() {
    var estado: any;
    if (this.objSeleccion.ouestadotipo) {
      estado = false;
    } else {
      estado = true;
    }
    const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarTipoEmpresa(this.objSeleccion.ouidtipoempresa, estado).subscribe(translated => { resolve(translated) }));
    if (data.success) {
      await this.ListadoInformacion();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
      this.visibleEstado = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
    }
  }
}
