import { Component, OnInit } from '@angular/core';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { FuncionesCompartidasServicio } from '../../ModuloHerramientas/funcionesCompartidas.servicio';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pg-empresasrechazadas',
  templateUrl: './pg-empresasrechazadas.component.html',
  styleUrls: ['./pg-empresasrechazadas.component.css'],
  providers: [MessageService]
})
export class PgempresarechazadaComponent implements OnInit {

  public empresa_blestado: any = "";
  public solicitud_strdescripcion: any = "";
  public solicitud_strcita: any = "";
  public lsListado: any = [];
  public lsListadoFiltrado: any = [];
  public visibleDetalle: boolean = false;
  public objSeleccion: any = {};
  public empresa_strdireccion: any = {};

  // Información del representante
  public strCedulaRepresentante: any = "";
  public strApellidosRepresentante: any = "";
  public strNombreRepresentante: any = "";
  public strCorreoRepresentante: any = "";
  public strCelularRepresentante: any = "";

  public datosEmpresa: any;
  public datosRepresentanteEmpresa: any;

  public datosEmpresaForm: any = {}; // Propiedad para los datos de la empresa
  public datosRepresentanteForm: any = {}; // Propiedad para los datos del representante
  public idCargo = this.parametros.tipoCargo.REPRESENTANTE_LEGAL;

  public selectedSize: any = 'p-datatable-sm';
  public strArchivoreporte64: any = "";
  public visiblepdfAnexo: boolean = false;

  constructor
    (
      private servicios: ServiciosWebCentral,
      private funcionescompartidas: FuncionesCompartidasServicio,
      private parametros: ParametrosConfigurablesService,
      private messageService: MessageService,
      private sanitizer: DomSanitizer,
      private funciones: FuncionesGenerales,
    ) { }
  async ngOnInit() {
    await this.ListadoInformacion();
  }

  async ListadoInformacion() {
    const idTipoSolicitud = this.parametros.tiposSolicitud.RECHAZADO; // Ejemplo: Solicitud de donación
    const idTipoEntidad = this.parametros.tiposEntidad.EMPRESA;
    const data = await new Promise<any>(resolve => this.servicios.ListadoSolicitudEmpresas(idTipoSolicitud, idTipoEntidad).subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsListado = data.datos.sort((a: any, b: any) => {
        return b.ouempresa_blestado - a.ouestado;
      })
    }
    this.lsListadoFiltrado = [...this.lsListado];
  }

  filtrarEmpresa(event: any) {
    const query = event.target.value.toLowerCase();
    this.lsListadoFiltrado = this.lsListado.filter((empresa: any) =>
      empresa.ouempresa_strnombre.toLowerCase().includes(query) ||
      empresa.oustrruc.toLowerCase().includes(query)
    );
  }

  async ModalDetalle(seleccion: any) {
    this.objSeleccion = seleccion;

    if (!this.objSeleccion?.ouidempresa || !this.objSeleccion?.ouidrepresentante) {
      console.error('Error al obtener la información de la empresa.');
      return;
    }

    try {
      const resultado = await this.funcionescompartidas.obtenerInformacionEmpresa(
        this.objSeleccion.ouidempresa,
        this.objSeleccion.ouidrepresentante,
        this.idCargo
      );

      if (resultado) {
        this.datosEmpresa = resultado.empresa;
        this.datosRepresentanteEmpresa = resultado.representante;

        // Asignar los valores a las propiedades del formulario
        this.datosEmpresaForm = { ...this.datosEmpresa };
        this.solicitud_strdescripcion = this.objSeleccion.ousolicitud_strdescripcion;
        this.solicitud_strcita = this.objSeleccion.ousolicitud_strcita;
        this.datosRepresentanteForm = { ...this.datosRepresentanteEmpresa };
        if (this.datosRepresentanteForm) {
          this.datosRepresentanteForm.nombreCompleto =
            `${this.datosRepresentanteForm.ourepresentante_nombres || ''} ${this.datosRepresentanteForm.ourepresentante_apellidos || ''}`.trim();
        }
      }
      const detalleUbicacion = await this.funcionescompartidas.DetalleUbicacion(this.objSeleccion.ouidubicacion);
      // Variables para Provincia, Cantón y Parroquia
      let provincia = "";
      let canton = "";
      let parroquia = "";

      if (detalleUbicacion && detalleUbicacion.length > 0) {
        detalleUbicacion.forEach((ubicacion) => {
          if (ubicacion.oustrnivel === "Provincia") {
            provincia = ubicacion.oustrnombre;
          } else if (ubicacion.oustrnivel === "Canton") {
            canton = ubicacion.oustrnombre;
          } else if (ubicacion.oustrnivel === "Parroquia") {
            parroquia = ubicacion.oustrnombre;
          }
        });
      }

      // Construcción dinámica de la dirección (evita espacios en blanco)
      let partesDireccion = [provincia, canton, parroquia, this.objSeleccion.ouempresa_strdireccion].filter(Boolean);
      const direccionCompleta = partesDireccion.join(", ");
      this.empresa_strdireccion = direccionCompleta; // Dirección adaptada a cada caso

    } catch (error) {
      console.error('Error al obtener información de la empresa:', error);
    }

    this.visibleDetalle = true;
  }


  CerrarModal(modal: string) {
    if (modal === 'ModalDetalle') {
      this.visibleDetalle = false;
    }
  }

  async DescargarAnexo(datosEmpresaForm: any) {
    try {
      this.objSeleccion = datosEmpresaForm;
      const data = await new Promise<any>(resolve =>
        this.servicios.ObtenerAnexoDadoIdEmpresa(this.objSeleccion.idempresa).subscribe(translated => resolve(translated))
      );

      if (!data || data.success !== true || !data.datos || !data.datos.length) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontró el anexo.' });
        return;
      }

      const base64Pdf = data.datos[0].ouemp_anexo_strruta;

      if (typeof base64Pdf !== 'string') {
        console.error('El PDF base64 no es una cadena.');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El archivo recibido no es válido.' });
        return;
      }
      const blob = await this.funciones.converBase64toBlob(base64Pdf, 'application/pdf');

      this.strArchivoreporte64 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      this.visiblepdfAnexo = true;

    } catch (error) {
      console.error('Error en previsualizarContrato:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar generar la previsualización.' });
    }
  }

}