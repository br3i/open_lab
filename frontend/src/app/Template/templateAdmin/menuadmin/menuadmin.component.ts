import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SesionUsuario } from '../../../ModuloSesionUsuario/SesionUsuario';
import { Subscription } from 'rxjs';
import { VariablesRoles } from '../../../../Herramientas/Seguridad/ManejoRoles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [];
  public selectedMenuItem: string = ''; // Opción seleccionada
  public expandedItems: Set<MenuItem> = new Set(); // Usamos Set para controlar submenús expandidos
  public selectedItem: any = null;

  private rolSubscription: Subscription = new Subscription();
  private rolesActualizadosSubscription: Subscription = new Subscription();

  constructor(
    private sesionUsuario: SesionUsuario,
    private variablesRoles: VariablesRoles,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedMenuItem = localStorage.getItem('selectedMenuItem') || '';

    this.rolSubscription = this.sesionUsuario.rolSeleccionado$.subscribe((rolSeleccionado) => {
      this.actualizarMenu(rolSeleccionado);
    });

    this.rolesActualizadosSubscription = this.sesionUsuario.rolesActualizadosSubject.subscribe(() => {
      this.cargarRolActual();
    });

    this.cargarRolActual();
  }

  async cargarRolActual() {
    const token = await this.sesionUsuario.obtenerToken();
    const rolInicial = token?.idRolSeleccionado || null;
    this.actualizarMenu(rolInicial);
  }

  menuOpcionesBase: Record<number, { label: string; icon: string; routerLink?: string; items?: MenuItem[] }> = {
    1: { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/dashadmin/inicio' },
    2: { label: 'Administración', icon: 'pi pi-fw pi-cog', routerLink: '/dashadmin/principaladmin' },
    3: { label: 'Organización', icon: 'pi pi-fw pi-users', routerLink: '/dashadmin/principalorganizacion' },
    5: {
      label: 'Beneficiarios', icon: 'pi pi-heart',
      items: [
        {
          label: 'Fundación',
          icon: 'pi pi-building',
          routerLink: '/dashadmin//principalempresa'
        }
      ]
    },
    7: { label: 'Contratos', icon: 'pi pi-fw pi-file', routerLink: '/dashadmin/principalconvenio' },
    8: { label: 'Reportes', icon: 'pi pi-fw pi-chart-line', routerLink: '/dashadmin/principalreporte' },
    9: { label: 'Seguridad', icon: 'pi pi-fw pi-lock', routerLink: '/dashadmin/principalseguridad' }
  };

  opcionesPorRol = {
    [this.variablesRoles.Administrador]: [1, 2, 3, 5, 7, 8, 9],
    [this.variablesRoles.TecnicoAdmin]: [ 5, 7, 8, 9],
    [this.variablesRoles.Practicante]: [6, 9],
    [this.variablesRoles.TecnicoOperativo]: [5, 9],
    [this.variablesRoles.Voluntario]: [ 9],

  };

  actualizarMenu(rol: any) {
    const opcionesIds = this.opcionesPorRol[rol?.rol_id] || [];

    this.items = opcionesIds.map(id => {
      const opcion = this.menuOpcionesBase[id];
      const routerLink = opcion.routerLink || ''; // Asegura que routerLink no sea undefined

      return {
        ...opcion,
        styleClass: this.getActiveClass(routerLink), // Pasa el valor asegurado a getActiveClass
        command: () => {
          this.seleccionarOpcion(routerLink); // Pasa el valor asegurado a seleccionarOpcion
        }
      };
    });

    // Separador si hay elementos
    if (this.items.length > 0) {
      this.items.push({ separator: true });
    }

    // Redirigir a "Inicio" por defecto
    this.router.navigate(['/dashadmin/inicio']);
  }

  seleccionarOpcion(url: string) {
    this.selectedMenuItem = url;
    localStorage.setItem('selectedMenuItem', url);
    this.router.navigate([url]); // Navegar sin recargar
  }

  getActiveClass(url: string): string {
    return this.selectedMenuItem === url ? 'active-menu-item' : '';
  }

  toggleSubMenu(item: any) {
    if (this.expandedItems.has(item)) {
      this.expandedItems.delete(item);
      this.selectedItem = null;
    } else {
      this.expandedItems.clear();
      this.expandedItems.add(item);
      this.selectedItem = item;
    }
  }

  ngOnDestroy() {
    this.rolSubscription.unsubscribe();
    this.rolesActualizadosSubscription.unsubscribe();
  }

  trackByRouterLink(index: number, item: any): string {
    return item.routerLink;
  }
}
