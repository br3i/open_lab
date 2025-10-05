import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncionesCompartidasServicio } from '../../ModuloHerramientas/funcionesCompartidas.servicio';
import { ParametrosConfigurablesService } from '../../ModuloHerramientas/parametrosConfigurables.service';

interface ArchivoConvenio {
  nombre: string;
  contenido: string; // Base64
  tipo: string;
}

interface Indicador {
  id: number;
  nombre: string;
  descripcion: string;
  eje: string;
}

interface SubIndicador {
  id: number;
  nombre: string;
  descripcion: string;
  idIndicadorPadre: number;
}

interface IndicadorAgregado {
  indicador: Indicador;
  unidadMedicionIndicador: string;
  metaIndicador: string;
  subIndicador: SubIndicador | null;
  unidadMedicionSubIndicador: string | null;
  metaSubIndicador: string | null;
  esHito: boolean;
  tituloHito?: string;
  descripcionHito?: string;
}

interface NuevoIndicador {
  nombre: string;
  descripcion: string;
}

interface NuevoSubIndicador {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-pg-contratoformulario',
  templateUrl: './pg-contratoformulario.component.html',
  styleUrls: ['./pg-contratoformulario.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PgContratoFormularioComponent implements OnInit {

  public contratoForm: FormGroup;
  public cargandoDatos: boolean = false;
  public enviandoFormulario: boolean = false;

  // Datos para los dropdowns
  public listadoFundaciones: any[] = [];
  public listadoFundacionesFiltradas: any[] = [];
  public listadoRepresentantesFundacion: any[] = [];
  public listadoCoordinadoresProyecto: any[] = [];
  public listadoCoordinadoresFiltrados: any[] = [];
  
  // Indicadores
  public listadoEjes: string[] = [];
  public ejeSeleccionado: string = '';
  public listadoIndicadoresPorEje: Indicador[] = [];
  public indicadorSeleccionado: Indicador | null = null;
  
  // Subindicadores
  public tieneSubIndicador: boolean = false;
  public listadoSubIndicadoresPorIndicador: SubIndicador[] = [];
  public subIndicadorSeleccionado: SubIndicador | null = null;
  
  // Hitos
  public esHito: boolean = false;
  public tituloHito: string = '';
  public descripcionHito: string = '';
  
  // Unidad de medición y meta para indicador
  public unidadMedicionIndicador: string = 'CANTIDAD';
  public metaIndicador: string = '';
  
  // Unidad de medición y meta para subindicador
  public unidadMedicionSubIndicador: string = 'CANTIDAD';
  public metaSubIndicador: string = '';
  
  public listadoUnidadesMedicion = [
    { label: 'Cantidad', value: 'CANTIDAD' },
    { label: 'Porcentaje (%)', value: 'PORCENTAJE' },
    { label: 'Kilogramo (kg.)', value: 'KILOGRAMOS' },
    { label: 'Otros', value: 'OTROS' }
  ];
  
  // Indicadores agregados
  public indicadoresAgregados: IndicadorAgregado[] = [];
  
  // Modales para "Otro"
  public mostrarModalNuevoIndicador: boolean = false;
  public mostrarModalNuevoSubIndicador: boolean = false;
  public nuevoIndicador: NuevoIndicador = { nombre: '', descripcion: '' };
  public nuevoSubIndicador: NuevoSubIndicador = { nombre: '', descripcion: '' };

  // Archivo del convenio
  public archivoConvenio: ArchivoConvenio | null = null;
  public mostrarModalArchivo: boolean = false;

  // Fechas
  public fechaMinima: Date = new Date();
  public fechaMaxima: Date = new Date(2030, 11, 31);

  // IDs de parámetros
  public idCargo = this.parametros.tipoCargo.REPRESENTANTE_LEGAL;

  constructor(
    private fb: FormBuilder,
    private servicios: ServiciosWebCentral,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private funcionescompartidas: FuncionesCompartidasServicio,
    private parametros: ParametrosConfigurablesService
  ) {
    this.contratoForm = this.fb.group({
      nombre_proyecto: ['', [Validators.required, Validators.minLength(3)]],
      id_fundacion: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required],
      id_representante_fundacion: [null, Validators.required],
      id_coordinador_proyecto: [null]
    });
  }

