import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SesionUsuario } from '../../../ModuloSesionUsuario/SesionUsuario';
import { ServiciosWebSeguridad } from '../../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent implements OnInit, OnDestroy {
  rolesMenu: MenuItem[] = [];
  perfilItems: MenuItem[] = [];
  roles: any[] = [];
  rolActual: any;

  datosUsuario: any = {};
  nombreUsuario: string = 'Cargando...';  // 🔹 Simula carga inicial
  usuario: string = 'Cargando...';
  rolNombre: string = 'Cargando...';      // 🔹 Para el rol actual
  cargando: boolean = true;               // 🔹 Estado de carga

  private rolesSubscription: Subscription = new Subscription();

  constructor(
    private sesionUsuario: SesionUsuario,
    private router: Router,
    private ServiciosSeguridad: ServiciosWebSeguridad
  ) { }

  async ngOnInit() {
    await this.cargarDatosCompletos();

    this.rolesSubscription = this.sesionUsuario.rolesActualizadosSubject.subscribe(() => {
      this.cargarDatosCompletos();
    });
  }

  async cargarDatosCompletos() {
    try {
      this.cargando = true; // 🔹 Activa el estado de carga
      let token = await this.sesionUsuario.obtenerToken();

      const [usuarioData] = await Promise.all([
        new Promise<any>((resolve, reject) =>
          this.ServiciosSeguridad.ObtenerUsuarioDadoNombreUsuario(token.usuario).subscribe({
            next: (response) => resolve(response),
            error: (error) => reject(error),
          })
        )
      ]);

      if (usuarioData.success && usuarioData.datos.length > 0) {
        this.datosUsuario = usuarioData.datos[0];
        this.sesionUsuario.setDatosUsuario(this.datosUsuario);

      }

      this.roles = token.roles || [];
      this.rolActual = token.idRolSeleccionado || this.roles[0];
      this.rolNombre = this.rolActual?.rol_nombre || 'No asignado';  // 🔹 Evita valores vacíos
      this.nombreUsuario = `${this.datosUsuario.ounombres || ''} ${this.datosUsuario.ouapellidos || ''}`.trim();
      this.usuario = this.datosUsuario.ouusuario_strnombre || 'Usuario sin nombre';

      // 🔹 Filtrar la lista de roles para que NO muestre el rol actual en el menú
      this.rolesMenu = this.roles
        .filter(role => role.rol_nombre !== this.rolActual.rol_nombre)
        .map(role => ({
          label: role.rol_nombre,
          command: () => this.cambiarRol(role),
        }));

      this.perfilItems = [
        { label: 'Ver perfil', icon: 'pi pi-id-card', command: () => this.verPerfil() },
        { label: 'Cerrar sesión', icon: 'pi pi-fw pi-power-off', command: () => this.cerrarSesion() }
      ];
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    } finally {
      this.cargando = false; // 🔹 Desactiva el estado de carga al terminar
    }
  }

  verPerfil() {
    this.router.navigate(['/dashadmin/principalperfil']);

  }

  async cambiarRol(rol: any) {
    this.rolActual = rol;
    this.rolNombre = rol.rol_nombre;  // 🔹 Actualizar nombre inmediatamente
    await this.sesionUsuario.cambiarRolSeleccionado(rol);
    await this.cargarDatosCompletos();
  }

  cerrarSesion() {
    this.sesionUsuario.cerrarSesion();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
     window.location.href = '/dashpublic/login';

    });
  }


  ngOnDestroy() {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
  }
}