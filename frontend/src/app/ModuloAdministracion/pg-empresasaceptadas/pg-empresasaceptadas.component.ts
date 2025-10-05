import { Component, OnInit } from '@angular/core';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { FuncionesCompartidasServicio } from '../../ModuloHerramientas/funcionesCompartidas.servicio';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface EmpresaAceptada {
  ousolicitud_blestado: boolean;
  ousolicitud_dtfechamodificacion: string;
}


@Component({
  selector: 'app-pg-empresasaceptadas',
  templateUrl: './pg-empresasaceptadas.component.html',
  styleUrls: ['./pg-empresasaceptadas.component.css'],
  providers: [MessageService]
})
export class PgempresaaceptadaComponent implements OnInit {

  
  public solicitud_blestado: any = "";
  public solicitud_strdescripcion: any = "";
  public solicitud_strcita: any = "";
  public visibleEstado: boolean = false;
  public lsListado: any = [];
  public lsListadoFiltrado: any = []; 
  public visibleAceptar: boolean = false;
  public visibleRechazar: boolean = false;
  public visibleNuevo: boolean = false;
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
  public selectedSize: any = 'p-datatable-sm';
  public strArchivoreporte64: any = "";
  public visiblepdfAnexo: boolean = false;
  public visibleEnviarMensaje: boolean = false;
  public idCargo = this.parametros.tipoCargo.REPRESENTANTE_LEGAL;

  public mensajeForm: any = {
    asunto: '',
    cuerpo: '',
  }; 
  
  constructor
    (
      private servicios: ServiciosWebCentral,
      private messageService: MessageService,
      private mensajes: Mensajes,
      private funcionescompartidas: FuncionesCompartidasServicio,
      private parametros: ParametrosConfigurablesService,
      private sanitizer: DomSanitizer,
      private funciones: FuncionesGenerales,
      private router: Router
    ) { }
  async ngOnInit() {
    await this.ListadoInformacion();
  }

  ModalCambiarEstado(seleccion: any) {
    this.objSeleccion = seleccion;
    if (this.objSeleccion.ousolicitud_blestado) {
      this.solicitud_blestado = "Desactivar";
    } else {
      this.solicitud_blestado = "Activar";
    }
    this.visibleEstado = true;
  }

  async ListadoInformacion() {
    const idTipoSolicitud = this.parametros.tiposSolicitud.ACEPTADO; // Ejemplo: Solicitud de donación
    const idTipoEntidad = this.parametros.tiposEntidad.EMPRESA;
    const data = await new Promise<any>(resolve => this.servicios.ListadoSolicitudEmpresas(idTipoSolicitud, idTipoEntidad).subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsListado = data.datos.sort((a: EmpresaAceptada, b: EmpresaAceptada) => {
        // Prioriza los registros con estado activo
        if (a.ousolicitud_blestado !== b.ousolicitud_blestado) {
          return a.ousolicitud_blestado ? -1 : 1; // true (activo) primero
        }

        // Luego ordena por fecha de modificación (más reciente primero)
        const fechaA = new Date(a.ousolicitud_dtfechamodificacion).getTime();
        const fechaB = new Date(b.ousolicitud_dtfechamodificacion).getTime();
        return fechaB - fechaA;
      });
      this.lsListadoFiltrado = [...this.lsListado];

    }
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
console.log("DATOS DE DETALLE EMPRES",seleccion)

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

  EditarEmpresa(seleccion: any) {

    this.datosEmpresa = {
      ouidempresa: seleccion.ouidempresa,
      ouidrepresentante: seleccion.ouidrepresentante
    };

    sessionStorage.setItem('empresaSelecionada', JSON.stringify(this.datosEmpresa));
    this.router.navigate(['/dashadmin/principalempresa/empresaeditar']);
  }

  CerrarModal(modal: string) {
    if (modal === 'ModalDetalle') {
      this.visibleDetalle = false;
    } else if (modal === 'ModalEnviarMensaje') {
      this.visibleEnviarMensaje = false;
      this.mensajeForm = { asunto: '', cuerpo: '' }; // Reiniciar el formulario 
    }

  }

  async ActualizarEstadoEmpresa() {
    var estado: any;
    if (this.objSeleccion.ousolicitud_blestado) {
      estado = false;
    } else {
      estado = true;
    }
    const data = await new Promise<any>(resolve => this.servicios.ActualizarEstadoLogicoSolicitudEmpresa(this.objSeleccion.ouidsolicitud, estado).subscribe(translated => { resolve(translated) }));
    if (data.success) {
      await this.ListadoInformacion();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
      this.visibleEstado = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
    }
  }

  async AbrirModalEnviarMensaje(seleccion: any) {
    this.objSeleccion = seleccion;
    if (!this.objSeleccion?.ouidempresa || !this.objSeleccion?.ouidrepresentante) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar un registro válido antes de enviar un mensaje.',
      });
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

        // Verificar si existen correos para la empresa y el representante legal
        if (this.datosEmpresa?.empresa_strcorreo1 && this.datosRepresentanteEmpresa?.ourepresentante_correo) {
          // Abrir el modal si los correos están disponibles
          this.datosEmpresaForm = { ...this.datosEmpresa };
          this.datosRepresentanteForm = { ...this.datosRepresentanteEmpresa };
          this.visibleEnviarMensaje = true;
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: 'No se encontraron correos electrónicos para enviar el mensaje.',
          });
        }
      }
    } catch (error) {
      console.error('Error al obtener la información de la empresa:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al cargar los datos necesarios.',
      });
    }
  }

  async EnviarMensaje() {
    if (!this.mensajeForm.cuerpo) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El cuerpo del mensaje es obligatorio.',
      });
      return;
    }

    // Preparar datos para el backend
    const mensajeData = {
      correos: [
        this.datosEmpresaForm.empresa_strcorreo1,
        this.datosRepresentanteForm.ourepresentante_correo,
      ],
      cuerpo: this.mensajeForm.cuerpo,
      idSolicitud: this.objSeleccion.ouidsolicitud,
    };
    try {
      const response = await new Promise<any>((resolve) =>
        this.servicios.ActualizarCitaCorreoEmpresa(mensajeData).subscribe((translated) => resolve(translated))
      );

      if (response.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Mensaje enviado correctamente y la tabla actualizada.',
        });
        this.CerrarModal('ModalEnviarMensaje')
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.message || 'No se pudo enviar el mensaje.',
        });
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al enviar el mensaje o actualizar la tabla.',
      });
    }
  }

  //FUNCION PARA PREVISUALIZAR EL DOCUMENTO DE REPRESENTANTE LEGAL
  async DescargarAnexo(datosEmpresaForm: any) {
    try {
      this.objSeleccion = datosEmpresaForm;
      const data = await new Promise<any>(resolve =>
        this.servicios.ObtenerAnexoDadoIdEmpresa(this.objSeleccion.idfundacion).subscribe(translated => resolve(translated))
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