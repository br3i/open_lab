import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Router } from '@angular/router';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-pg-convenio',
  templateUrl: './pg-convenio.component.html',
  styleUrls: ['./pg-convenio.component.css'],
  providers: [MessageService, ConfirmationService],
  styles: [
    `:host ::ng-deep .p-dialog .convenio-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }`
  ]
})

export class PgConvenioComponent implements OnInit {
  public convenioDialog: boolean = false;
  public listadoconvenios: any = [];
  public convenio_strdescripcion: any = "";
  public convenio_blestado: any = "";
  public visibleEstado: boolean = false;
  public visibleEditar: boolean = false;
  public objSeleccion: any = "-1";
  public datosConvenio: any = "";
  public convenio: any;
  public selectedConvenios: any[] | null = null;
  public submitted: boolean = false;
  public ListadoTiposDonantes: any = [];
  public donanteDialog: boolean = false;
  public tiposDonante: any[] = [];
  public selectedTipoDonante: any = null;
  public listadoConvenioFiltrado: any = [];

  public personaNatural = this.parametros.tiposDonante.NATURAL;
  public personaJuridica = this.parametros.tiposDonante.JURIDICO;
  public idCargo = this.parametros.tipoCargo.REPRESENTANTE_LEGAL;
  public visibleInformacionConvenio: boolean = false;
  public datosCargando = false;

  public strArchivoreporte64: any = "";
  visiblepdfContrato: boolean = false;

  constructor(
    private serviciosCentral: ServiciosWebCentral,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private parametros: ParametrosConfigurablesService,
    private serviciosWeb: ServiciosWeb,
    private sanitizer: DomSanitizer,
    private funciones: FuncionesGenerales

  ) { }

  async ngOnInit() {
    await this.ListadoTiposDonante();
    if (this.ListadoTiposDonantes.length > 0) {
      this.selectedTipoDonante = this.ListadoTiposDonantes[0]; // Seleccionar el segundo registro por defecto
      this.CargarConvenios(); // Cargar convenios del tipo seleccionado
    }
  }

  async ListadoTiposDonante() {
    try {
      const data = await new Promise<any>((resolve) => this.serviciosCentral.ListadoTipoEmpresaActivos().subscribe(translated => { resolve(translated) }));

      if (data.success) {
        this.ListadoTiposDonantes = [{ idtipoempresa: 0, strnombretipo: 'TODOS' }, ...data.datos];
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de tipos de donante.' });
      }
    } catch (error) {
      console.error('Error al listar tipos de donante', error);
    }
  }

  async CargarConvenios() {

    this.datosCargando = true;
    this.listadoconvenios = [];
    this.listadoConvenioFiltrado = [];

    if (!this.selectedTipoDonante) {
      this.listadoconvenios = [];
      return;
    }
    const idTipoDonante = Number(this.selectedTipoDonante.idtipoempresa);

    try {
      let data;
      // Listar todos los convenios
      if (idTipoDonante === 0) {
        data = await new Promise<any>((resolve) => this.serviciosCentral.ListadoConvenioTodos().subscribe(resolve));
      } else {
        data = await new Promise<any>((resolve) => this.serviciosCentral.ListadoConvenioDadoIdTipoDonnate(idTipoDonante).subscribe(resolve));
      }

      if (!data.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de convenios.',
        });
        return;
      }

      // Procesar cada convenio según su tipo de donante
      this.listadoconvenios = await Promise.all(
        data.datos.map(async (convenio: any) => {
          let tipoDonanteId = convenio.ouconvenio_idtipodonante;

          // Persona natural
          if (tipoDonanteId === this.personaNatural) {
            const personaData = await new Promise<any>((resolve) =>
              this.serviciosWeb.ObtenerPersonaId(convenio.ouconvenio_iddonante).subscribe(resolve)
            );

            if (personaData.success && personaData.datos.length > 0) {
              convenio.representante = personaData.datos[0];
              convenio.empresa = null; // No aplica
            } else {
              convenio.representante = null;
              convenio.empresa = null;
            }
          }

          // Persona jurídica
          else if (tipoDonanteId === this.personaJuridica) {
            const empresaData = await new Promise<any>((resolve) =>
              this.serviciosCentral.ObtenerEmpresaDadoId(convenio.ouconvenio_iddonante).subscribe(resolve)
            );

            const representanteData = await new Promise<any>((resolve) =>
              this.serviciosCentral
                .ObtenerRepresentanteEmpresa(convenio.ouconvenio_idcoordinadordon, convenio.ouconvenio_iddonante, this.idCargo)
                .subscribe(resolve)
            );

            if (empresaData.success && empresaData.datos.length > 0) {
              convenio.empresa = empresaData.datos[0];
            } else {
              convenio.empresa = null;
            }

            if (representanteData.success && representanteData.datos.length > 0) {
              convenio.representante = representanteData.datos[0];
            } else {
              convenio.representante = null;
            }
          }

          return convenio;
        })
      );

