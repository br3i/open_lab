import { Component, OnInit } from '@angular/core';
import { ServiciosWebSeguridad } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pg-adminroles',
  templateUrl: './pg-adminroles.component.html',
  styleUrls: ['./pg-adminroles.component.css'],
  providers: [MessageService],
})
export class PgAdminrolesComponent implements OnInit {
  lsRoles: any = []; // Lista de roles
  objSeleccion: any = {}; // Objeto seleccionado para editar
  rolCodigo: string = ''; // Código del rol
  rolNombre: string = ''; // Nombre del rol
  rolDescripcion: string = ''; // Descripción del rol
  rolEstado: boolean = true; // Estado del rol (activo/inactivo)
  visibleNuevo: boolean = false; // Mostrar modal para nuevo rol
  visibleEditar: boolean = false; // Mostrar modal para editar rol
  visibleConfirmacion: boolean = false; // Mostrar modal de confirmación
  mensajeConfirmacion: string = ''; // Mensaje de confirmación
  accionEstado: boolean = false; // Acción de estado a realizar (activar/desactivar)

  constructor(
    private servicios: ServiciosWebSeguridad,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.ListadoRoles(); // Cargar los roles al iniciar
  }

  async ListadoRoles() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ListadoRoles().subscribe(resolve)
      );
      if (data.success) {
        this.lsRoles = data.datos.sort((a: any, b: any) => {
          return b.ourol_blestado - a.ourol_blestado; 
        })
      }
      
       else {
        this.showMessage('error', 'Error', 'Error al listar roles');
      }
    } catch (error) {
      this.showMessage('error', 'Error', 'Error en el servicio de listado');
    }
  }

  ModalNuevoRol() {
    this.resetFormulario();
    this.visibleNuevo = true;
  }

  async RegistrarNuevoRol() {
    if (!this.validarFormulario()) return;
    const nuevoRol = {
      rol_strcodigo: this.rolCodigo,
      rol_strnombre: this.rolNombre,
      rol_strdescripcion: this.rolDescripcion,
    };
  
    try {

      const data = await new Promise<any>((resolve) =>
        this.servicios.CrearRol({ objRol: nuevoRol }).subscribe(resolve)
      );
      if (data.success) {
        await this.ListadoRoles();
        this.showMessage('success', 'Éxito', 'Rol registrado con éxito');
        this.visibleNuevo = false;
      } else {
        this.showMessage('error', 'Error', 'Error al registrar el rol');
      }
    } catch (error) {
      this.showMessage('error', 'Error', 'Error al registrar el rol');
    }
  }
  

  async ModalEditarRol(rol: any) {
    this.objSeleccion = rol;
    this.rolCodigo = rol.ourol_strcodigo;
    this.rolNombre = rol.ourol_strnombre;
    this.rolDescripcion = rol.ourol_strdescripcion;
    this.rolEstado = rol.ourol_blestado;
    this.visibleEditar = true;
  }

  async ActualizarRol() {
    if (!this.validarFormulario()) return;

    const rolActualizado = {
      idrol: this.objSeleccion.ouidrol,
      rol_strcodigo: this.rolCodigo,
    rol_strnombre: this.rolNombre,
    rol_strdescripcion: this.rolDescripcion,
      rol_blestado: this.rolEstado,
    };

    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ActualizarRol({ objRol: rolActualizado }).subscribe(resolve)
      );

      if (data.success) {
        await this.ListadoRoles();
        this.showMessage('success', 'Éxito', 'Rol actualizado con éxito');
        this.visibleEditar = false;
      } else {
        this.showMessage('error', 'Error', 'Error al actualizar el rol');
      }
    } catch (error) {
      this.showMessage('error', 'Error', 'Error al actualizar el rol');
    }
  }

  ConfirmarCambioEstado(rol: any) {
    this.objSeleccion = rol;
    this.accionEstado = !rol.ourol_blestado;
    this.mensajeConfirmacion = `¿Está seguro de ${
      this.accionEstado ? 'activar' : 'desactivar'
    } el rol ${rol.ourol_strnombre}?`;
    this.visibleConfirmacion = true;
  }

  async CambiarEstadoRol() {
    try {
      const data = await new Promise<any>((resolve) =>
        this.servicios.ActualizarRolEstado(this.objSeleccion.ouidrol, this.accionEstado).subscribe(resolve)
      );

      if (data.success) {
        await this.ListadoRoles();
        this.showMessage(
          'success',
          'Éxito',
          `El rol fue ${this.accionEstado ? 'activado' : 'desactivado'} con éxito`
        );
      } else {
        this.showMessage('error', 'Error', 'Error al cambiar el estado');
      }
    } catch (error) {
      this.showMessage('error', 'Error', 'Error en el servicio de cambio de estado');
    } finally {
      this.visibleConfirmacion = false;
    }
  }

  validarFormulario(): boolean {
    const campos = [
      { valor: this.rolCodigo, mensaje: 'El campo Código es obligatorio' },
      { valor: this.rolNombre, mensaje: 'El campo Nombre es obligatorio' },
      { valor: this.rolDescripcion, mensaje: 'El campo Descripción es obligatorio' },
    ];
    for (const campo of campos) {
      if (!campo.valor.trim()) {
        this.showMessage('warn', 'Advertencia', campo.mensaje);
        return false;
      }
    }
    return true;
  }
  

  resetFormulario() {
    this.rolCodigo = '';
    this.rolNombre = '';
    this.rolDescripcion = '';
    this.rolEstado = true;
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
