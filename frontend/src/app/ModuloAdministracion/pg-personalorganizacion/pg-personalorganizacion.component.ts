import { Component, OnInit } from '@angular/core';
import { ServiciosWebSeguridad } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { MessageService } from 'primeng/api';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';


@Component({
  selector: 'app-pg-personalorganizacion',
  templateUrl: './pg-personalorganizacion.component.html',
  styleUrls: ['./pg-personalorganizacion.component.css'],
  providers: [MessageService],
})
export class PgPersonalorganizacionComponent implements OnInit {
  // Variables existentes Personal
  public lsPersonal: any = [];
  public strCedula: any = "";
  public strApellidos: any = "";
  public strNombre: any = "";
  public strCorreo: any = "";
  public strCorreoSecundario: any = "";
  public strCelular: any = "";
  public strCelularSecundario: any = "";
  public strSexo: any = "";
  // Configuración general y control de estados
  public camposEditables: boolean = false;
  // Control de visibilidad de modales
  public visibleNuevaPersona: boolean = false;
  public visibleModalCambioEstado: boolean = false;
  public visibleModalVerDatos: boolean = false;
  public datosSeleccionados: any = null;
  public idPersonalSeleccionado: number | null = null;
  public estadoActualSeleccionado: boolean | null = null;
  public strDescripcion1: string = '';
  public strDescripcion2: string = '';
  public documento: string = '';
  public idPersona: any = "";



  public visibleModalEditarDatos: boolean = false; // Controla si el modal está visible
  public datosEditar: any = {}; // Almacena los datos del usuario a editar
  public cargoSeleccionado: number | null = null; // Almacena el valor seleccionado en el dropdown

  public lsCargos: Array<any> = [];


  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  nuevaPersona: any = {
    idtipodocumento: 1,
    documento: '',
    nombres: '',
    apellidos: '',
    correo1: '',
    correo2: '',
    celular1: '',
    celular2: '',
    direccion: '',
    edad: null,
    sexo: null,
    idestadocivil: null,
    idetnia: null,
    idcargo: null,

    strtiponombre: 'CEDULA'
  };
  constructor(
    private serviciosWeb: ServiciosWeb,
    private servicios: ServiciosWebSeguridad,
    private serviciosCentral: ServiciosWebCentral,
    private messageService: MessageService,
    private mensajes: Mensajes,
    private funciones: FuncionesGenerales,
  ) {
  }

  async ngOnInit() {

    this.ListadoPersonal();
    this.ListadoCargos();

  }

