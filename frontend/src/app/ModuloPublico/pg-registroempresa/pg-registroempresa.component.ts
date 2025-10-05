import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { FuncionesCompartidasServicio } from '../../ModuloHerramientas/funcionesCompartidas.servicio';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';


interface Documento {
  emp_anexo_strnombre: string;        // Nombre del documento
  emp_anexo_strdescripcion: string;      // Descripción del documento
  emp_anexo_strruta: string;                  // Documento en base64
}

@Component({
  selector: 'app-pg-registroempresa',
  templateUrl: './pg-registroempresa.component.html',
  styleUrls: ['./pg-registroempresa.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None // Esto permite que los estilos globales afecten el componente.
})
export class PgRegistroempresaComponent implements OnInit {
  public imageSrc: string = 'assets/img/logo_empresa.png';
  public fechaActual: Date = new Date(); // Fecha actual (nunca será null)
  public empresa_strnombre: any = "";
  public strRuc: any = "";
  public strTipoEmpresa: any = 1;
  public strDireccion: any = "";
  public strActividad: any = "";
  public strCorreo1: any = "";
  public strCorreo2: any = "";
  public strCelular1: any = "";
  public strCelular2: any = "";
  public empresa_dtfechacreacion: Date | null = null;
  public idPersona: number | null = null;


  public strCedulaRepresentante: any = "";
  public strApellidosRepresentante: any = "";
  public strNombreRepresentante: any = "";
  public strCorreoRepresentante: any = "";
  public strCelularRepresentante: any = "";
  public strFoto: any = "";

  public strComentarios: any = "";
  public blAcertarTerminos: boolean = false;
  public blAcertarCarta: boolean = false;
  public blSubirFoto: boolean = false;
  public visibleNuevo: boolean = false;
  public camposEditables: boolean = false; // Inicializado en false por defecto

  public lsListadoTipoEmpresa: Array<any> = [];
  public ModalRegistroExitoso: boolean = false; // Controla la visibilidad del modal
  public ModalDonanteActivo: boolean = false;
  public ModalTipoEntidad: boolean = false;


  public ModalDocumento: boolean = false;   // Control del modal para añadir documentos
  public documentoAnexo: Documento | null = null;
  public archivoSeleccionado: File | null = null; // Archivo seleccionado

  public formGroup: FormGroup;
  public formFecha: FormGroup;

  public provincias: any[] = [];
  public cantones: any[] = [];
  public parroquias: any[] = [];

  // Elementos seleccionados
  public selectedProvincia: any = null;
  public selectedCanton: any = null;
  public selectedParroquia: any = null;

  public provinciasFiltradas: any[] = [];
  public cantonesFiltrados: any[] = [];
  public parroquiasFiltradas: any[] = [];

  public filterProvincia: string = '';
  public filterCanton: string = '';
  public filterParroquia: string = '';



  constructor(
    private serviciosWeb: ServiciosWeb,
    private servicioscentral: ServiciosWebCentral,
    private funcionescompartidas: FuncionesCompartidasServicio,
    private messageService: MessageService,
    private mensajes: Mensajes,
    private funciones: FuncionesGenerales,
    private fb: FormBuilder,
    private parametros: ParametrosConfigurablesService

  ) {
    this.formGroup = this.fb.group({
      nombreDocumento: ['', Validators.required],
      descripcionDocumento: ['']
    });

    this.formFecha = this.fb.group({
      empresa_dtfechacreacion: [null]
    });

  }

  async ngOnInit() {
   await this.ListadoTipoEmpresa();
    await this.cargarProvincias();
  }

  // Función para limpiar los campos
  limpiarCampos() {
    this.strNombreRepresentante = "";
    this.strApellidosRepresentante = "";
    this.strCorreoRepresentante = "";
    this.strCelularRepresentante = "";
    this.camposEditables = true;
  }

  async ListadoTipoEmpresa() {
    const data = await new Promise<any>(resolve => this.servicioscentral.ListadoTipoEmpresaActivos().subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsListadoTipoEmpresa = data.datos;
      console.log("DATOS ", this.lsListadoTipoEmpresa)
    }
  }

  // Limpia cantones y parroquias
  async limpiarCantonesYParroquias() {
    this.funcionescompartidas.limpiarDatos(this.selectedCanton, this.cantones, this.cantonesFiltrados);
    this.funcionescompartidas.limpiarDatos(this.selectedParroquia, this.parroquias, this.parroquiasFiltradas);
  }

  // Limpia parroquias
  async limpiarParroquias() {
    this.funcionescompartidas.limpiarDatos(this.selectedParroquia, this.parroquias, this.parroquiasFiltradas);
  }

  // Carga provincias desde el backend
  async cargarProvincias() {
    this.provincias = await this.funcionescompartidas.obtenerUbicaciones('PROVINCIAS');
    this.provinciasFiltradas = [...this.provincias];
  }

  

  // Carga cantones según la provincia seleccionada
  async cargarCantones() {
    if (!this.selectedProvincia) {
      await this.limpiarCantonesYParroquias();
      return;
    }
    this.cantones = await this.funcionescompartidas.obtenerUbicaciones(
      'CANTONES',
      this.selectedProvincia.ouidubicacion
    );
    this.cantonesFiltrados = [...this.cantones];
    this.selectedCanton = null;
    this.selectedParroquia = null;
    await this.limpiarParroquias();
  }

  // Carga parroquias según el cantón seleccionado
  async cargarParroquias() {
    if (!this.selectedCanton) {
      await this.limpiarParroquias();
      return;
    }
    this.parroquias = await this.funcionescompartidas.obtenerUbicaciones(
      'PARROQUIAS',
      this.selectedCanton.ouidubicacion
    );
    this.parroquiasFiltradas = [...this.parroquias];
    this.selectedParroquia = null;
  }

  // Manejo del cambio de provincia
  async onProvinciaChange() {
    if (!this.selectedProvincia) {
      await this.limpiarCantonesYParroquias();
    } else {
      await this.cargarCantones();
    }
  }

  // Limpieza de provincia
  async onProvinciaClear() {
    this.selectedProvincia = null;
    await this.limpiarCantonesYParroquias();
  }

  // Manejo del cambio de cantón
  async onCantonChange() {
    if (!this.selectedCanton) {
      await this.limpiarParroquias();
    } else {
      await this.cargarParroquias();
    }
  }

  // Limpieza de cantón
  async onCantonClear() {
    this.selectedCanton = null;
    await this.limpiarParroquias();
  }

  // Filtrar provincias dinámicamente
  filtrarProvincias(event: any) {
    this.provinciasFiltradas = this.funcionescompartidas.filtrarLista(
      this.provincias,
      event.query,
      'oustrnombre'
    );
  }

  // Filtrar cantones dinámicamente
  filtrarCantones(event: any) {
    this.cantonesFiltrados = this.funcionescompartidas.filtrarLista(
      this.cantones,
      event.query,
      'oustrnombre'
    );
  }

  // Filtrar parroquias dinámicamente
  filtrarParroquias(event: any) {
    this.parroquiasFiltradas = this.funcionescompartidas.filtrarLista(
      this.parroquias,
      event.query,
      'oustrnombre'
    );
  }

  onBasicUploadAuto(event: any) {
    const file: File = event.files[0];
    if (file) {
      this.messageService.add({ severity: 'success', summary: 'Información', detail: this.mensajes.FotoExito });
      this.convertToBase64Foto(file);
    }
  }

  convertToBase64Foto(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      this.strFoto = reader.result as string;
      this.blSubirFoto = true;
    };

    reader.readAsDataURL(file);
  }

  // Mostrar el modal para subir un documento
  mostrarModalAgregarDocumento(): void {
    this.ModalDocumento = true;
    this.archivoSeleccionado = null;
    this.formGroup.reset(); // Resetea el formulario
  }

  async validarRuc() {
    // Validar si la cédula está vacía
    if (!this.strRuc) {
      this.messageService.add({ severity: 'warn', summary: 'Información', detail: this.mensajes.IngreseRUC });
      return;
    }

    // Validar la estructura del RUC (Frontend)
    if (!this.funciones.validarRuc(this.strRuc)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RUCInvalido });
      return;
    }

    // No hay try/catch aquí, errores serán manejados en los suscriptores

    // Verifiar si la entidad es una empresa o fundación
    const data = await new Promise<any>(resolve =>
      this.servicioscentral.ObtenerEmpresaDadoRuc(this.strRuc).subscribe(
        translated => resolve(translated),
        error => {
          console.error('Error al buscar la empresa:', error);
          resolve(null); // o manejar error según sea necesario
        }
      )
    );

    if (!data) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en encontrar el RUC'
      });
      return;
    }
    const idTipoEntidad = this.parametros.tiposEntidad.EMPRESA;
    const dataEmpresa = data.datos[0];

    if (dataEmpresa.ouidtipoentidad == idTipoEntidad) {
      // Llamar al backend para verificar si la empresa ya tiene una solicitud aceptada
      const idTipoSolicitud = this.parametros.tiposSolicitud.ACEPTADO;

      const response = await new Promise<any>((resolve) =>
        this.servicioscentral.ObtenerEmpresaRucSolicitudActivo(this.strRuc, idTipoEntidad, idTipoSolicitud)
          .subscribe({
            next: resolve,
            error: (error) => {
              console.error("Error en obtener la empresa con el Ruc:", error);
              resolve(null);
            }
          })
      );

      if (response?.datos && response.datos.length > 0) {
        const empresa = response.datos[0];
        this.empresa_strnombre = empresa.ouempresa_strnombre || "";
        this.ModalDonanteActivo = true;
      }

    } else {
      if (dataEmpresa.ouidtipoentidad == this.parametros.tiposEntidad.EMPRESA) {
        this.empresa_strnombre = dataEmpresa.ouempresa_strnombre || "";
        this.ModalTipoEntidad = true;
      }
    }
  }


  validarCamposEmpresa(): string[] {
    const errores: string[] = [];

    //Validar ingreso del ruc
    if (!this.strRuc) {
      errores.push(this.mensajes.IngreseRUC);
    } else if (!this.funciones.validarRuc(this.strRuc)) {
      errores.push(this.mensajes.RUCInvalido);
    }
    // Validar la estructura de la cédula (Frontend)
    if (!this.strCedulaRepresentante) {
      errores.push(this.mensajes.IngreseCedula);
    } else if (!this.funciones.validarCedula(this.strCedulaRepresentante)) {
      errores.push(this.mensajes.CedulaInvalida);
    }

    if (!this.empresa_strnombre) {
      errores.push(this.mensajes.IngreseNombreEmpresa);
    }

    if (!this.strCelular1) {
      errores.push(this.mensajes.IngreseCelular);
    }

    if (!this.strCorreo1) {
      errores.push(this.mensajes.IngreseCorreo);
    }

    if (!this.strActividad) {
      errores.push(this.mensajes.IngresarActividad);
    }

    if (!this.selectedProvincia) {
      errores.push(this.mensajes.SelecionarProvincia);
    }

    if (!this.selectedCanton) {
      errores.push(this.mensajes.SelecionarCanton);
    }

    if (!this.strDireccion) {
      errores.push(this.mensajes.IngreseDireccion);
    }

    // Validación de datos del representante legal

    if (!this.strNombreRepresentante) {
      errores.push(this.mensajes.IngreseNombresRepresentante);
    }

    if (!this.strApellidosRepresentante) {
      errores.push(this.mensajes.IngreseApellidosRepresentante);
    }

    if (!this.strCorreoRepresentante) {
      errores.push(this.mensajes.IngreseCorreoRepresentante);
    }

    if (!this.strCelularRepresentante) {
      errores.push(this.mensajes.IngreseCelularRepresentante);
    }

    // Validación de aceptación de términos
    if (!this.blAcertarTerminos) {
      errores.push(this.mensajes.AceptarTerminos);
    }

    if (!this.blAcertarCarta) {
      errores.push(this.mensajes.AceptarCarta);
    }

    return errores;
  }

  async validarCedulaBuscarPersona() {
    // Validar si la cédula está vacía
    if (!this.strCedulaRepresentante) {
      this.limpiarCampos();
      this.messageService.add({ severity: 'warn', summary: 'Información', detail: this.mensajes.IngreseCedula });
      return;
    }

    // Validar la estructura de la cédula (Frontend)
    if (!this.funciones.validarCedula(this.strCedulaRepresentante)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.CedulaInvalida });
      return;
    }

    try {
      // Llamar al backend para verificar si la persona existe
      const response = await new Promise<any>(resolve => this.serviciosWeb.ObtenerPersonaCedula(this.strCedulaRepresentante).subscribe(translated => { resolve(translated) }));

      if (response?.datos && response.datos.length > 0) {
        // Persona encontrada
        const persona = response.datos[0];

        this.strNombreRepresentante = persona.nombres || "";
        this.strApellidosRepresentante = persona.apellidos || "";
        this.strCorreoRepresentante = persona.correo1 || "";
        this.strCelularRepresentante = persona.celular1 || "";

        this.messageService.add({
          severity: 'success',
          summary: 'Información',
          detail: 'Cédula encontrada, datos cargados correctamente.'
        });

        this.camposEditables = false;
      } else {
        // Persona no encontrada
        this.limpiarCampos();

        this.messageService.add({
          severity: 'info',
          summary: 'Información',
          detail: 'Cédula no encontrada, por favor ingrese los datos manualmente.'
        });

        this.camposEditables = true;
      }

    } catch (error) {
      console.error('Error al buscar persona:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en el registro del representante legal'
      });
    }
  }

  async RegistrarEmpresa() {

    const errores = this.validarCamposEmpresa();
    if (errores.length > 0) {
      // Mostrar todos los errores al usuario
      errores.forEach(error => {
        this.messageService.add({ severity: 'warn', summary: 'Error de validación', detail: error });
      });
      return; 
    }

    // Construcción del objeto para el backend
    const objPersona = {
      idpersona: this.idPersona || null, // Se puede usar el ID si ya está disponible
      documento: this.strCedulaRepresentante,
      nombres: this.strNombreRepresentante,
      apellidos: this.strApellidosRepresentante,
      correo1: this.strCorreoRepresentante,
      celular1: this.strCelularRepresentante,
      "correo2": "0",
      "celular2": "0",
      "direccion": "Sin dirección",
      "edad": 0,
      "sexo": 0,
      "idestadocivil": 1,
      "idetnia": 1,
      "estado": null,
      "fecharegistro": null,
      "tipodocumento": 1,
      "strtiponombre": "CÉDULA",

    };

    const objEmpresa = {
      idempresa: null,
      idtipoempresa: this.strTipoEmpresa,
      empresa_strnombre: this.empresa_strnombre,
      empresa_dtfechacreacion: this.formFecha.value.empresa_dtfechacreacion || new Date('1900-01-01'),
      idubicacion: this.selectedParroquia?.ouidubicacion || this.selectedCanton?.ouidubicacion,
      empresa_strdireccion: this.strDireccion,
      empresa_stractividad: this.strActividad,
      empresa_strfoto: this.strFoto,
      empresa_strcorreo1: this.strCorreo1,
      empresa_strcorreo2: this.strCorreo2,
      empresa_strcelular1: this.strCelular1,
      empresa_strcelular2: this.strCelular2,
      idPersona: this.idPersona,
      empresa_blestado: null,
      fecharegistro: null,
      strruc: this.strRuc,
      tipodocumento: null,
      strtiponombre: null,
      idtipoentidad: this.parametros.tiposEntidad.EMPRESA
    };

    const objEmpresaAnexo = {
      emp_anexo_strnombre: this.documentoAnexo?.emp_anexo_strnombre,
      emp_anexo_strdescripcion: this.documentoAnexo?.emp_anexo_strdescripcion,
      emp_anexo_strruta: this.documentoAnexo?.emp_anexo_strruta,
    };

    const objSolicitud = {
      idtiposolicitud: this.parametros.tiposSolicitud.PENDIENTE,
      solicitud_strdescripcion: this.strComentarios,
    };

    const content = {
      objPersona,
      objEmpresa,
      objEmpresaAnexo,
      objSolicitud,
    };

    try {
      const dataEmpresa = await firstValueFrom(this.servicioscentral.IngresoEmpresa(content));
      if (dataEmpresa.success) {
        this.messageService.add({ severity: 'success', summary: 'Información', detail: this.mensajes.RegistroExitoso });
        this.ModalRegistroExitoso = true;

      } else {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: dataEmpresa.mensaje });
      }
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
    }
  }

  reiniciarFormulario(modal: string) {

    switch (modal) {
      case 'RegistroExitoso':
        this.ModalRegistroExitoso = false;
        break;
      case 'ModalDonanteActivo':
        this.ModalDonanteActivo = false;
        break;
      case 'ModalTipoEntidad':
        this.ModalTipoEntidad = false;
        break;
      default:
        console.warn(`No se reconoce el modal: ${modal}`);
    }

    // Reinicia las variables del formulario
    this.strTipoEmpresa = null;
    this.empresa_strnombre = '';
    this.empresa_dtfechacreacion = null;
    this.selectedParroquia = null;
    this.selectedCanton = null;
    this.selectedProvincia = null;
    this.strDireccion = '';
    this.strActividad = '';
    this.strFoto = '';
    this.strCorreo1 = '';
    this.strCorreo2 = '';
    this.strCelular1 = '';
    this.strCelular2 = '';
    this.idPersona = null;
    this.strRuc = '';
    this.strCedulaRepresentante = '';
    this.strNombreRepresentante = '';
    this.strApellidosRepresentante = '';
    this.strCorreoRepresentante = '';
    this.strCelularRepresentante = '';
    this.blAcertarTerminos = false;
    this.blAcertarCarta = false;
    this.documentoAnexo = null;
    this.strComentarios = '';
  }

  // Evento para activar el selector al hacer clic
  activarSelector(): void {
    const inputElement = document.getElementById('archivo') as HTMLInputElement;
    inputElement?.click();
  }

  // Evento para manejar el archivo cuando se suelta
  manejarArchivo(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const archivo = event.dataTransfer.files[0]; // Obtiene el archivo
      this.seleccionarArchivo({ target: { files: [archivo] } });
    }
  }

  // Evento para permitir el arrastre
  permitirDrop(event: DragEvent): void {
    event.preventDefault();
  }

  // Seleccionar archivo desde el input
  seleccionarArchivo(event: any): void {
    const archivo = event.target.files[0]; // Obtiene solo el primer archivo seleccionado
    const tipoPermitido = 'application/pdf'; // Tipo MIME permitido
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (archivo) {
      // Validar el tipo de archivo
      if (archivo.type !== tipoPermitido) {
        this.archivoSeleccionado = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Tipo de documento no permitido',
          detail: 'Por favor, selecciona un documento en formato PDF.',
        });
        console.warn('Tipo de documento no permitido:', archivo.type);
        return;
      }

      // Validar el tamaño del archivo
      if (archivo.size > MAX_FILE_SIZE) {
        this.archivoSeleccionado = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Documento demasiado grande',
          detail: 'El documento debe tener un tamaño máximo de 5 MB.',
        });
        console.warn('El documento excede el tamaño máximo permitido:', archivo.size);
        return;
      }

      // Asignar el archivo si pasa las validaciones
      this.archivoSeleccionado = archivo;
      this.messageService.add({
        severity: 'success',
        summary: 'Documento válido',
        detail: 'El documento se ha subido correctamente.',
      });
    } else {
      this.archivoSeleccionado = null;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un documento.',
      });
      console.warn('No se seleccionaron documentos.');
    }
  }

  // Convertir documento a Base64
  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1];

      if (!base64Data || base64Data.length === 0) {
        console.error('Error: Documento Base64 vacío o corrupto');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El documento PDF no pudo ser procesado correctamente.',
        });
        return;
      }

      // Decodificar Base64 y validar encabezado
      const base64Decoded = atob(base64Data);
      if (!base64Decoded.startsWith('%PDF-')) {
        console.error('El documento PDF no tiene un encabezado válido.');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El documento PDF no es válido o está corrupto.',
        });
        return;
      }

      // Asignar el documento con valores predeterminados si faltan
      this.documentoAnexo = {
        emp_anexo_strnombre: this.formGroup.get('nombreDocumento')?.value || this.archivoSeleccionado?.name,
        emp_anexo_strdescripcion:
          this.formGroup.get('descripcionDocumento')?.value || 'SIN DESCRIPCIÓN',
        emp_anexo_strruta: base64Data,
      };


      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Documento convertido correctamente a Base64.',
      });

      // Cerrar el modal después de agregar el Documento
      this.ModalDocumento = false;
    };

    reader.onerror = (error) => {
      console.error('Error al convertir el documento a Base64:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo convertir el documento a Base64.',
      });
    };

    reader.readAsDataURL(file); // Inicia la conversión
  }

  // Método para agregar el documento
  agregarDocumento(): void {
    if (!this.archivoSeleccionado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un documento válido.',
      });
      return;
    }

    // Convertir a Base64 y agregar el documento
    this.convertToBase64(this.archivoSeleccionado);

    this.messageService.add({
      severity: 'success',
      summary: 'Documento agregado',
      detail: 'El documento ha sido agregado correctamente.',
    });
  }

  // Método para visualizar el documento en una nueva pestaña
  visualizarDocumento(): void {
    if (!this.documentoAnexo || !this.documentoAnexo.emp_anexo_strruta) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay ningún documento cargado para visualizar.',
      });
      return;
    }

    try {
      // Crear un Blob a partir de los datos base64 decodificados
      const byteCharacters = atob(this.documentoAnexo.emp_anexo_strruta); // Decodificar Base64
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Generar una URL para el Blob
      const pdfURL = URL.createObjectURL(blob);

      // Abrir el PDF en una nueva ventana o en un iframe
      const nuevaVentana = window.open('', '_blank');
      if (nuevaVentana) {
        nuevaVentana.document.write(`
          <html>
            <head>
              <title>Visualizar PDF</title>
            </head>
            <body style="margin: 0; padding: 0;">
              <iframe 
                src="${pdfURL}" 
                width="100%" 
                height="100%" 
                style="border: none; overflow: auto;">
              </iframe>
            </body>
          </html>
        `);
        nuevaVentana.document.close();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo abrir la nueva ventana para visualizar el PDF.',
        });
      }
    } catch (error) {
      console.error('Error al intentar visualizar el PDF:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo visualizar el documento PDF.',
      });
    }
  }

  // Eliminar el documento
  eliminarDocumento(): void {
    if (!this.documentoAnexo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay ningún documento para eliminar.',
      });
      return;
    }

    this.documentoAnexo = null; 
    this.archivoSeleccionado = null;  

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Documento eliminado correctamente.',
    });
  }

  cerrarModal(modal: string) {
    switch (modal) {
      case 'modalDocumento':
        this.ModalDocumento = false;
        break;

      // Agregar más casos para otros modales que quieras manejar
      default:
        console.warn(`No se reconoce el modal: ${modal}`);
    }
  }

} 