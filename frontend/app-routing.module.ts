import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgInicioportadaComponent } from './Template/pg-inicioportada/pg-inicioportada.component';
import { DashboardpublicoComponent } from './Template/templatePublico/dashboardpublico/dashboardpublico.component';
import { DashboardadminComponent } from './Template/templateAdmin/dashboardadmin/dashboardadmin.component';
import { PortadainicialComponent } from './Template/templatePublico/portadainicial/portadainicial.component';
import { PgPublicvoluntarioComponent } from './ModuloPublico/pg-publicvoluntario/pg-publicvoluntario.component';
import { PgPublicbeneficiarioComponent } from './ModuloPublico/pg-publicbeneficiario/pg-publicbeneficiario.component';
import { PgPublicempresaComponent } from './ModuloPublico/pg-publicempresa/pg-publicempresa.component';
import { PgPrincipaladministracionComponent } from './ModuloAdministracion/pg-principaladministracion/pg-principaladministracion.component';
import { PgVoluntariosprincipalComponent } from './ModuloAdministracion/pg-voluntariosprincipal/pg-voluntariosprincipal.component';
import { AuthGuard } from './modulo-seguridad/auth.guard'

import { PgPrincipalempresaComponent } from './ModuloAdministracion/pg-principalempresa/pg-principalempresa.component';
import { PgPublicloginComponent } from './ModuloPublico/pg-publiclogin/pg-publiclogin.component';
import { PgPrincipalseguridadComponent } from './ModuloSeguridad/pg-principalseguridad/pg-principalseguridad.component';
import { PgPrincipalperfilComponent } from './ModuloSeguridad/pg-principalperfil/pg-principalperfil.component';

import { PgAdminusuarioComponent } from './ModuloSeguridad/pg-adminusuario/pg-adminusuario.component';
import { PgPerfilComponent } from './ModuloSeguridad/pg-perfil/pg-perfil.component';

import { PgAdminrolesComponent } from './ModuloSeguridad/pg-adminroles/pg-adminroles.component';
import { PgPrincipalorganizacionComponent } from './ModuloAdministracion/pg-principalorganizacion/pg-principalorganizacion.component';
import { PgPrincipalconvenioComponent } from './ModuloAdministracion/pg-principalconvenio/pg-principalconvenio.component';

import { PgContratoComponent } from './ModuloAdministracion/pg-contrato/pg-contrato.component';
import { PgConvenioComponent } from './ModuloAdministracion/pg-convenio/pg-convenio.component';
import { PgConvenioFormularioComponent } from './ModuloAdministracion/pg-convenioformulario/pg-convenioformulario.component';
import { PgConvenioeditarComponent } from './ModuloAdministracion/pg-convenioeditar/pg-convenioeditar.component';
import { PgGestioncontratoComponent } from './ModuloAdministracion/pg-gestioncontrato/pg-gestioncontrato.component';
import { PgPrincipalrecepciondonacionComponent } from './ModuloRecepcionDonacion/pg-principalrecepciondonacion/pg-principalrecepciondonacion.component';
import { PgRecepcionformularioComponent } from './ModuloRecepcionDonacion/pg-recepcionformulario/pg-recepcionformulario.component';
import { PgRegistrobeneficiarioComponent } from './ModuloPublico/pg-registrobeneficiario/pg-registrobeneficiario.component';
import { PgRegistrofundacionComponent } from './ModuloPublico/pg-registrofundacion/pg-registrofundacion.component';

import { PgRecepcionconvenioComponent } from './ModuloRecepcionDonacion/pg-recepcionconvenio/pg-recepcionconvenio.component';
import { PgDonacionlistarComponent } from './ModuloRecepcionDonacion/pg-donacionlistar/pg-donacionlistar.component';
import { PgDatosorganizacionComponent } from './ModuloAdministracion/pg-datosorganizacion/pg-datosorganizacion.component';
import { PgPersonalorganizacionComponent } from './ModuloAdministracion/pg-personalorganizacion/pg-personalorganizacion.component';

import { PgTipoempresaComponent } from './ModuloAdministracion/pg-tipoempresa/pg-tipoempresa.component';
import { PgTiposolicitudComponent } from './ModuloAdministracion/pg-tiposolicitud/pg-tiposolicitud.component';
import { PgempresaComponent } from './ModuloAdministracion/pg-empresas/pg-empresas.component';
import { PgempresaaceptadaComponent } from './ModuloAdministracion/pg-empresasaceptadas/pg-empresasaceptadas.component';
import { PgempresarechazadaComponent } from './ModuloAdministracion/pg-empresasrechazadas/pg-empresasrechazadas.component';
import { PgEmpresaeditarComponent } from './ModuloAdministracion/pg-empresaeditar/pg-empresaeditar.component';
import { PgRegistroempresaComponent } from './ModuloPublico/pg-registroempresa/pg-registroempresa.component';

import { PgInicioComponent } from './ModuloAdministracion/pg-inicio/pg-inicio.component';

import { PgPrincipaldonantepersonaComponent } from './ModuloAdministracion/pg-principaldonantepersona/pg-principaldonantepersona.component';


