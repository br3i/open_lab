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
  selector: 'app-pg-convenioeditar',
  templateUrl: './pg-convenioeditar.component.html',
  styleUrls: ['./pg-convenioeditar.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PgConvenioeditarComponent implements OnInit {

  public convenioForm: FormGroup;
  public formGroup: FormGroup; // Formulario reactivo

  public datosConvenio: any; // Objeto del convenio recibido

  public idTipoDonante: any = null;
  public idDonante: any = null; //Almacena el id del donate este puede ser idempresa o idpersonadonante
  public idCoordinadorDon : any = null;
  public datosEmpresa: any;
  public datosRepresentanteEmpresa: any;

  public strTipoConvenio: any = 1;
  public listadoTipoConvenio: Array<any> = [];

  public coordinadorSeleccionadoBar: any = null; // Objeto del coordinador seleccionado
  public coordinadoresFiltradosBar: Array<any> = [];
  public listaCoordinadoresBar: Array<any> = []; // Lista de todos los coordinadores


  public modalArchivosVisible: boolean = false;                     // Control del modal para añadir documentos
  public documentos: Documento[] = []; // Lista de documentos
  public archivoSeleccionado: File | null = null; // Archivo seleccionado

  public minDate: Date = new Date();  // Restringir fecha de inicio para evitar fechas pasadas




  editMode = false; // Modo edición desactivado por defecto


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private servicios: ServiciosWebCentral,
    private messageService: MessageService,
    private router: Router,
    public parametros: ParametrosConfigurablesService

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

  ngOnInit() {

    var Session: any = sessionStorage.getItem('convenioSelecionado')
    this.datosConvenio = JSON.parse(Session)

    if (this.datosConvenio) {
      this.convenioForm.patchValue(this.datosConvenio);
      this.idTipoDonante = this.datosConvenio.ouconvenio_idtipodonante
      this.idDonante = this.datosConvenio.ouconvenio_iddonante
      this.idCoordinadorDon = this.datosConvenio.ouconvenio_idcoordinadordon
      this.InformacionEmpresa();

    } else {
      console.error('No se recibieron datos para el convenio.');
      this.router.navigate(['/dashadmin/principalconvenio/listadoconvenios']);
    }

  }


  ConfigurarFormulario() {
    if (this.idTipoDonante === 1) {
      // Configuración para empresa
      console.log('Configuración para Tipo Donante: Persona Natural');
    } else if (this.idTipoDonante === 2) {
      // Configuración para persona
      console.log('Configuración para Tipo Donante: Persona Jurídica');
    }
  }


  ModalCerrar(modal: string) {
    if (modal === 'ModalDocumentos') {
      this.modalArchivosVisible = false;

    } else if (modal === 'RegistroContrato') {

    }
  }

  // Mostrar el modal para subir un documento
  ModalAgregarArchivo(): void {
    this.modalArchivosVisible = true;
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
      const data = await new Promise<any>(resolve => this.servicios.ListadoTipoConvenioActivos().subscribe(translated => { resolve(translated) }));

      if (data.success) {
        this.listadoTipoConvenio = data.datos;
      }
      else {
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


  async InformacionEmpresa() {
    try {
      const data = await new Promise<any>(resolve => this.servicios.ObtenerEmpresaDadoId(this.idDonante).subscribe(translated => { resolve(translated) }));
      const dataRepresentante = await new Promise<any>(resolve => this.servicios.ObtenerRepresentanteEmpresa(this.idCoordinadorDon,this.idDonante).subscribe(translated => { resolve(translated) }));

      this.datosEmpresa = data.datos[0];
        this.datosRepresentanteEmpresa = dataRepresentante.datos[0]; 
        console.log("Información de la empresa", this.datosEmpresa)
        console.log("Información del representante empresa", this.datosRepresentanteEmpresa)

      if (data.success && data.datos.length > 0 && dataRepresentante.success && dataRepresentante.datos.length > 0) {
        this.datosEmpresa = data.datos[0];
        this.datosRepresentanteEmpresa = dataRepresentante.datos[0]; 
        console.log("Información de la empresa", this.datosEmpresa)
        console.log("Información del representante empresa", this.datosRepresentanteEmpresa)
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la informcacion de la empresa.',
        });
      }
    } catch (error) {
      console.error('Error al obtener la informacion de la empresa', error);
    }

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
        console.log("Lista de Coordinadores para Autocompletar:", this.listaCoordinadoresBar);
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
    console.log('Coordinador seleccionado:', event);
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
        console.log('Archivo seleccionado:', archivo.name); 
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

      console.log('Documento agregado:', {
        nombre,
        descripcion,
        base64: base64.substring(0, 50) + '...', // Muestra solo los primeros caracteres del base64
      });

      this.modalArchivosVisible = false; // Cierra el modal
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
    const base64URL = `data:application/pdf;base64,${documento.conv_anexo_strruta}`;
    const nuevaVentana = window.open();
    if (nuevaVentana) {
      nuevaVentana.document.write(
        `<iframe width="100%" height="100%" src="${base64URL}"></iframe>`
      );
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

  }

  guardarCambios() {
    if (this.convenioForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos obligatorios.',
      });
      return;
    }

    const convenioActualizado = {
      ...this.datosConvenio, // Mantiene los campos existentes
      ...this.convenioForm.value, // Actualiza con los valores del formulario
    };

    /* this.servicios.ActualizarConvenio(convenioActualizado).subscribe(
       (response: any) => {
         if (response.success) {
           this.messageService.add({
             severity: 'success',
             summary: 'Éxito',
             detail: 'Convenio actualizado correctamente.',
           });
           this.router.navigate(['/dashadmin/principalconvenio']);
         } else {
           this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: 'No se pudo actualizar el convenio.',
           });
         }
       },
       (error) => {
         console.error('Error al actualizar el convenio:', error);
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'Hubo un error al actualizar el convenio.',
         });
       }
     );*/
  }

}  