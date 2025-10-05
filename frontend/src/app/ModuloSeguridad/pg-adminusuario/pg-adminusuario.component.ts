import { Component, OnInit } from '@angular/core';
import { ServiciosWebSeguridad } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { MessageService } from 'primeng/api';
import { SesionUsuario } from '../../ModuloSesionUsuario/SesionUsuario';
@Component({
  selector: 'app-pg-adminusuario',
  templateUrl: './pg-adminusuario.component.html',
  styleUrls: ['./pg-adminusuario.component.css'],
  providers: [MessageService],
})
export class PgAdminusuarioComponent implements OnInit {
  // Variables existentes
  lsUsuarios: any = [];
  lsRoles: any = [];
  objSeleccion: any = null;
  usuarioNombre: string = '';
  usuarioApellido: string = '';
  usuario: string = '';
  usuarioPassword: string = '';
  usuarioEstado: boolean = true;
  usuarioIdPersona: number | null = null;
  cedula: string = '';
  visibleNuevo: boolean = false;
  visibleEditar: boolean = false;
  mostrarPassword: boolean = false;
  mostrarPasswordVisual: boolean = false;
  visibleConfirmacion: boolean = false;
  mensajeConfirmacion: string = '';
  usuarioSeleccionado: any = null;
  visibleNuevaPersona: boolean = false;
  visibleRoles: boolean = false;
  cedulaValida: boolean = false;
  rolesSeleccionados: any[] = [];
  lsRolesUsuario: any[] = [];
  isLoadingRoles: boolean = false;
  confirmacionCreacionUsuario: boolean = false;
  confirmarPassword: string = '';
  visibleFormularioUsuario: boolean = false;
  visibleModalPassword: boolean = false;
  validacionesCompletas: boolean = false;
  mostrarValidaciones: boolean = false;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Estado de validaciones
  validaciones = {
    longitud: false,
    mayuscula: false,
    minuscula: false,
    numero: false,
    caracterEspecial: false
  };

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
    sexo: 1,
    strtiponombre: 'CEDULA'
  };

  constructor(
    private serviciosWeb: ServiciosWeb,
    private servicios: ServiciosWebSeguridad,
    private messageService: MessageService,
    private funcionesGenerales: FuncionesGenerales,
    private sesionUsuario: SesionUsuario
  ) { }

  async ngOnInit() {
    // Cargar listado de usuarios al inicializar
    await this.ListadoUsuarios();
    await this.ObtenerRoles(); // Llamamos al método para obtener los roles;
  }
  abrirModalFormularioUsuario() {
    this.visibleNuevo = false;
    this.visibleFormularioUsuario = true;
  }

  cerrarModalFormularioUsuario() {
    this.visibleFormularioUsuario = false;
    this.resetFormulario();
    this.cerrarModal();
  }
  // Método para listar usuarios
  async ListadoUsuarios() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ListadoUsuariosPersona().subscribe(resolve)
      );

      if (data.success) {
        this.lsUsuarios = data.datos.sort((a: any, b: any) => {
          return b.ouusuario_blestado - a.ouusuario_blestado;
        })
      }

      if (data.success) {
        this.lsUsuarios = data.datos;
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
  async ObtenerRolesUsuario(idUsuario: number) {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ListadoPerfilUsuarioRoles(idUsuario).subscribe(resolve)
      );

      if (data.success) {
        this.lsRolesUsuario = data.datos.map((rol: any) => ({
          ...rol,
          estadoOriginal: rol.ouperfil_blestado, // Guarda el estado original
        }));
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener los roles del usuario',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener los roles del usuario',
      });
    }
  }



  async abrirModalRoles(usuario: any) {
    this.usuarioSeleccionado = usuario; // Guarda el usuario seleccionado

    this.isLoadingRoles = true; // Inicia el estado de carga
    await this.ObtenerRolesUsuario(usuario.ouidusuario);
    this.isLoadingRoles = false; // Finaliza el estado de carga

    this.visibleRoles = true; // Abre el modal después de cargar los roles
  }

  ModalNuevoUsuario() {
    this.resetFormulario();
    this.visibleNuevo = true;
  }
  async ModalEditarUsuario(usuario: any) {
    this.objSeleccion = usuario;

    if (!usuario.ouusuario_idpersona) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El usuario no tiene un ID de persona asociado.',
      });
      return;
    }
    try {
      const data = await new Promise<any>((resolve) =>
        this.serviciosWeb.ObtenerPersonaId(usuario.ouusuario_idpersona).subscribe(resolve)
      );
      const dataUsuario = await new Promise<any>((resolve) =>
        this.servicios.ObtenerUsuarioDadoId(usuario.ouidusuario).subscribe(resolve)
      );
      if (data.success && data.datos.length > 0) {
        const persona = data.datos[0];
        const dUsuario = dataUsuario.datos[0];
        this.cargarDatosFormulario(persona, dUsuario);
        this.visibleEditar = true;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'No se encontraron datos del usuario.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener datos del usuario.',
      });
    }
  }
  async verificarCedula() {
    if (!this.cedula.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe ingresar una cédula antes de verificar.',
      });
      return;
    }
    if (!this.funcionesGenerales.validarCedula(this.cedula.trim())) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingrese un número de cedula valido.',
      });
      return;
    }
    try {
      const data = await new Promise<any>((resolve) =>
        this.serviciosWeb.ObtenerPersonaCedula(this.cedula).subscribe(resolve)
      );
      if (data.success && data.datos.length > 0) {
        const persona = data.datos[0];
        this.usuarioNombre = persona.nombres;
        this.usuarioApellido = persona.apellidos;
        this.usuarioIdPersona = persona.idpersona;
        this.cedulaValida = true; // Desbloquear campos
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos de la persona encontrados.',
        });
      } else {
        this.cedulaValida = false; // Mantener bloqueado
        this.messageService.add({
          severity: 'warn',
          summary: 'No encontrado',
          detail: 'No se encontraron datos con la cédula ingresada.',
        });
      }
    } catch (error) {
      this.cedulaValida = false; // Mantener bloqueado en caso de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al verificar la cédula.',
      });
    }
  }
  validarFormulario(): boolean {
    if (!this.cedula.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La cédula es obligatoria.',
      });
      return false;
    }
    if (!this.funcionesGenerales.validarCedula(this.cedula.trim())) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingrese un número de cedula valido.',
      });
      return false;
    }
    if (!this.usuario.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre de usuario es obligatorio.',
      });
      return false;
    }
    if (!this.usuarioPassword.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La contraseña es obligatoria',
      });
      return false;
    }
    if (!this.confirmarPassword.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La confirmación de contraseña es obligatoria.',
      });
      return false;
    }
    if (!this.usuarioNombre.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Los nombres son obligatorio.',
      });
      return false;
    }
    if (!this.usuarioNombre.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Los nombres son obligatorio.',
      });
      return false;
    }
    if (this.usuarioPassword !== this.confirmarPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden.',
      });
      return false;
    }
    if (!this.rolesSeleccionados || this.rolesSeleccionados.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar al menos un rol.',
      });
      return false;
    }
    return true;
  }


  validarFormularioEditar(): boolean {
    if (!this.usuario.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre de usuario es obligatorio.',
      });
      return false;
    }
    return true;
  }
  validarFormularioPersona(): boolean {
    if (!this.nuevaPersona.documento?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La cédula es obligatoria.',
      });
      return false;
    }

    if (!this.funcionesGenerales.validarCedula(this.nuevaPersona.documento?.trim())) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingrese un número de cedula valido.',
      });
      return false;
    }
    if (!this.nuevaPersona.nombres?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre es obligatorio.',
      });
      return false;
    }
    if (!this.nuevaPersona.nombres?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Nombres  obligatorio.',
      });
      return false;
    }
    if (this.nuevaPersona.nombres?.trim().length > 30) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Los nombres son muy extensos.',
      });
      return false;
    }
    if (!this.nuevaPersona.apellidos?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El apellido es obligatorio.',
      });
      return false;
    }
    if (this.nuevaPersona.apellidos?.trim().length > 30) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Los apellidos son muy extensos.',
      });
      return false;
    }
    if (!this.nuevaPersona.correo1?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El correo principal es obligatorio.',
      });
      return false;
    } else if (!this.emailRegex.test(this.nuevaPersona.correo1)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El correo principal no tiene un formato válido.',
      });
      return false;
    }
    if (!this.nuevaPersona.correo2?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El correo secundario es obligatorio.',
      });
      return false;
    } else if (!this.emailRegex.test(this.nuevaPersona.correo2)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El correo secundario no tiene un formato válido.',
      });
      return false;
    }
    if (!this.nuevaPersona.celular1?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El celular principal es obligatorio.',
      });
      return false;
    }
    if (this.nuevaPersona.celular1?.trim().length !== 10) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El celular principal debe tener 10 numeros.',
      });
      return false;
    }
    if (!this.nuevaPersona.celular2?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El celular secundario es obligatorio.',
      });
      return false;
    }
    if (this.nuevaPersona.celular2?.trim().length !== 10) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El celular secundario debe tener 10 numeros.',
      });
      return false;
    }
    if (!this.nuevaPersona.direccion?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La dirección es obligatoria.',
      });
      return false;
    }

    if (!this.nuevaPersona.edad) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La edad es obligatoria.',
      });
      return false;
    } else if (this.nuevaPersona.edad < 18) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La edad debe ser mayor a 18 años.',
      });
      return false;
    }

    if (!this.nuevaPersona.sexo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El sexo es obligatorio.',
      });
      return false;
    }


    // Si todos los campos son válidos
    return true;
  }

  validarSoloLetras(event: KeyboardEvent): void {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault(); // Bloquea caracteres no permitidos
    }
  }
  validarSoloNumeros(event: KeyboardEvent): void {
    const regex = /^[0-9]$/; // Solo permite números del 0 al 9
    const key = event.key;

    if (!regex.test(key)) {
      event.preventDefault(); // Evita que el carácter no permitido se ingrese
    }
  }
  async RegistrarNuevoUsuario() {

    if (!this.validarFormulario()) return;
    const user = await new Promise<any>((resolve, reject) =>
      this.servicios.ObtenerUsuarioDadoNombreUsuario(this.usuario).subscribe(resolve, reject)
    );
    if (user.datos[0]) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El usuario existe'
      });
      return
    }
    // Construir el objeto del nuevo usuario con el formato requerido
    const nuevoUsuario = {
      usuario_strnombre: this.usuario,
      usuario_strclave: this.usuarioPassword,
      usuario_idpersona: this.usuarioIdPersona,
      objPerfil: this.rolesSeleccionados
        .filter((idrol) => idrol) // Filtrar roles seleccionados válidos
        .map((idrol) => ({ idrol })) // Convertir cada rol en el formato { idrol: valor }
    };

    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.CrearUsuario({ objUsuario: nuevoUsuario }).subscribe(resolve)
      );

      if (data.success && data.datos) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario y roles registrados con éxito.'
        });
        this.visibleNuevo = false;
        this.resetFormulario();
        this.visibleFormularioUsuario = false;
        await this.ListadoUsuarios(); // Recargar la lista de usuarios
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al registrar el usuario.'
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al registrar el usuario.'
      });
    }
  }


  async ActualizarUsuario() {
    if (!this.validarFormularioEditar()) return;
    const usuarioActualizado = {
      idusuario: this.objSeleccion.ouidusuario,
      usuario_strclave: this.usuarioPassword,
      usuario_strnombre: this.usuario,
      usuario_idpersona: this.objSeleccion.ouusuario_idpersona,
    };

    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ActualizarUsuario({ objUsuario: usuarioActualizado }).subscribe(resolve)
      );
      if (data.success) {
        await this.ListadoUsuarios();
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario actualizado con éxito.',
        });
        this.visibleEditar = false;
        this.mostrarPassword = false;
        this.mostrarPasswordVisual = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el usuario.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar el usuario.',
      });
    }
  }

  cerrarModal() {
    this.visibleNuevo = false;
    this.cedula = '';
    this.usuarioNombre = '';
    this.usuarioApellido = '';
    this.cedulaValida = false;
    this.confirmacionCreacionUsuario = false;
    this.usuario = '';
    this.usuarioPassword = '';
    this.confirmarPassword = '';
    this.rolesSeleccionados = [];
  }

  resetFormulario() {
    this.visibleNuevo = false;
    this.usuarioNombre = '';
    this.usuarioApellido = '';
    this.usuario = '';
    this.usuarioPassword = '';
    this.confirmarPassword = '';
    this.usuarioIdPersona = null;
    this.cedula = '';
    this.usuarioEstado = true;
    this.rolesSeleccionados = []; // Limpiar roles seleccionados
    this.confirmacionCreacionUsuario = false;
  }

  cargarDatosFormulario(persona: any, usuario: any) {
    this.cedula = persona.documento;
    this.usuarioNombre = persona.nombres;
    this.usuarioApellido = persona.apellidos;
    this.usuario = usuario.ouusuario_strnombre;
    this.usuarioEstado = usuario.ouusuario_blestado;
    this.usuarioIdPersona = persona.idpersona;
  }

  ActualizarEstadoUsuario(usuario: any) {
    if (!usuario || usuario.ouidusuario === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario no seleccionado o ID inválido.',
      });
      return;
    }
    this.usuarioSeleccionado = usuario;
    this.mensajeConfirmacion = `¿Está seguro de ${usuario.ouusuario_blestado ? 'desactivar' : 'activar'} el usuario "${usuario.ouusuario_strnombre}"?`;
    this.visibleConfirmacion = true;
  }
  async ConfirmarCambioEstadoUsuario() {
    if (!this.usuarioSeleccionado) return;
    this.usuarioSeleccionado.ouusuario_blestado = !this.usuarioSeleccionado.ouusuario_blestado;
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios
          .ActualizarUsuarioEstado(this.usuarioSeleccionado.ouidusuario, this.usuarioSeleccionado.ouusuario_blestado)
          .subscribe(resolve)
      );
      if (data.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Estado del usuario actualizado con éxito.',
        });
        await this.ListadoUsuarios();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el estado del usuario.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar el estado del usuario.',
      });
    } finally {
      this.visibleConfirmacion = false;
      this.usuarioSeleccionado = null;
    }
  }
  abrirModalNuevaPersona() {
    this.visibleNuevaPersona = true;
    this.resetNuevaPersona();
  }
  // Registrar la nueva persona
  async RegistrarNuevaPersona() {
    if (!this.validarFormularioPersona()) return;
    const user = await new Promise<any>((resolve, reject) =>
      this.servicios.ObtenerUsuarioDadoCorreoUsuario(this.nuevaPersona.correo1).subscribe(resolve, reject)
    );

    if (user.datos[0]) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El correo principal ya esta registrado.'
      });
      return
    }
    try {
      const response = await new Promise<any>((resolve, reject) =>
        this.serviciosWeb.IngresoPersona({ objPersona: this.nuevaPersona }).subscribe({
          next: resolve,
          error: reject,
        })
      );

      if (response.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Persona registrada con éxito.',
        });
        this.visibleNuevaPersona = false;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudo registrar la persona.', // Mensaje genérico si no se recibe más información.
        });
      }
    } catch (error: any) {
      // Manejar error específico con un mensaje personalizado
      if (error.error?.mensaje?.includes('documento ya está registrado')) {
        this.messageService.add({
          severity: 'warn', // Cambiamos el tipo a advertencia
          summary: 'Advertencia',
          detail: 'Esta cédula ya está registrada.', // Mensaje personalizado
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al registrar la persona.', // Mensaje genérico para errores desconocidos
        });
      }
    }
  }


  // Resetear los datos del formulario de nueva persona
  resetNuevaPersona() {
    this.nuevaPersona = {
      tipodocumento: 1,
      documento: '',
      nombres: '',
      apellidos: '',
      correo1: '',
      correo2: '',
      celular1: '',
      celular2: '',
      direccion: '',
      edad: null,
      sexo: 1,
      strtiponombre: 'CEDULA'
    };
  }
  // Método para obtener los roles
  async ObtenerRoles() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ListadoRoles().subscribe(resolve)
      );
      if (data.success) {
        this.lsRoles = data.datos;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener los roles',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en el servicio de roles',
      });
    }
  }

  async ActualizarEstadoRolesSeleccionados(idUsuario: any, rolesSeleccionados: any[]) {
    try {
      // Filtrar los roles cuyo estado ha cambiado
      const cambios = rolesSeleccionados
        .filter((rol) => rol.ouperfil_blestado !== rol.estadoOriginal)
        .map((rol) => ({
          idrol: rol.ouidrol,
          idusuario: idUsuario,
          blestado: rol.ouperfil_blestado,
        }));

      // Verificar si hay cambios que enviar
      if (cambios.length === 0) {
        this.messageService.add({
          severity: 'info',
          summary: 'Sin cambios',
          detail: 'No se han realizado cambios en los roles.',
        });
        return;
      }

      // Llamada al backend para actualizar en lote
      await new Promise<any>((resolve, reject) => {
        this.servicios.ActualizarPerfilEstado({ objPerfil: cambios }).subscribe(resolve, reject);
      });

      // Actualizar el token con los roles nuevos
      await this.sesionUsuario.actualizarTokenConRolesNuevos(idUsuario);

      // Mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Roles actualizados con éxito.',
      });

      // Cerrar el modal
      this.visibleRoles = false;
    } catch (error) {
      // Manejo de errores
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar los roles.',
      });
    }
  }



  validarContrasenaSegura(contrasena: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(contrasena);
  }

  // Método para abrir el modal
  ActualizarPasswordUsuario(usuario: any) {
    this.objSeleccion = usuario; // Guarda el usuario actual
    this.visibleModalPassword = true; // Abre el modal
    this.usuarioPassword = ''; // Limpia el campo de contraseña
    this.confirmarPassword = '';
  }

  // Método para cerrar el modal


  // Guardar la nueva contraseña
  async guardarNuevaPassword() {
    // Validar que los campos no estén vacíos
    if (!this.usuarioPassword || !this.confirmarPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Todos los campos son obligatorios.',
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.usuarioPassword !== this.confirmarPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden.',
      });
      return;
    }

    // Validar la estructura segura de la contraseña
    if (!this.validarContrasenaSegura(this.usuarioPassword)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La contraseña no cumple con los requisitos de seguridad.',
      });
      return;
    }
    // Construir objeto para enviar solo la contraseña actualizada
    const usuarioPasswordActualizada = {
      idusuario: this.objSeleccion.ouidusuario,
      usuario_strclave: this.usuarioPassword,
      usuario_strnombre: this.objSeleccion.ouusuario_strnombre,
      usuario_idpersona: this.objSeleccion.ouusuario_idpersona,
    };
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ActualizarUsuario({ objUsuario: usuarioPasswordActualizada }).subscribe(resolve)
      );

      if (data.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Contraseña actualizada con éxito.',
        });

        // Cerrar el modal y limpiar campos
        this.cerrarModalPassword();
        await this.ListadoUsuarios(); // Actualizar la lista de usuarios
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la contraseña.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar la contraseña.',
      });
    }
  }

  // Cerrar modal y limpiar campos
  cerrarModalPassword() {
    this.visibleModalPassword = false;
    this.usuarioPassword = '';
    this.confirmarPassword = '';
    this.mostrarPassword = false;
    this.mostrarPasswordVisual = false;
  }
  // Método para validar la contraseña
  validarPassword() {
    const password = this.usuarioPassword;

    this.validaciones.longitud = password.length >= 8;
    this.validaciones.mayuscula = /[A-Z]/.test(password);
    this.validaciones.minuscula = /[a-z]/.test(password);
    this.validaciones.numero = /[0-9]/.test(password);
    this.validaciones.caracterEspecial = /[@$!%*?&]/.test(password);

    // Verificar si todas las validaciones están completas
    this.validacionesCompletas = Object.values(this.validaciones).every((v) => v);
  }

  // Método para ocultar el tooltip después de un pequeño retraso
  ocultarValidaciones() {
    setTimeout(() => {
      this.mostrarValidaciones = false;
    }, 200);
  }

} 