  async ngOnInit() {
    await this.cargarDatosIniciales();
    this.generarIndicadores();
    this.configurarValidaciones();
  }

  async cargarDatosIniciales() {
    this.cargandoDatos = true;
    
    try {
      // Cargar fundaciones aceptadas
      await this.cargarFundacionesAceptadas();
      
      // Cargar coordinadores del proyecto
      await this.cargarCoordinadoresProyecto();
      
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error de conexión al cargar datos'
      });
    } finally {
      this.cargandoDatos = false;
    }
  }

  async cargarCoordinadoresProyecto() {
    try {
      const idCargo = this.parametros.tipoCargo.COORDINADOR_PROYECTO;
      const data = await new Promise<any>((resolve) => 
        this.servicios.ListadoPersonalDadoIdCargoActivos(idCargo)
          .subscribe(resolve)
      );

      if (data.success) {
        this.listadoCoordinadoresProyecto = data.datos.map((coordinador: any) => {
          return {
            ...coordinador,
            nombreCompleto: `${coordinador.ounombres} ${coordinador.ouapellidos}`.trim()
          };
        });
        this.listadoCoordinadoresFiltrados = [...this.listadoCoordinadoresProyecto];
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de coordinadores.'
        });
      }
    } catch (error) {
      console.error('Error al cargar coordinadores:', error);
    }
  }

  async cargarFundacionesAceptadas() {
    try {
      const idTipoSolicitud = this.parametros.tiposSolicitud.ACEPTADO;
      const idTipoEntidad = this.parametros.tiposEntidad.EMPRESA;
      
      const data = await new Promise<any>(resolve => 
        this.servicios.ListadoSolicitudEmpresas(idTipoSolicitud, idTipoEntidad)
          .subscribe(translated => { resolve(translated) })
      );
      
      if (data.success) {
        // Filtrar solo las fundaciones activas
        this.listadoFundaciones = data.datos.filter((f: any) => f.ousolicitud_blestado === true);
        
        // Agregar información de ubicación formateada a cada fundación
        for (let fundacion of this.listadoFundaciones) {
          const direccion = await this.obtenerDireccionFormateada(fundacion.ouidubicacion, fundacion.ouempresa_strdireccion);
          fundacion.direccion_completa = direccion;
        }
        
        this.listadoFundacionesFiltradas = [...this.listadoFundaciones];
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar fundaciones'
        });
      }
    } catch (error) {
      console.error('Error al cargar fundaciones:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar fundaciones aceptadas'
      });
    }
  }

  async obtenerDireccionFormateada(idUbicacion: number, direccion: string): Promise<string> {
    try {
      const detalleUbicacion = await this.funcionescompartidas.DetalleUbicacion(idUbicacion);
      
      let provincia = "";
      let canton = "";
      let parroquia = "";

      if (detalleUbicacion && detalleUbicacion.length > 0) {
        detalleUbicacion.forEach((ubicacion: any) => {
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
      let partesDireccion = [provincia, canton, parroquia, direccion].filter(Boolean);
      return partesDireccion.join(", ");
    } catch (error) {
      console.error('Error al obtener dirección formateada:', error);
      return direccion || '';
    }
  }

  generarIndicadores() {
    const todosLosIndicadores = [
      { id: 1, nombre: 'Número de Beneficiarios Atendidos', descripcion: 'Total de personas beneficiadas por el proyecto', eje: 'Impacto Social' },
      { id: 2, nombre: 'Familias Apoyadas', descripcion: 'Cantidad de familias que recibieron apoyo alimentario', eje: 'Impacto Social' },
      { id: 3, nombre: 'Reducción de la Pobreza', descripcion: 'Porcentaje de reducción en indicadores de pobreza', eje: 'Impacto Social' },
      { id: 4, nombre: 'Alimentos Distribuidos (Kg)', descripcion: 'Cantidad total de alimentos entregados en kilogramos', eje: 'Distribución de Alimentos' },
      { id: 5, nombre: 'Productos Entregados', descripcion: 'Variedad de productos alimenticios distribuidos', eje: 'Distribución de Alimentos' },
      { id: 6, nombre: 'Frecuencia de Distribución', descripcion: 'Número de entregas realizadas por mes', eje: 'Distribución de Alimentos' },
      { id: 7, nombre: 'Tasa de Asistencia', descripcion: 'Porcentaje de beneficiarios que asistieron regularmente', eje: 'Participación' },
      { id: 8, nombre: 'Voluntarios Participantes', descripcion: 'Cantidad de voluntarios activos en el proyecto', eje: 'Participación' },
      { id: 9, nombre: 'Eventos Realizados', descripcion: 'Número de jornadas o eventos de distribución', eje: 'Participación' },
      { id: 10, nombre: 'Satisfacción del Beneficiario', descripcion: 'Nivel de satisfacción reportado por los beneficiarios', eje: 'Calidad' },
      { id: 11, nombre: 'Calidad Nutricional', descripcion: 'Evaluación de la calidad de los alimentos entregados', eje: 'Calidad' },
      { id: 12, nombre: 'Reducción de Desperdicio', descripcion: 'Porcentaje de reducción de desperdicio alimentario', eje: 'Sostenibilidad' },
      { id: 13, nombre: 'Alianzas Estratégicas', descripcion: 'Número de organizaciones colaboradoras', eje: 'Sostenibilidad' },
      { id: 14, nombre: 'Capacitaciones Realizadas', descripcion: 'Cantidad de talleres o capacitaciones nutricionales', eje: 'Educación' },
      { id: 15, nombre: 'Mejora Nutricional', descripcion: 'Indicador de mejora en estado nutricional de beneficiarios', eje: 'Educación' },
      { id: 16, nombre: 'Cobertura Geográfica', descripcion: 'Número de sectores o zonas cubiertas por el proyecto', eje: 'Alcance' },
      { id: 17, nombre: 'Tiempo de Respuesta', descripcion: 'Tiempo promedio de respuesta ante solicitudes de ayuda', eje: 'Eficiencia' },
      { id: 18, nombre: 'Presupuesto Ejecutado', descripcion: 'Porcentaje del presupuesto utilizado del total asignado', eje: 'Financiero' },
      { id: 999, nombre: 'Otro (Agregar Nuevo)', descripcion: 'Agregar un indicador personalizado', eje: 'TODOS' }
    ];

    // Obtener ejes únicos (sin incluir "TODOS")
    this.listadoEjes = [...new Set(todosLosIndicadores.filter(i => i.eje !== 'TODOS').map(i => i.eje))];
    
    // Guardar todos los indicadores para filtrar por eje
    this.listadoIndicadoresPorEje = todosLosIndicadores;
    
    // Generar subindicadores por defecto
    this.generarSubIndicadores();
  }

  generarSubIndicadores() {
    const todosLosSubIndicadores = [
      // Subindicadores para "Número de Beneficiarios Atendidos" (id: 1)
      { id: 1001, nombre: 'Niños atendidos', descripcion: 'Cantidad de niños beneficiados', idIndicadorPadre: 1 },
      { id: 1002, nombre: 'Adultos mayores atendidos', descripcion: 'Cantidad de adultos mayores beneficiados', idIndicadorPadre: 1 },
      { id: 1003, nombre: 'Mujeres embarazadas atendidas', descripcion: 'Cantidad de mujeres embarazadas beneficiadas', idIndicadorPadre: 1 },
      
      // Subindicadores para "Familias Apoyadas" (id: 2)
      { id: 2001, nombre: 'Familias con niños', descripcion: 'Familias que tienen menores de edad', idIndicadorPadre: 2 },
      { id: 2002, nombre: 'Familias monoparentales', descripcion: 'Familias con un solo progenitor', idIndicadorPadre: 2 },
      
      // Subindicadores para "Alimentos Distribuidos" (id: 4)
      { id: 4001, nombre: 'Alimentos perecederos', descripcion: 'Frutas, verduras, carnes, lácteos', idIndicadorPadre: 4 },
      { id: 4002, nombre: 'Alimentos no perecederos', descripcion: 'Enlatados, granos, pastas', idIndicadorPadre: 4 },
      
      // Subindicadores para "Capacitaciones Realizadas" (id: 14)
      { id: 14001, nombre: 'Talleres de nutrición', descripcion: 'Capacitaciones sobre alimentación saludable', idIndicadorPadre: 14 },
      { id: 14002, nombre: 'Talleres de cocina', descripcion: 'Capacitaciones sobre preparación de alimentos', idIndicadorPadre: 14 },
      
      // Opción "Otro"
      { id: 9999, nombre: 'Otro (Agregar Nuevo)', descripcion: 'Agregar un subindicador personalizado', idIndicadorPadre: 0 }
    ];
    
    this.listadoSubIndicadoresPorIndicador = todosLosSubIndicadores;
  }

  onEjeChange(event: any) {
    this.ejeSeleccionado = event.value;
    this.limpiarSeleccionIndicador();
  }

  get indicadoresDelEje(): Indicador[] {
    if (!this.ejeSeleccionado) return [];
    const indicadores = this.listadoIndicadoresPorEje.filter(ind => ind.eje === this.ejeSeleccionado);
    // Agregar opción "Otro"
    const otroIndicador = this.listadoIndicadoresPorEje.find(ind => ind.id === 999);
    if (otroIndicador) {
      indicadores.push(otroIndicador);
    }
    return indicadores;
  }

  onIndicadorChange(event: any) {
    const indicador = event.value;
    
    if (indicador && indicador.id === 999) {
      // Si selecciona "Otro", mostrar modal
      this.mostrarModalNuevoIndicador = true;
      this.indicadorSeleccionado = null;
      return;
    }
    
    this.indicadorSeleccionado = indicador;
    this.tieneSubIndicador = false;
    this.subIndicadorSeleccionado = null;
  }

  onTieneSubIndicadorChange() {
    if (!this.tieneSubIndicador) {
      this.subIndicadorSeleccionado = null;
    }
  }

  get subIndicadoresDelIndicador(): SubIndicador[] {
    if (!this.indicadorSeleccionado) return [];
    const subIndicadores = this.listadoSubIndicadoresPorIndicador.filter(
      sub => sub.idIndicadorPadre === this.indicadorSeleccionado!.id
    );
    // Agregar opción "Otro"
    const otroSubIndicador = this.listadoSubIndicadoresPorIndicador.find(sub => sub.id === 9999);
    if (otroSubIndicador) {
      subIndicadores.push(otroSubIndicador);
    }
    return subIndicadores;
  }

  onSubIndicadorChange(event: any) {
    const subIndicador = event.value;
    
    if (subIndicador && subIndicador.id === 9999) {
      // Si selecciona "Otro", mostrar modal
      this.mostrarModalNuevoSubIndicador = true;
      this.subIndicadorSeleccionado = null;
      return;
    }
    
    this.subIndicadorSeleccionado = subIndicador;
  }

  agregarNuevoIndicador() {
    if (!this.nuevoIndicador.nombre || !this.nuevoIndicador.descripcion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe completar el nombre y descripción del indicador'
      });
      return;
    }

    // Generar nuevo ID
    const nuevoId = Math.max(...this.listadoIndicadoresPorEje.map(i => i.id)) + 1;
    
    const nuevoIndicadorObj: Indicador = {
      id: nuevoId,
      nombre: this.nuevoIndicador.nombre,
      descripcion: this.nuevoIndicador.descripcion,
      eje: this.ejeSeleccionado
    };

    // Agregar a la lista
    this.listadoIndicadoresPorEje.push(nuevoIndicadorObj);
    this.indicadorSeleccionado = nuevoIndicadorObj;

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Nuevo indicador creado'
    });

    // Cerrar modal y limpiar
    this.mostrarModalNuevoIndicador = false;
    this.nuevoIndicador = { nombre: '', descripcion: '' };
  }

  agregarNuevoSubIndicador() {
    if (!this.nuevoSubIndicador.nombre || !this.nuevoSubIndicador.descripcion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe completar el nombre y descripción del subindicador'
      });
      return;
    }

    // Generar nuevo ID
    const nuevoId = Math.max(...this.listadoSubIndicadoresPorIndicador.map(s => s.id)) + 1;
    
    const nuevoSubIndicadorObj: SubIndicador = {
      id: nuevoId,
      nombre: this.nuevoSubIndicador.nombre,
      descripcion: this.nuevoSubIndicador.descripcion,
      idIndicadorPadre: this.indicadorSeleccionado!.id
    };

    // Agregar a la lista
    this.listadoSubIndicadoresPorIndicador.push(nuevoSubIndicadorObj);
    this.subIndicadorSeleccionado = nuevoSubIndicadorObj;

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Nuevo subindicador creado'
    });

    // Cerrar modal y limpiar
    this.mostrarModalNuevoSubIndicador = false;
    this.nuevoSubIndicador = { nombre: '', descripcion: '' };
  }

  agregarIndicador() {
    if (!this.indicadorSeleccionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar un indicador (nivel 1)'
      });
      return;
    }

    // Validar meta del indicador
    if (!this.metaIndicador || this.metaIndicador.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe ingresar una meta para el indicador'
      });
      return;
    }

    // Validar subindicador si tiene subindicador
    if (this.tieneSubIndicador && !this.subIndicadorSeleccionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar un subindicador (nivel 2)'
      });
      return;
    }

    // Validar meta del subindicador si tiene subindicador
    if (this.tieneSubIndicador && (!this.metaSubIndicador || this.metaSubIndicador.trim() === '')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe ingresar una meta para el subindicador'
      });
      return;
    }

    // Validar hito
    if (this.esHito && (!this.tituloHito || !this.descripcionHito)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe completar el título y descripción del hito'
      });
      return;
    }

    // Verificar si el indicador ya fue agregado
    const existe = this.indicadoresAgregados.find(ind => {
      const mismoIndicador = ind.indicador.id === this.indicadorSeleccionado!.id;
      const mismoSubIndicador = this.tieneSubIndicador
        ? ind.subIndicador?.id === this.subIndicadorSeleccionado?.id
        : !ind.subIndicador;
      return mismoIndicador && mismoSubIndicador;
    });

    if (existe) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Este indicador/subindicador ya fue agregado'
      });
      return;
    }

    // Agregar el indicador a la tabla
    this.indicadoresAgregados.push({
      indicador: this.indicadorSeleccionado,
      unidadMedicionIndicador: this.unidadMedicionIndicador,
      metaIndicador: this.metaIndicador,
      subIndicador: this.tieneSubIndicador ? this.subIndicadorSeleccionado : null,
      unidadMedicionSubIndicador: this.tieneSubIndicador ? this.unidadMedicionSubIndicador : null,
      metaSubIndicador: this.tieneSubIndicador ? this.metaSubIndicador : null,
      esHito: this.esHito,
      tituloHito: this.esHito ? this.tituloHito : undefined,
      descripcionHito: this.esHito ? this.descripcionHito : undefined
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Indicador agregado correctamente'
    });

    // Limpiar selección
    this.limpiarSeleccionIndicador();
  }

  limpiarSeleccionIndicador() {
    this.indicadorSeleccionado = null;
    this.unidadMedicionIndicador = 'CANTIDAD';
    this.metaIndicador = '';
    this.tieneSubIndicador = false;
    this.subIndicadorSeleccionado = null;
    this.unidadMedicionSubIndicador = 'CANTIDAD';
    this.metaSubIndicador = '';
    this.esHito = false;
    this.tituloHito = '';
    this.descripcionHito = '';
  }

  eliminarIndicador(index: number) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este indicador?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.indicadoresAgregados.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Indicador eliminado'
        });
      }
    });
  }

  cerrarModalNuevoIndicador() {
    this.mostrarModalNuevoIndicador = false;
    this.nuevoIndicador = { nombre: '', descripcion: '' };
  }

  cerrarModalNuevoSubIndicador() {
    this.mostrarModalNuevoSubIndicador = false;
    this.nuevoSubIndicador = { nombre: '', descripcion: '' };
  }

  configurarValidaciones() {
    // Validar que la fecha fin sea mayor a fecha inicio
    this.contratoForm.get('fecha_inicio')?.valueChanges.subscribe(fechaInicio => {
      if (fechaInicio) {
        const fechaFin = this.contratoForm.get('fecha_fin')?.value;
        if (fechaFin && new Date(fechaFin) <= new Date(fechaInicio)) {
          this.contratoForm.get('fecha_fin')?.setValue(null);
        }
      }
    });
  }

  async onFundacionChange(event: any) {
    const idFundacion = event.value;
    
    if (idFundacion) {
      try {
        // Obtener representantes de la fundación
        const data = await new Promise<any>(resolve =>
          this.servicios.ListadoRepresentantesEmpresaActivos(idFundacion)
            .subscribe(translated => { resolve(translated) })
        );
        
        if (data.success) {
          this.listadoRepresentantesFundacion = data.datos || [];
        } else {
          this.listadoRepresentantesFundacion = [];
        }
      } catch (error) {
        console.error('Error al cargar representantes:', error);
        this.listadoRepresentantesFundacion = [];
      }
    } else {
      this.listadoRepresentantesFundacion = [];
    }
    
    // Limpiar selecciones de representantes
    this.contratoForm.get('id_representante_fundacion')?.setValue(null);
    this.contratoForm.get('id_coordinador_proyecto')?.setValue(null);
  }

  onArchivoSeleccionado(event: any) {
    const archivo = event.files[0];
    
    if (archivo) {
      // Validar tipo de archivo
      const tiposPermitidos = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!tiposPermitidos.includes(archivo.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Solo se permiten archivos PDF, DOC o DOCX'
        });
        return;
      }

      // Validar tamaño (10MB máximo)
      if (archivo.size > 10 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El archivo no puede superar los 10MB'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.archivoConvenio = {
          nombre: archivo.name,
          contenido: e.target.result.split(',')[1], // Remover el prefijo data:
          tipo: archivo.type
        };
        
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Archivo "${archivo.name}" cargado correctamente`
        });
      };
      reader.readAsDataURL(archivo);
    }
  }

  removerArchivo() {
    this.archivoConvenio = null;
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Archivo removido'
    });
  }

  validarFechas(): boolean {
    const fechaInicio = this.contratoForm.get('fecha_inicio')?.value;
    const fechaFin = this.contratoForm.get('fecha_fin')?.value;
    
    if (fechaInicio && fechaFin) {
      if (new Date(fechaFin) <= new Date(fechaInicio)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Validación',
          detail: 'La fecha de fin debe ser posterior a la fecha de inicio'
        });
        return false;
      }
    }
    return true;
  }

  async onSubmit() {
    // Validar que haya al menos un indicador agregado
    if (this.indicadoresAgregados.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'Debe agregar al menos un indicador al proyecto'
      });
      return;
    }

    if (this.contratoForm.valid && this.validarFechas()) {
      this.confirmationService.confirm({
        message: '¿Está seguro que desea crear este contrato?',
        header: 'Confirmar Creación',
        icon: 'pi pi-question-circle',
        accept: async () => {
          await this.crearContrato();
        }
      });
    } else {
      this.markFormGroupTouched(this.contratoForm);
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  async crearContrato() {
    this.enviandoFormulario = true;

    try {
      const datosFormulario = this.contratoForm.value;

      // Preparar objeto contrato según lo que espera el backend
      const objContrato = {
        contrato_strtitulo: datosFormulario.nombre_proyecto,
        contrato_strdescripcion: '', // Puedes agregar una descripción si lo necesitas
        contrato_intidubicacion: null, // Ubicación eliminada del formulario
        contrato_intidempresa: datosFormulario.id_fundacion,
        contrato_dtfechainicio: this.formatearFecha(datosFormulario.fecha_inicio),
        contrato_dtfechafin: this.formatearFecha(datosFormulario.fecha_fin),
        contrato_intidrepresentanteempresa: datosFormulario.id_representante_fundacion,
        contrato_intidcoordinadorproyecto: datosFormulario.id_coordinador_proyecto,
        contrato_strestado: 'EN_PROCESO', // Siempre en proceso al crear
        indicadores: this.indicadoresAgregados.map(ind => ({
          indicador_id: ind.indicador.id,
          indicador_nombre: ind.indicador.nombre,
          indicador_descripcion: ind.indicador.descripcion,
          indicador_eje: ind.indicador.eje,
          indicador_unidad_medicion: ind.unidadMedicionIndicador,
          indicador_meta: ind.metaIndicador,
          subindicador_id: ind.subIndicador?.id || null,
          subindicador_nombre: ind.subIndicador?.nombre || null,
          subindicador_descripcion: ind.subIndicador?.descripcion || null,
          subindicador_unidad_medicion: ind.unidadMedicionSubIndicador || null,
          subindicador_meta: ind.metaSubIndicador || null,
          es_hito: ind.esHito,
          titulo_hito: ind.tituloHito || null,
          descripcion_hito: ind.descripcionHito || null
        })),
        archivo_convenio: this.archivoConvenio ? {
          nombre: this.archivoConvenio.nombre,
          contenido: this.archivoConvenio.contenido,
          tipo: this.archivoConvenio.tipo
        } : null
      };

      const contenido = { objContrato };

      const response = await new Promise<any>(resolve =>
        this.servicios.NuevoContrato(contenido)
          .subscribe(translated => { resolve(translated) })
      );

      if (response.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Contrato creado exitosamente'
        });
        
        // Limpiar formulario
        this.contratoForm.reset();
        this.archivoConvenio = null;
        this.indicadoresAgregados = [];
        this.limpiarSeleccionIndicador();
        
        // Redirigir a la lista de contratos
        setTimeout(() => {
          this.router.navigate(['/dashadmin/principalconvenio/listadocontratos']);
        }, 2000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.mensaje || 'Error al crear el contrato'
        });
      }
    } catch (error) {
      console.error('Error al crear contrato:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error de conexión al crear contrato'
      });
    } finally {
      this.enviandoFormulario = false;
    }
  }

  private formatearFecha(fecha: Date): string {
    if (!fecha) return '';
    return fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  limpiarFormulario() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea limpiar el formulario?',
      header: 'Confirmar Limpieza',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.contratoForm.reset();
        this.archivoConvenio = null;
        this.listadoRepresentantesFundacion = [];
        this.indicadoresAgregados = [];
        this.ejeSeleccionado = '';
        this.limpiarSeleccionIndicador();
      }
    });
  }

  // Getters para validaciones en el template
  get nombreProyecto() { return this.contratoForm.get('nombre_proyecto'); }
  get fundacion() { return this.contratoForm.get('id_fundacion'); }
  get fechaInicio() { return this.contratoForm.get('fecha_inicio'); }
  get fechaFin() { return this.contratoForm.get('fecha_fin'); }
  get representanteFundacion() { return this.contratoForm.get('id_representante_fundacion'); }
  get coordinadorProyecto() { return this.contratoForm.get('id_coordinador_proyecto'); }
}
