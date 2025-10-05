import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';


interface Documento {
  conv_anexo_strconvenioanexo: string;        // Nombre del documento
  conv_anexo_strdescripcionanexo: string;      // Descripción del documento
  conv_anexo_strruta: string;                  // Documento en base64
}

@Component({
  selector: 'app-pg-convenioformulario',
  templateUrl: './pg-convenioformulario.component.html',
  styleUrls: ['./pg-convenioformulario.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PgConvenioFormularioComponent implements OnInit {

  public convenioForm: FormGroup;
  public formGroup: FormGroup; // Formulario reactivo
  public idTipoDonante: number | null = null; // ID del tipo de cliente recibido

  public dialogContratosVisible: boolean = false;
  public listadoContrato: any = [];
  public listadoContratoFiltrado: any = [];
  public selectedContrato: any = null;


  public dialogDonanteVisible: boolean = false;

  // Listas separadas
  public listadoEmpresas: any[] = [];
  public listadoPersonas: any[] = [];
  public listadoEmpresaFiltrado: any = [];
  public listadoPersonaFiltrado: any = [];
  public empresaSeleccionada: any = null;
  public personaSeleccionada: any = null;
  public donanteSeleccionado: any = null;

  public listadoEmpresa: any = [];
  public ListadoRepresentanteEmpresa: any = []

  public strTipoConvenio: any = 1;
  public ListadoTipoConvenio: Array<any> = [];

  public coordinadorSeleccionadoBar: any = null; // Objeto del coordinador seleccionado
  public coordinadoresFiltradosBar: Array<any> = [];
  public listaCoordinadoresBar: Array<any> = []; // Lista de todos los coordinadores

  public coordinadorSeleccionadoDonante: any = null; // Objeto del coordinador seleccionado
  public coordinadoresFiltradosDonante: Array<any> = [];
  public listaCoordinadoresDonante: Array<any> = []; // Lista de todos los coordinadores

  public mostrarModal: boolean = false;                     // Control del modal para añadir documentos
  public documentos: Documento[] = []; // Lista de documentos
  public archivoSeleccionado: File | null = null; // Archivo seleccionado

  public minDate: Date = new Date();  // Restringir fecha de inicio para evitar fechas pasadas


  public personaNatural = this.parametros.tiposDonante.NATURAL;
  public personaJuridica = this.parametros.tiposDonante.JURIDICO;

  public lsDonantePersona: any = []; // Util
  public lsDonantePersonaFiltrado: any = []; // Util


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private servicios: ServiciosWebCentral,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute, // Servicio para leer parámetros de URL
    private parametros: ParametrosConfigurablesService

  ) {
    this.convenioForm = this.fb.group({
      resolucion: [''],
      titulo: [''],
      objetivo: [''],
      fechaInicio: [''],
      fechaFin: [{ value: '', disabled: true }],
      anos: [0],
      meses: [0],
      observaciones: [''],
      coordinadorSeleccionadoBar: [null],
      coordinadorSeleccionadoDonante: [null],
      strTipoConvenio: ['', Validators.required],
    });
    this.formGroup = this.fb.group({
      nombreDocumento: [''], // Campo opcional
      descripcionDocumento: [''], // Campo opcional
    });
  }

  async ngOnInit() {
    try {
      // Leer el parámetro 'idTipoDonante' de la URL
      this.route.queryParams.subscribe((params) => {
        this.idTipoDonante = params['idTipoDonante'] ? Number(params['idTipoDonante']) : null;
      });

      // Si no se recibió el dato por queryParams, buscar en localStorage
      if (!this.idTipoDonante) {
        const storedId = localStorage.getItem('idTipoDonante');
        if (storedId) {
          this.idTipoDonante = Number(storedId);
        }
      }

      // Establecer un valor predeterminado si no hay valor disponible
      if (!this.idTipoDonante) {
        this.idTipoDonante = this.personaNatural; // Valor predeterminado (Persona Natural)
      }

      // Llamadas asincrónicas basadas en el tipo de donante
      if (this.idTipoDonante === this.personaNatural) {
        this.setValoresPorDefectoPersonaNatural();
        await this.ListarPersonas();

      } else if (this.idTipoDonante === this.personaJuridica) {
        await this.ListarEmpresas();
      }

      // Llamadas asincrónicas generales
      await Promise.all([
        this.ListarContratos(),
        this.ListarCoordinadoresBar(),
        this.ListarTipoConvenio(),
      ]);
    } catch (error) {
      console.error('Error durante la inicialización del componente:', error);
    }
  }


  setValoresPorDefectoPersonaNatural() {
    this.convenioForm.patchValue({
      resolucion: 'RESOLUCIÓN 290',
      titulo: 'Convenio de Vinculación Voluntaria con Persona Natural para Apoyo al Banco de Alimentos Riobamba',
      objetivo: 'Establecer los términos de colaboración entre el Banco de Alimentos Riobamba y la persona natural, quien se vincula de manera voluntaria para contribuir con la donación de alimentos u otros recursos, con el fin de apoyar a comunidades en situación de vulnerabilidad y promover la seguridad alimentaria en la región.'
    });
  }

  ModalDialogContratos() {
    this.dialogContratosVisible = true;
  }

  ModalListadoDonante() {
    this.dialogDonanteVisible = true;
  }

  cerrarModal(modal: string) {
    if (modal === 'ModalContratos') {
      this.dialogContratosVisible = false;
    } else if (modal === 'ModalDonante') {
      this.dialogDonanteVisible = false;
    } else if (modal === 'ModalDocumento') {
      this.mostrarModal = false;

    }
  }

  // Mostrar el modal para subir un documento
  mostrarModalAgregarDocumento(): void {
    this.mostrarModal = true;
    this.archivoSeleccionado = null;
    this.formGroup.reset(); // Resetea el formulario
  }

  calcularFechaFin() {
    const fechaInicio = this.convenioForm.get('fechaInicio')?.value;
    const anos = this.convenioForm.get('anos')?.value;
    const meses = this.convenioForm.get('meses')?.value;

    if (fechaInicio && (anos || meses)) {
      const inicio = new Date(fechaInicio);
      const fechaFin = new Date(inicio.setFullYear(inicio.getFullYear() + anos, inicio.getMonth() + meses));
      this.convenioForm.get('fechaFin')?.setValue(fechaFin);
    } else {
      this.convenioForm.get('fechaFin')?.setValue('');
    }
  }

  async ListarTipoConvenio() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ListadoTipoConvenioActivos().subscribe((translated) => {
          resolve(translated);
        })
      );

      if (data.success) {
        this.ListadoTipoConvenio = data.datos;

        // 👉 Asignar el primer valor como valor por defecto
        const primerValor = this.ListadoTipoConvenio[0]?.idtipoconvenio || null;
        this.convenioForm.get('strTipoConvenio')?.setValue(primerValor);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de tipos de Convenios.',
        });
      }
    } catch (error) {
      console.error('Error al listar los tipos de convenios', error);
    }
  }

  async ListarContratos() {
    try {
      const data = await new Promise<any>(resolve => this.servicios.ListadoContratoActivos().subscribe(resolve));
      if (data.success) {
        this.listadoContrato = data.datos;
        this.listadoContratoFiltrado = [...this.listadoContrato];
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de contratos.' });
      }
    } catch (error) {
      console.error('Error al listar contratos', error);
    }
  }

  filtrarContratos(event: any) {
    const query = event.target.value.toLowerCase();
    this.listadoContratoFiltrado = this.listadoContrato.filter((contrato: any) =>
      contrato.contrato_strtitulo.toLowerCase().includes(query) ||
      contrato.contrato_strdescripcion.toLowerCase().includes(query)
    );
  }

  confirmarContrato() {
    if (!this.selectedContrato) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debes seleccionar un contrato.' });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas guardar el contrato "${this.selectedContrato.contrato_stridentificador}"?`,
      header: 'Confirmar Guardado',
      icon: 'pi pi-question',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Contrato guardado con éxito.' });
        this.dialogContratosVisible = false;
      },
      reject: () => {
        this.selectedContrato = null;
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Has cancelado el guardado del contrato.' });
      }
    });
  }

  async ListarEmpresas() {
    const idTipoSolicitud = this.parametros.tiposSolicitud.ACEPTADO;
    const idTipoEntidad = this.parametros.tiposEntidad.EMPRESA;
    try {
      const data = await new Promise<any>(resolve => this.servicios.ListadoEmpresasAceptadasActivas(idTipoSolicitud, idTipoEntidad).subscribe(translated => { resolve(translated) }));
      if (data.success) {
        this.listadoEmpresa = data.datos;
        this.listadoEmpresaFiltrado = [...this.listadoEmpresa];
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de fundaciones.' });
      }
    } catch (error) {
      console.error('Error al listar fundaciones', error);
    }
  }

  async ListarPersonas() {
    const idTipoSolicitud = this.parametros.tiposSolicitud.ACEPTADO; // Ejemplo: Solicitud de donación
    const solicitud_blestado = true;

    const data = await new Promise<any>(resolve => this.servicios.ListadoSolicitudDonantePersona(idTipoSolicitud, solicitud_blestado).subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsDonantePersona = data.datos;
      this.lsDonantePersonaFiltrado = [...this.lsDonantePersona];
    }
  }

  filtrarPersona(event: any) {
    const query = event.target.value.toLowerCase();

    this.lsDonantePersonaFiltrado = this.lsDonantePersona
      .filter((persona: any) => {
        const nombreCompleto = `${persona.ounombres} ${persona.ouapellidos}`.toLowerCase();
        const cedula = persona.oustrcedula?.toLowerCase() || '';
        return nombreCompleto.includes(query) || cedula.includes(query);
      })
      .sort((a: any, b: any) => {
        const nombreA = `${a.ounombres} ${a.ouapellidos}`.toLowerCase();
        const nombreB = `${b.ounombres} ${b.ouapellidos}`.toLowerCase();
        return nombreA.localeCompare(nombreB);
      });
  }

  filtrarEmpresas(event: any) {
    const query = event.target.value.toLowerCase();
    this.listadoEmpresaFiltrado = this.listadoEmpresa.filter((empresa: any) =>
      empresa.ouempresa_strnombre.toLowerCase().includes(query) ||
      empresa.oustrruc.toLowerCase().includes(query)
    );
  }

  confirmarEmpresa() {
    if (!this.empresaSeleccionada) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debes seleccionar una empresa.' });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Estás seguro de seleccionar la empresa "${this.empresaSeleccionada.ouempresa_strnombre}"?`,
      header: 'Confirmar Selección',
      icon: 'pi pi-question',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Empresa selecionada con éxito.' });
        this.dialogDonanteVisible = false;
        this.ListadoRepresentantesEmpresa();
      },
      reject: () => {
        this.empresaSeleccionada = null;
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Has cancelado la selección de la empresa.' });
      }
    });
  }

  confirmarPersona() {
    if (!this.personaSeleccionada) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debes seleccionar una persona.' });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Estás seguro de seleccionar a "${this.personaSeleccionada.ounombres} ${this.personaSeleccionada.ouapellidos}"?`,
      header: 'Confirmar Selección',
      icon: 'pi pi-question',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Selecionado', detail: 'Persona seleccionada con éxito.' });
        this.dialogDonanteVisible = false;
      },
      reject: () => {
        this.personaSeleccionada = null;
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Has cancelado la selección de la persona.' });
      }
    });
  }

  async ListadoRepresentantesEmpresa() {
    try {
      const data = await new Promise<any>(resolve =>
        this.servicios.ListadoRepresentantesEmpresaActivos(this.empresaSeleccionada.ouidempresa)
          .subscribe(resolve)
      );

      if (data.success) {
        this.listaCoordinadoresDonante = data.datos.map((coordinador: any) => {
          const nombresCompleto = `${coordinador.ourepresentante_nombres} ${coordinador.ourepresentante_apellidos}`;
          return {
            nombres1: coordinador.ourepresentante_nombres,
            apellidos1: coordinador.ourepresentante_apellidos,
            cedula1: coordinador.ourepresentante_cedula,
            celular1: coordinador.ourepresentante_celular,
            label: nombresCompleto,
            nombresCompleto: nombresCompleto,
            value: coordinador,
          };
        });

        this.coordinadoresFiltradosDonante = [...this.listaCoordinadoresDonante];
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de Representantes de la empresa.',
        });
      }
    } catch (error) {
      console.error('Error al listar los Representantes de la empresa', error);
    }
  }

  filtrarCoordinadorDonante(event: any) {
    const query = event.query.toLowerCase();
    this.coordinadoresFiltradosDonante = this.listaCoordinadoresDonante.filter((coordinador: any) =>
      coordinador.nombresCompleto.toLowerCase().includes(query)
    );
  }

  onCoordinadorSeleccionadoDonante(event: any) {
    this.convenioForm.get('coordinadorSeleccionadoDonante')?.setValue(event);
  }

  async ListarCoordinadoresBar() {
    try {
      const idCargo = this.parametros.tipoCargo.COORDINADOR_PROYECTO;
      const data = await new Promise<any>((resolve) => this.servicios.ListadoPersonalDadoIdCargoActivos(idCargo).subscribe(resolve));

      if (data.success) {
        this.listaCoordinadoresBar = data.datos.map((coordinador: any) => {
          const nombreCompleto = `${coordinador.ounombres} ${coordinador.ouapellidos} `;
          return {
            nombres: coordinador.ounombres,
            apellidos: coordinador.ouapellidos,
            cedula: coordinador.oudocumento,
            celular: coordinador.oucelular1,
            label: nombreCompleto, // Nombre completo para mostrar en el autocompletar
            nombreCompleto: nombreCompleto, // Variable para almacenar nombre completo
            value: coordinador, // Mantener referencia al objeto completo
          };
        });

        this.coordinadoresFiltradosBar = [...this.listaCoordinadoresBar];
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de coordinadores del Bar.',
        });
      }
    } catch (error) {
      console.error('Error al listar coordinadores del Bar', error);
    }
  }

  // Método para filtrar los coordinadores según la búsqueda en el autocompletar
  filtrarCoordinadoresBar(event: any) {
    const query = event.query.toLowerCase();
    this.coordinadoresFiltradosBar = this.listaCoordinadoresBar.filter((coordinador: any) =>
      coordinador.nombreCompleto.toLowerCase().includes(query)
    );
  }

  onCoordinadorSeleccionado(event: any) {
    this.convenioForm.get('coordinadorSeleccionadoBar')?.setValue(event); // Asigna el objeto seleccionado
  }

  // Seleccionar archivo desde el input
  seleccionarArchivo(event: any): void {
    const archivos = event.target.files;
    const tipoPermitido = 'application/pdf'; // Tipo MIME permitido

    if (archivos && archivos.length > 0) {
      const archivo = archivos[0]; // Obtiene el primer archivo seleccionado

      if (archivo.type === tipoPermitido) {
        this.archivoSeleccionado = archivo; // Asigna el archivo si es válido
      } else {
        this.archivoSeleccionado = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Solo se permiten archivos PDF.',
        });
        console.warn('Tipo de archivo no permitido:', archivo.type);
      }
    } else {
      this.archivoSeleccionado = null;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un archivo.',
      });
      console.warn('No se seleccionaron archivos.');
    }
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

  // Agregar el documento a la lista
  agregarDocumento(): void {
    if (!this.archivoSeleccionado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un archivo válido.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result.split(',')[1]; // Convierte el archivo a base64
      const nombre = this.formGroup.get('nombreDocumento')?.value || this.archivoSeleccionado?.name; // Si no hay nombre, usa el nombre del archivo
      const descripcion = this.formGroup.get('descripcionDocumento')?.value || 'Descripción'; // Si no hay descripción, usa un valor por defecto

      // Agrega el documento a la lista
      this.documentos.push({
        conv_anexo_strconvenioanexo: nombre.trim(),
        conv_anexo_strdescripcionanexo: descripcion.trim(),
        conv_anexo_strruta: base64,
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Documento agregado correctamente.',
      });

      this.mostrarModal = false; // Cierra el modal
    };

    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al procesar el archivo seleccionado.',
      });
    };

    reader.readAsDataURL(this.archivoSeleccionado as File);
  }

  // Visualizar el documento en una nueva pestaña
  visualizarDocumento(documento: Documento): void {
    if (!documento || !documento.conv_anexo_strruta) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay ningún documento cargado para visualizar.',
      });
      return;
    }

    try {
      // Decodificar el Base64 del documento
      const byteCharacters = atob(documento.conv_anexo_strruta); // Decodificar Base64
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' }); // Crear el Blob

      // Generar una URL para el Blob
      const pdfURL = URL.createObjectURL(blob);

      // Abrir el PDF en una nueva ventana
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
        detail: 'No se pudo visualizar el archivo PDF.',
      });
    }
  }

  // Eliminar un documento de la lista
  eliminarDocumento(index: number): void {
    this.documentos.splice(index, 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Documento eliminado correctamente.',
    });
  }

  async registrarConvenio() {
    try {
      // Verificar que los campos obligatorios estén completos
      if (!this.convenioForm.valid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, complete todos los campos obligatorios.',
        });
        return;
      }

      // Obtener los datos del formulario y selección actual
      const resolucion = this.convenioForm.get('resolucion')?.value;
      const titulo = this.convenioForm.get('titulo')?.value;
      const objetivo = this.convenioForm.get('objetivo')?.value;
      const idTipoConvenio = this.strTipoConvenio;
      const idCoordinadorBar = this.convenioForm.get('coordinadorSeleccionadoBar')?.value?.value?.ouidpersonal;
      const idCoordinadorDon = this.convenioForm.get('coordinadorSeleccionadoDonante')?.value?.value?.ouidrepresentante;
      const fechaInicio = this.convenioForm.get('fechaInicio')?.value;
      const fechaFin = this.convenioForm.get('fechaFin')?.value;
      const observaciones = this.convenioForm.get('observaciones')?.value;
      const anio = this.convenioForm.get('anos')?.value;
      const mes = this.convenioForm.get('meses')?.value;

      // Determinar idSolicitud e idDonante basados en el tipo de donante
      let idSolicitud = null;
      let idDonante = null;

      if (this.idTipoDonante === this.personaNatural) {
        // Si es persona
        idSolicitud = this.personaSeleccionada?.ouidsolicitudpersona || null;
        idDonante = this.personaSeleccionada?.ouidpersona || null;

        if (!idSolicitud || !idDonante) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Debe seleccionar una persona válida.',
          });
          return;
        }
      } else if (this.idTipoDonante === this.personaJuridica) {

        // Si es empresa
        idSolicitud = this.empresaSeleccionada?.ouidsolicitud || null;
        idDonante = this.empresaSeleccionada?.ouidempresa || null;

        if (!idSolicitud || !idDonante) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Debe seleccionar una empresa válida.',
          });
          return;
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Tipo de donante no reconocido.',
        });
        return;
      }

      // Validar otros campos críticos
      if (!resolucion) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, ingrese la resolución.',
        });
        return;
      }
      if (!titulo) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, ingrese el título del convenio.',
        });
        return;
      }
      if (!objetivo) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, ingrese el objetivo del convenio.',
        });
        return;
      }
      if (!idTipoConvenio) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, seleccione el tipo de convenio.',
        });
        return;
      }
      if (!idCoordinadorBar) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, seleccione el coordinador del bar.',
        });
        return;
      }
      if (!fechaInicio) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, seleccione la fecha de inicio.',
        });
        return;
      }
      if (!fechaFin && (!anio || !mes)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, ingrese un año o mes para calcular la fecha de fin.',
        });
        return;
      }

      // Construir el objeto para registrar el convenio
      let content = {
        objConvenio: {
          "idconvenio": null,
          "convenio_strdescripcion": resolucion,
          "convenio_strtitulo": titulo,
          "convenio_strobjetivo": objetivo,
          "convenio_idcoordinadorbar": idCoordinadorBar,
          "convenio_idcoordinadordon": idCoordinadorDon,
          "convenio_idsolicitud": idSolicitud,
          "convenio_iddonante": idDonante,
          "convenio_dtfechainicio": fechaInicio,
          "convenio_dtfechafin": fechaFin,
          "convenio_idtipodonante": this.idTipoDonante,
          "convenio_idtipoconvenio": idTipoConvenio,
          "convenio_strobservacion": observaciones,
          "convenio_blestado": null,
          "convenio_dtfecharegistro": null,
        }
      };

      const convenioResponse = await new Promise<any>((resolve) =>
        this.servicios.RegistarConvenio(content).subscribe(resolve)
      );

      if (!convenioResponse.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar el convenio. Intente nuevamente.',
        });
        return;
      }

      const idConvenio = convenioResponse.datos[0]?.ouidconvenio;


      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Convenio registrado correctamente.',
      });

      this.router.navigate(['/dashadmin/principalconvenio/listadoconvenios'], {
        queryParams: { tab: 2 },
      });


    } catch (error) {
      console.error('Error al registrar el convenio:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error al registrar el convenio. Intente nuevamente.',
      });
    }
  }

}  