import { Component, OnInit } from '@angular/core';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';

@Component({
  selector: 'app-pg-contrato',
  templateUrl: './pg-contrato.component.html',
  styleUrls: ['./pg-contrato.component.css'],
  providers: [MessageService]
})

export class PgContratoComponent implements OnInit {

  public lsListado: any = [];
  public objSeleccion: any = "-1";
  public contrato_strTitulo: any = "";
  public contrato_blEstado: any = "";
  public intiddisponibilidad: any;
  public visibleEstado: boolean = false;
  public selectedSize: any = 'p-datatable-sm';
  public strArchivoreporte64: any = "";
  public visiblepdfContrato: boolean = false;
public contratoSeleccionado: any = {};
public visibleDetalleContrato: boolean = false;
public  strEstado:any="";


  constructor
    (
      private servicios: ServiciosWebCentral,
      private messageService: MessageService,
      private mensajes: Mensajes,
      private sanitizer: DomSanitizer,
      private funciones: FuncionesGenerales

    ) { }

  async ngOnInit() {
    await this.ListadoInformacion();
  }

  ModalCambiarEstado(seleccion: any) {
    this.objSeleccion = seleccion;
    if (this.objSeleccion.oucontrato_blestado) {
      this.contrato_blEstado = "Desactivar";
    } else {
      this.contrato_blEstado = "Activar";
    }
    this.visibleEstado = true;
  }

visualizarContrato(contrato: any) {
  this.contratoSeleccionado = contrato;
  this.visibleDetalleContrato = true;
}

  async ListadoInformacion() {

    const data = await new Promise<any>(resolve => this.servicios.ListadoContratoTodos().subscribe(translated => { resolve(translated) }));
   

    if (data.success) {
      this.lsListado = data.datos;
    }
  }
CerrarModal(modal: string) {
  if (modal === 'ModalDetalleContrato') {
    this.visibleDetalleContrato = false;
  }
}

  async EstadoCambiarActualizacion() {
    var estado: any;
    if (this.objSeleccion.oucontrato_blestado) {
      estado = false;
    } else {
      estado = true;
    }
    
    const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarContrato(this.objSeleccion.ouidcontrato, estado).subscribe(translated => { resolve(translated) }));
   
    if (data.success) {
      await this.ListadoInformacion();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
      this.visibleEstado = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
    }
  }

  //FUNCION PARA PREVISUALIZAR CONTRATO CONtrato
  async descargarContrato(seleccion: any) {

    try {
      this.objSeleccion = seleccion;
      const data = await new Promise<any>(resolve => this.servicios.ObtenerpdfEstructuraContrato(this.objSeleccion.ouidcontrato).subscribe(translated => { resolve(translated) }));
     
      // Verificar si la respuesta del servidor contiene un error
      if (data.datos === "ERROR") {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo generar la previsualización del contrato, error en el servidor.' });
        console.error("El servidor devolvió un error al generar el PDF:", data);
        return;
      }
      // Generación del PDF fue exitosa

      if (data.success) {
        const blob = await this.funciones.converBase64toBlob(data.datos.pdf, 'application/pdf');
        this.strArchivoreporte64 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        this.visiblepdfContrato = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo generar la previsualización del contrato.' });
      }
    } catch (error) {
      console.error('Error en previsualizarContrato:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar generar la previsualización.' });
    }
  }

}