import { PgPrincipalfundacionComponent } from './ModuloAdministracion/pg-principalfundacion/pg-principalfundacion.component';
import { PgFundacionpendienteComponent } from './ModuloAdministracion/pg-fundacionpendiente/pg-fundacionpendiente.component';
import { PgFundacionaceptadoComponent } from './ModuloAdministracion/pg-fundacionaceptado/pg-fundacionaceptado.component';
import { PgFundaciorechazadoComponent } from './ModuloAdministracion/pg-fundaciorechazado/pg-fundaciorechazado.component';


import { PgReportedonacionComponent } from './ModuloReporte/pg-reportedonacion/pg-reportedonacion.component';
import { PgPrincipalreporteComponent } from './ModuloReporte/pg-principalreporte/pg-principalreporte.component';

import { PgClasificaciondonacionComponent } from './ModuloClasificacion/pg-clasificaciondonacion/pg-clasificaciondonacion.component';
import { PgListardistribucionfundacionComponent } from './ModuloDistribucion/pg-listardistribucionfundacion/pg-listardistribucionfundacion.component';
import { PgDonacionfundacionComponent } from './ModuloDistribucion/pg-donacionfundacion/pg-donacionfundacion.component';
import { PgRegistropersonaComponent } from './ModuloPublico/pg-registropersona/pg-registropersona.component';
import { PgDonantepersonaComponent } from './ModuloAdministracion/pg-donantepersona/pg-donantepersona.component';
import { PgKitslistarComponent } from './ModuloClasificacion/pg-kitslistar/pg-kitslistar.component';
import { PgFundacioneditarComponent } from './ModuloAdministracion/pg-fundacioneditar/pg-fundacioneditar.component';
import { PgVoluntariosadminComponent } from './ModuloAdministracion/pg-voluntariosadmin/pg-voluntariosadmin.component';
import { PgVoluntarioaceptadoComponent } from './ModuloAdministracion/pg-voluntarioaceptado/pg-voluntarioaceptado.component';
import { PgVoluntariorechazadoComponent } from './ModuloAdministracion/pg-voluntariorechazado/pg-voluntariorechazado.component';
import { PgRegistrovoluntarioComponent } from './ModuloPublico/pg-registrovoluntario/pg-registrovoluntario.component';
import { PgClasificarfundacionComponent } from './ModuloClasificacion/pg-clasificarfundacion/pg-clasificarfundacion.component';


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
        path: 'registrovoluntario',
        component: PgPublicvoluntarioComponent
      },
      {
        path: 'registrobeneficiario',
        component: PgPublicbeneficiarioComponent
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
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }

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
        path: 'principaladmin',
        component: PgPrincipaladministracionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'principalorganizacion',
        component: PgPrincipalorganizacionComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listadoscentros',
            component: PgDatosorganizacionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'personal',
            component: PgPersonalorganizacionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'listadoscentros',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'principaladminvoluntario',
        component: PgVoluntariosprincipalComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'voluntariosolicitud',
            component: PgVoluntariosadminComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'voluntarioaceptado',
            component: PgVoluntarioaceptadoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'voluntariorechazado',
            component: PgVoluntariorechazadoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'registrovoluntario',
            component: PgRegistrovoluntarioComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'voluntariosolicitud',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'principaldonantepersona',
        component: PgPrincipaldonantepersonaComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'donanteaceptado',
            component: PgDonantepersonaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'registrodonante',
            component: PgRegistropersonaComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'donanteaceptado',
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
        path: 'principalperfil',
        component: PgPrincipalperfilComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'pg-perfil', pathMatch: 'full' }, // Redirección por defecto
          { path: "pg-perfil", component: PgPerfilComponent },
        ],
      },
      {
        path: 'principalrecepciondonacion',
        component: PgPrincipalrecepciondonacionComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "conveniovigente", component: PgRecepcionconvenioComponent },
          { path: "recepcionformulario", component: PgRecepcionformularioComponent },
          { path: "donacionlistar", component: PgDonacionlistarComponent },
          { path: "clasificardonacion", component: PgClasificaciondonacionComponent },
          { path: "clasificarfundacion", component: PgClasificarfundacionComponent},
          { path: "kitslistar", component: PgKitslistarComponent },
          { path: "distribucionfundacionlistar", component: PgListardistribucionfundacionComponent },
          { path: "donacionfundacion", component: PgDonacionfundacionComponent },
          { path: '', redirectTo: 'conveniovigente', pathMatch: 'full' }, // Redirección por defecto
        ],
      },
      {
        path: 'principalreporte',
        component: PgPrincipalreporteComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "reportedonacion", component: PgReportedonacionComponent },

          { path: '', redirectTo: 'reportedonacion', pathMatch: 'full' }, // Redirección por defecto
        ],
      },
      {
        path: 'principalfundacion',
        component: PgPrincipalfundacionComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'fundacionpendiente',
            component: PgFundacionpendienteComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'fundacionaceptado',
            component: PgFundacionaceptadoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'fundacionrechazado',
            component: PgFundaciorechazadoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'registrofundacion',
            component: PgRegistrofundacionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'fundacioneditar', component: PgFundacioneditarComponent, canActivate: [AuthGuard]

          }
        ]
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