  // Método para listar personal
  async ListadoPersonal() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.serviciosCentral.ListadoPersonal().subscribe(resolve)
      );
      if (data.success) {
        this.lsPersonal = data.datos.sort((a: any, b: any) => {
          return b.ouusuario_blestado - a.ouusuario_blestado;
        })
      }

      if (data.success) {
        this.lsPersonal = data.datos;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al listar usuarios',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al listar usuarios',
      });
    }
  }


  async ListadoCargos() {
    const data = await new Promise<any>(resolve => this.serviciosWeb.ListadoCargoActivo().subscribe(translated => { resolve(translated) }));
    if (data.success) {
      this.lsCargos = data.datos;
      this.nuevaPersona.idcargo = this.lsCargos[0]?.ouidcargo;

    }
  }


  // CODIGO NUEVO PARA PERSONAL ORGANIZACION
  async validarCedulaBuscarPersona() {
    // Validar si la cédula está vacía
    if (!this.strCedula) {
      this.limpiarCampos();
      this.messageService.add({ severity: 'warn', summary: 'Información', detail: this.mensajes.IngreseCedula });
      return;
    }

    // Validar la estructura de la cédula (Frontend)
    if (!this.funciones.validarCedula(this.strCedula)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.CedulaInvalida });
      this.limpiarCampos();
      return;
    }

    try {
      // Llamar al backend para verificar si la persona existe
      const response = await new Promise<any>((resolve) =>
        this.serviciosWeb.ObtenerPersonaCedula(this.strCedula)
          .subscribe(resolve, error => {
            console.error("Error en ObtenerPersonaCedula:", error);
            resolve(null);
          })
      );

      if (response?.datos && response.datos.length > 0) {
        // Persona encontrada
        const persona = response.datos[0];
        this.idPersona = persona.idpersona ? String(persona.idpersona) : "-1";
        this.strNombre = persona.nombres || "";
        this.strApellidos = persona.apellidos || "";
        this.strCorreo = persona.correo1 || "";
        this.strCelular = persona.celular1 || "";
        this.strCorreoSecundario = persona.correo2 || "";
        this.strCelularSecundario = persona.celular2 || "";

        this.messageService.add({
          severity: 'success',
          summary: 'Información',
          detail: 'Cédula encontrada, datos cargados correctamente.'
        });

        this.camposEditables = false;
      } else {
        // Persona no encontrada
        this.idPersona = -1;  // Asignar un ID no válido para evitar errores en guardarRegistro()

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
        detail: 'Error en el registro del  legal'
      });
    }
  }

  limpiarCampos() {
    this.strNombre = "";
    this.strApellidos = "";
    this.strCorreo = "";
    this.strCelular = "";
    this.camposEditables = true;
    this.strCedula = ""
    this.strCorreoSecundario = "";
    this.strCelularSecundario = ""
    this.strDescripcion1 = ""
  }

  ModalNuevaPersona() {
    this.visibleNuevaPersona = true;
  }

  async guardarRegistro(): Promise<void> {
  // 1) Validación de la UI
  if (!this.validarNuevaPersona()) {
    return; // Detiene el guardado si hay errores
  }

  try {
    // 2) Validar idPersona
    if (
      !this.idPersona ||
      String(this.idPersona).trim() === '' ||
      this.idPersona === '-1'
    ) {
      throw new Error('ID Persona no válido');
    }

    // 3) Verificar duplicado por idPersona
    const servicioObservable = this.serviciosCentral.BuscarPersonalIdPersona(String(this.idPersona));
    if (!servicioObservable) {
      throw new Error('Error en el servicio: BuscarPersonalIdPersona devolvió null');
    }

    const user = await new Promise<any>((resolve, reject) => {
      servicioObservable.subscribe({
        next: resolve,
        error: reject
      });
    });

    if (user?.datos?.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El personal ya está registrado.'
      });
      return;
    }

    // 4) Preparar payload (mismo estilo de claves/valores)
    const objPersonal = {
      idpersona: this.idPersona || -1,
      idcargo: this.nuevaPersona?.idcargo,
      strdescripcion1: this.strDescripcion1,
      strdescripcion2: 'ND',
      documento: this.strCedula,
      nombres: this.strNombre,
      apellidos: this.strApellidos,
      correo1: this.strCorreo,
      correo2: this.strCorreoSecundario,
      celular1: this.strCelular,
      celular2: this.strCelularSecundario,
      direccion: '0',
      edad: -1,
      sexo: 'ND',
      idestadocivil: 1,
      idetnia: 1,
      tipodocumento: 1,
      strtiponombre: 'Cédula'
    };

    // Log útil para depuración
    console.log('InsertarPersonal payload:', objPersonal);

    // 5) Insertar nuevo personal
    const resultadoInsercion: any = await new Promise<any>((resolve, reject) => {
      this.serviciosCentral.InsertarPersonal({ objPersonal }).subscribe({
        next: resolve,
        error: reject
      });
    });

    console.log('Respuesta InsertarPersonal:', resultadoInsercion);

    // 🔍 AQUÍ se hace el chequeo extendido del backend
    const ok =
      resultadoInsercion?.success === true ||
      Number(resultadoInsercion?.rowCount) > 0 ||
      (Array.isArray(resultadoInsercion?.rows) && resultadoInsercion.rows.length > 0) ||
      Number(resultadoInsercion?.affectedRows) > 0 ||
      (Array.isArray(resultadoInsercion) && resultadoInsercion.length > 0);

    if (ok) {
      await this.ListadoPersonal();
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Personal ingresado correctamente.'
      });
      this.visibleNuevaPersona = false;
      this.limpiarCampos();
      return;
    }

    // Si no vino success ni filas afectadas, fuerza error con el mensaje del backend si existe
    throw new Error(resultadoInsercion?.message || resultadoInsercion?.mensaje || 'Respuesta inválida del servidor');

  } catch (error: any) {
    console.error('Error en guardarRegistro:', error);

    // Detectar el detalle más informativo posible
    let mensaje = 'Error al ingresar el personal.';
    if (error?.error?.detail) {
      mensaje += ` Detalle: ${error.error.detail}`;
    } else if (error?.error?.message) {
      mensaje += ` Detalle: ${error.error.message}`;
    } else if (error?.error?.mensaje) {
      mensaje += ` Detalle: ${error.error.mensaje}`;
    } else if (error?.message) {
      mensaje += ` Detalle: ${error.message}`;
    } else if (typeof error?.status !== 'undefined') {
      mensaje += ` Código HTTP: ${error.status}`;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje
    });
  }
}

  

  validarCamposNuevaPersona(): string[] {
    const errores: string[] = [];
    // Validar la estructura de la cédula (Frontend)
    if (!this.strCedula) {
      errores.push(this.mensajes.IngreseCedula);
    } else if (!this.funciones.validarCedula(this.strCedula)) {
      errores.push(this.mensajes.CedulaInvalida);
    }

    if (!this.strNombre) {
      errores.push(this.mensajes.IngreseNombre);
    }

    if (!this.strApellidos) {
      errores.push(this.mensajes.IngreseApellidos);
    }

    if (!this.strCelular) {
      errores.push(this.mensajes.IngreseCelular);
    }
    return errores;
  }

  cerrarModal(modal: string) {
    if (modal === 'ModalNuevaPersona') {
      this.visibleNuevaPersona = false;
      this.limpiarCampos()
    } else if (modal === 'ModalCambioEstado') {
      this.visibleModalCambioEstado = false;
      this.idPersonalSeleccionado = null;
      this.estadoActualSeleccionado = null;
    } else if (modal === 'ModalVerDatos') {
      this.visibleModalVerDatos = false;
      this.datosSeleccionados = null;
    } else if (modal === 'ModalEditarDatos') {
      this.visibleModalEditarDatos = false;
      this.datosEditar = {};
    }
  }

  // Método para cambiar el estado de un personal
  cambiarEstadoPersonal(idPersonal: any, estadoActual: any) {
    const blEstado = !estadoActual;

    (async () => {
      try {
        const resultado = await new Promise<any>((resolve, reject) => {
          this.serviciosCentral.ActualizarEstadoPersonal(idPersonal, blEstado).subscribe({
            next: (response) => resolve(response),
            error: (error) => reject(error)
          });
        });

        if (resultado.success) {
          await this.ListadoPersonal();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Estado actualizado correctamente.',
          });
          this.cerrarModal('ModalCambioEstado');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el estado.',
          });
        }
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al actualizar el estado.',
        });
      }
    })();
  }

  mostrarModalCambioEstado(personal: any) {
    this.idPersonalSeleccionado = personal.ouidpersonal;
    this.estadoActualSeleccionado = personal.ouorg_personal_blestado;
    this.visibleModalCambioEstado = true;
  }

  mostrarModalVerDatos(personal: any) {
    this.datosSeleccionados = personal;
    this.visibleModalVerDatos = true;
  }

  mostrarModalEditarDatos(personal: any) {
    this.datosEditar = { ...personal };

    const cargoEncontrado = this.lsCargos.find(
      (cargo) => cargo.label === personal.oustrnombre
    );
    this.cargoSeleccionado = cargoEncontrado ? cargoEncontrado.value : null;
    this.visibleModalEditarDatos = true;
  }

  async guardarDatosEditar() {
    try {
      if (!this.validarDatosEditar()) {
        return; // Detiene el guardado si hay errores
      }
      const user = await new Promise<any>((resolve, reject) =>
        this.servicios.ObtenerUsuarioDadoCorreoUsuario(this.datosEditar.oucorreo1).subscribe(resolve, reject)
      );
      if (user.datos[0]) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'El correo principal ya esta registrado.'
        });
        return
      }
      const objPersonal = {
        idPersonal: this.datosEditar.ouidpersonal,
        idPersona: this.datosEditar.ouidpersona,
        nombres: this.datosEditar.ounombres,
        apellidos: this.datosEditar.ouapellidos,
        correo1: this.datosEditar.oucorreo1,
        correo2: this.datosEditar.oucorreo2,
        celular1: this.datosEditar.oucelular1,
        celular2: this.datosEditar.oucelular2,
        idCargo: this.cargoSeleccionado,
        strDescripcion1: this.datosEditar.ouorg_personal_strdescripcion
      };

      const resultado = await new Promise<any>((resolve, reject) => {
        this.serviciosCentral.ActualizarPersonal({ objPersonal }).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
      });
      if (resultado.success) {
        await this.ListadoPersonal();
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Personal actualizado correctamente.',
        });
        this.cerrarModal('ModalEditarDatos');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el personal.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al actualizar el personal.',
      });
    }
  }

  validarDatosEditar(): boolean {
    if (!this.datosEditar.ounombres) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Nombres" no puede estar vacío.',
      });
      return false;
    }

    if (!this.datosEditar.ouapellidos) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Apellidos" no puede estar vacío.',
      });
      return false;
    }

    if (!this.datosEditar.oucorreo1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Correo Principal" no puede estar vacío.',
      });
      return false;
    }

    if (!this.datosEditar.oucelular1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Celular Principal" no puede estar vacío.',
      });
      return false;
    }

    if (!this.cargoSeleccionado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un "Cargo".',
      });
      return false;
    }

    if (!this.datosEditar.ouorg_personal_strdescripcion) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Descripción" no puede estar vacío.',
      });
      return false;
    }

    // Validar formato del correo principal
    if (!this.emailRegex.test(this.datosEditar.oucorreo1)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El "Correo Principal" no tiene un formato válido.',
      });
      return false;
    }

    if (
      this.datosEditar.oucorreo2 &&
      !this.emailRegex.test(this.datosEditar.oucorreo2)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El "Correo Secundario" no tiene un formato válido.',
      });
      return false;
    }

    if (!/^\d{10}$/.test(this.datosEditar.oucelular1)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El "Celular Principal" debe tener exactamente 10 dígitos y solo números.',
      });
      return false;
    }

    // Eliminar letras del número de Celular Secundario (si se proporciona)
    if (this.datosEditar.oucelular2) {
      if (!/^\d{10}$/.test(this.datosEditar.oucelular2)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El "Celular Secundario" debe tener exactamente 10 dígitos y solo números.',
        });
        return false;
      }
    }
    return true;
  }

  validarEntradaNumerica(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (
      charCode < 48 ||
      charCode > 57
    ) {
      if (![8, 9, 37, 39, 46].includes(charCode)) {
        event.preventDefault();
      }
    }
  }

  validarNuevaPersona(): boolean {
    if (!this.strCedula || this.strCedula.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Cédula" no puede estar vacío.' });
      return false;
    }

    if (!this.strNombre || this.strNombre.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Nombres" no puede estar vacío.' });
      return false;
    }

    if (!this.strApellidos || this.strApellidos.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Apellidos" no puede estar vacío.' });
      return false;
    }

    if (!this.strCorreo || this.strCorreo.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Correo Principal" no puede estar vacío.' });
      return false;
    }

    if (!this.emailRegex.test(this.strCorreo)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El "Correo Principal" no tiene un formato válido.' });
      return false;
    }

    if (this.strCorreoSecundario && !this.emailRegex.test(this.strCorreoSecundario)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El "Correo Secundario" no tiene un formato válido.' });
      return false;
    }

    if (!this.strCelular || this.strCelular.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Celular Principal" no puede estar vacío.' });
      return false;
    }

    if (!/^\d{10}$/.test(this.strCelular)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El "Celular Principal" debe tener exactamente 10 dígitos y solo números.' });
      return false;
    }

    if (this.strCelularSecundario && !/^\d{10}$/.test(this.strCelularSecundario)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El "Celular Secundario" debe tener exactamente 10 dígitos y solo números.' });
      return false;
    }

    if (!this.nuevaPersona.idcargo) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un "Cargo".' });
      return false;
    }

    if (!this.strDescripcion1 || this.strDescripcion1.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El campo "Descripción" no puede estar vacío.' });
      return false;
    }

    return true;
  }


} 