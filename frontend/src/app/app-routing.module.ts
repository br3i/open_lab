import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgInicioportadaComponent } from './Template/pg-inicioportada/pg-inicioportada.component';
import { DashboardpublicoComponent } from './Template/templatePublico/dashboardpublico/dashboardpublico.component';
import { DashboardadminComponent } from './Template/templateAdmin/dashboardadmin/dashboardadmin.component';
import { PortadainicialComponent } from './Template/templatePublico/portadainicial/portadainicial.component';
import { PgPublicempresaComponent } from './ModuloPublico/pg-publicempresa/pg-publicempresa.component';
import { AuthGuard } from './modulo-seguridad/auth.guard'

import { PgPrincipalempresaComponent } from './ModuloAdministracion/pg-principalempresa/pg-principalempresa.component';
import { PgPublicloginComponent } from './ModuloPublico/pg-publiclogin/pg-publiclogin.component';
import { PgPrincipalseguridadComponent } from './ModuloSeguridad/pg-principalseguridad/pg-principalseguridad.component';
import { PgPrincipalperfilComponent } from './ModuloSeguridad/pg-principalperfil/pg-principalperfil.component';
import { PgPanelNaturalComponent } from './ModuloAdministracion/pg-panel-natural/pg-panel-natural.component';
import { PgAdminusuarioComponent } from './ModuloSeguridad/pg-adminusuario/pg-adminusuario.component';
import { PgPerfilComponent } from './ModuloSeguridad/pg-perfil/pg-perfil.component';

import { PgAdminrolesComponent } from './ModuloSeguridad/pg-adminroles/pg-adminroles.component';
import { PgPrincipalconvenioComponent } from './ModuloAdministracion/pg-principalconvenio/pg-principalconvenio.component';

import { PgContratoComponent } from './ModuloAdministracion/pg-contrato/pg-contrato.component';
import { PgConvenioComponent } from './ModuloAdministracion/pg-convenio/pg-convenio.component';
import { PgConvenioFormularioComponent } from './ModuloAdministracion/pg-convenioformulario/pg-convenioformulario.component';
import { PgConvenioeditarComponent } from './ModuloAdministracion/pg-convenioeditar/pg-convenioeditar.component';
import { PgGestioncontratoComponent } from './ModuloAdministracion/pg-gestioncontrato/pg-gestioncontrato.component';

import { PgTipoempresaComponent } from './ModuloAdministracion/pg-tipoempresa/pg-tipoempresa.component';
import { PgTiposolicitudComponent } from './ModuloAdministracion/pg-tiposolicitud/pg-tiposolicitud.component';
import { PgempresaComponent } from './ModuloAdministracion/pg-empresas/pg-empresas.component';
import { PgempresaaceptadaComponent } from './ModuloAdministracion/pg-empresasaceptadas/pg-empresasaceptadas.component';
import { PgempresarechazadaComponent } from './ModuloAdministracion/pg-empresasrechazadas/pg-empresasrechazadas.component';
import { PgEmpresaeditarComponent } from './ModuloAdministracion/pg-empresaeditar/pg-empresaeditar.component';
import { PgRegistroempresaComponent } from './ModuloPublico/pg-registroempresa/pg-registroempresa.component';

import { PgInicioComponent } from './ModuloAdministracion/pg-inicio/pg-inicio.component';
import { PgDashboardMultiComponent } from './ModuloAdministracion/pg-principalreporte/pg-dashboard-multi/pg-dashboard-multi.component';
import { PgPrincipalreporteComponent } from './ModuloAdministracion/pg-principalreporte/pg-principalreporte.component';
import { ReportedonacionComponent } from './ModuloAdministracion/pg-principalreporte/reportedonacion/reportedonacion.component';
import { ModuloPagoComponent } from './modulo-pago/modulo-pago.component';

import { PgPersonalorganizacionComponent } from './ModuloAdministracion/pg-personalorganizacion/pg-personalorganizacion.component';
import { PgPrincipalorganizacionComponent } from './ModuloAdministracion/pg-principalorganizacion/pg-principalorganizacion.component';
import { PgPrincipaladminComponent } from './ModuloAdministracion/pg-principaladmin/pg-principaladmin.component';
import { PgFormularioreporteComponent } from './ModuloAdministracion/pg-formularioreporte/pg-formularioreporte.component';

const routes: Routes = [
  {
    path: '',
    component: PgInicioportadaComponent
  },
  {
    path: 'dashpublic',
    component: DashboardpublicoComponent,
    children: [
      {
        path: 'inicio',
        component: PortadainicialComponent
      },
      {
        path: 'registroempresa',
        component: PgPublicempresaComponent
      },
      {
        path: 'login',
        component: PgPublicloginComponent
      },
      {
        path: 'pago',
        component: ModuloPagoComponent
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },


    ]
  },

  {
    path: 'dashadmin',
    component: DashboardadminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicioadmin',
        component: PortadainicialComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inicio',
        component: PgInicioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'principalorganizacion',
        component: PgPrincipalorganizacionComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'personal',
            component: PgPersonalorganizacionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'personal',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'principalempresa',
        component: PgPrincipalempresaComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'tipoempresa',
            component: PgTipoempresaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'tiposolicitud',
            component: PgTiposolicitudComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'empresapendiente',
            component: PgempresaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'empresaaceptado',
            component: PgempresaaceptadaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'empresarechazado',
            component: PgempresarechazadaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'registroempresa',
            component: PgRegistroempresaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'empresaeditar', component: PgEmpresaeditarComponent, canActivate: [AuthGuard]

          },
          {
            path: '',
            redirectTo: 'empresapendiente',
            pathMatch: 'full'
          }
        ]

      },
      {
        path: 'principalconvenio',
        component: PgPrincipalconvenioComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listadoconvenios',
            component: PgConvenioComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'convenionuevo',
            component: PgConvenioFormularioComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'convenioeditar',
            component: PgConvenioeditarComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'listadocontratos',
            component: PgContratoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'gestioncontrato',
            component: PgGestioncontratoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'listadoconvenios',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'principalseguridad',
        component: PgPrincipalseguridadComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'pg-adminusuario', pathMatch: 'full' }, // Redirección por defecto
          { path: "pg-adminusuario", component: PgAdminusuarioComponent },
          { path: "pg-adminroles", component: PgAdminrolesComponent },
        ],
      },
      {
        path: 'principalreporte',
        component: PgPrincipalreporteComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'reportedonacion', component: ReportedonacionComponent },
          { path: 'multi', component: PgDashboardMultiComponent },
          { path: 'dashboard-natural', component: PgPanelNaturalComponent },
          { path: '', redirectTo: 'reportedonacion', pathMatch: 'full' }
        ]
      },
      {
        path: 'principalperfil',
        component: PgPrincipalperfilComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'pg-perfil', pathMatch: 'full' }, // Redirección por defecto
          { path: "pg-perfil", component: PgPerfilComponent },
        ],
      },
      {
        path: 'principaladmin',
        component: PgPrincipaladminComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "pg-formularioreporte", component: PgFormularioreporteComponent },
        ],
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',       // <- habilita scroll automático a #fragment
      scrollPositionRestoration: 'enabled', // <- opcional: vuelve al scroll anterior al navegar
    }),
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