      this.listadoConvenioFiltrado = [...this.listadoconvenios];
      this.datosCargando = false;
    } catch (error) {
      console.error('Error al cargar convenios', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los convenios.',
      });
    }
  }

  filtrarConvenio(event: any) {
    const query = event.target.value.toLowerCase();

    this.listadoConvenioFiltrado = this.listadoconvenios
      .filter((convenio: any) => {
        const representante = convenio.representante || {};
        const empresa = convenio.empresa || {};

        const nombreCompleto = `${representante.nombres || representante.ourepresentante_nombres || ''} ${representante.apellidos || representante.ourepresentante_apellidos || ''}`.toLowerCase();
        const cedula = (representante.documento || representante.ourepresentante_cedula || '').toLowerCase();
        const nombreEmpresa = (empresa.empresa_strnombre || '').toLowerCase();
        const ruc = (empresa.empresa_strdocumento || '').toLowerCase();

        return (
          nombreCompleto.includes(query) ||
          cedula.includes(query) ||
          nombreEmpresa.includes(query) ||
          ruc.includes(query)
        );
      })
      .sort((a: any, b: any) => {
        const repA = a.representante || {};
        const repB = b.representante || {};

        const nombreA = `${repA.nombres || repA.ourepresentante_nombres || ''} ${repA.apellidos || repA.ourepresentante_apellidos || ''}`.toLowerCase();
        const nombreB = `${repB.nombres || repB.ourepresentante_nombres || ''} ${repB.apellidos || repB.ourepresentante_apellidos || ''}`.toLowerCase();

        return nombreA.localeCompare(nombreB);
      });
  }


  RedireccionarFormulario() {
    if (this.selectedTipoDonante) {
      const idTipoDonante = this.selectedTipoDonante.idtipodonante;

      // Redirige según el tipo de donante
      this.router.navigate(['/dashadmin/principalconvenio/convenionuevo'], {
        queryParams: { idTipoDonante: idTipoDonante },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar un tipo de donante antes de continuar.',
      });
    }
  }

  ModalCambiarEstado(seleccion: any) {
    this.objSeleccion = seleccion;
    this.convenio_blestado = this.objSeleccion.ouconvenio_blestado ? "Desactivar" : "Activar";
    this.visibleEstado = true;
  }

  CerrarModal(modal: string) {
    if (modal === 'ModalTipoDonante') {
      this.donanteDialog = false;
    } else if (modal === 'ModalInformacion') {
      this.visibleInformacionConvenio = false;
    }
  }

  EditarConvenio(seleccion: any) {
    this.datosConvenio = seleccion;
    sessionStorage.setItem('convenioSelecionado', JSON.stringify(this.datosConvenio));
    this.router.navigate(['/dashadmin/principalconvenio/convenioeditar']);
  }

  async SelecionarConvenio(seleccion: any) {
    this.datosConvenio = seleccion;
    this.visibleInformacionConvenio = true;
  }

  ActualizarEstadoConvenio(convenio: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el convenio "${convenio.titulo}"?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.convenio = {};
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Convenio eliminado', life: 3000 });
      }
    });
  }

  async descargarContrato(seleccion: any) {
    try {
      this.objSeleccion = seleccion;

      // 1. Obtener el contrato vinculado al convenio
      const dataConvenioContrato = await new Promise<any>(resolve =>
        this.serviciosCentral.ObtenerConvenioContratoDadoIdConv(this.objSeleccion.ouidconvenio)
          .subscribe(translated => resolve(translated))
      );
      if (dataConvenioContrato?.datos?.length > 0) {
        const contrato = dataConvenioContrato.datos[0];
        const idContrato = contrato.ouconv_cont_idcontrato;

        let contenido = {
          objDatosConveioEmpresa: {
            idContrato: idContrato,
            objConvenioEmpresa: {
              ...this.objSeleccion
            }
          }
        };

        // 2. Generar el PDF del contrato
        const dataConvenio = await new Promise<any>(resolve =>
          this.serviciosCentral.GenerarpdfContrato(contenido)
            .subscribe(translated => resolve(translated))
        );

        console.log("DATOS VONVENIO", contenido)
        // Validación de error en backend
        if (dataConvenio.datos === "ERROR") {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo generar la previsualización del contrato, error en el servidor.'
          });
          console.error("El servidor devolvió un error al generar el PDF:", dataConvenio);
          return;
        }

        // 3. Validar si el PDF base64 viene como objeto
        const base64Pdf = dataConvenio?.datos?.pdf;

        if (typeof base64Pdf !== 'string') {
          console.error('El PDF base64 no es una cadena válida.');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El archivo PDF recibido no es válido.'
          });
          return;
        }

        // 4. Convertir y mostrar el PDF
        const blob = await this.funciones.converBase64toBlob(base64Pdf, 'application/pdf');
        this.strArchivoreporte64 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        this.visiblepdfContrato = true;

      } else {
        console.warn("No se encontró contrato en los datos.");
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se encontró contrato asociado al convenio seleccionado.'
        });
      }

    } catch (error) {
      console.error('Error en descargarContrato:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al intentar generar la previsualización del contrato.'
      });
    }
  }


}
