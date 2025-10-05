import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Importa la localización española
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';


import { InputSwitchModule } from 'primeng/inputswitch';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgInicioportadaComponent } from './Template/pg-inicioportada/pg-inicioportada.component';
import { HeaderpublicoComponent } from './Template/templatePublico/headerpublico/headerpublico.component';
import { FooterpublicoComponent } from './Template/templatePublico/footerpublico/footerpublico.component';
import { DashboardpublicoComponent } from './Template/templatePublico/dashboardpublico/dashboardpublico.component';
import { PortadainicialComponent } from './Template/templatePublico/portadainicial/portadainicial.component';
import { SpinnerService } from './ModuloServiciosWeb/spinner.service';
import { SpinnerInterceptor } from './ModuloServiciosWeb/InterceptorServicios.service';
import {  SpinnerComponent } from './ModuloServiciosWeb/spinner.component';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';  
import { BreadcrumbModule } from 'primeng/breadcrumb';


import { FooteradminComponent } from './Template/templateAdmin/footeradmin/footeradmin.component';
import { HeaderadminComponent } from './Template/templateAdmin/headeradmin/headeradmin.component';
import { MenuadminComponent } from './Template/templateAdmin/menuadmin/menuadmin.component';
import { DashboardadminComponent } from './Template/templateAdmin/dashboardadmin/dashboardadmin.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';

import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { SpinnerModule } from 'primeng/spinner';
import { TagModule } from 'primeng/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Para el cuadro de confirmación
import { MessageModule } from 'primeng/message'; // Para los mensajes
import { ConfirmationService, MessageService } from 'primeng/api'; // Servicios
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';

import { PgPrincipalempresaComponent } from './ModuloAdministracion/pg-principalempresa/pg-principalempresa.component';
import { PgTipoempresaComponent } from './ModuloAdministracion/pg-tipoempresa/pg-tipoempresa.component';
import { PgTiposolicitudComponent } from './ModuloAdministracion/pg-tiposolicitud/pg-tiposolicitud.component';
import { PgPublicempresaComponent } from './ModuloPublico/pg-publicempresa/pg-publicempresa.component';
import { PgRegistroempresaComponent } from './ModuloPublico/pg-registroempresa/pg-registroempresa.component';
import { PgempresaComponent } from './ModuloAdministracion/pg-empresas/pg-empresas.component';
import { PgempresaaceptadaComponent} from './ModuloAdministracion/pg-empresasaceptadas/pg-empresasaceptadas.component';
import { PgempresarechazadaComponent} from './ModuloAdministracion/pg-empresasrechazadas/pg-empresasrechazadas.component';
import { PgContratoComponent } from './ModuloAdministracion/pg-contrato/pg-contrato.component';
import { PgConvenioComponent } from './ModuloAdministracion/pg-convenio/pg-convenio.component';
import { PgPrincipalconvenioComponent } from './ModuloAdministracion/pg-principalconvenio/pg-principalconvenio.component';
import { PgGestioncontratoComponent } from './ModuloAdministracion/pg-gestioncontrato/pg-gestioncontrato.component';
import { PgConvenioFormularioComponent } from './ModuloAdministracion/pg-convenioformulario/pg-convenioformulario.component';
import { PgLoginComponent } from './ModuloPublico/pg-login/pg-login.component';
import { PgPublicloginComponent } from './ModuloPublico/pg-publiclogin/pg-publiclogin.component';
import { PgPrincipalseguridadComponent } from './ModuloSeguridad/pg-principalseguridad/pg-principalseguridad.component';
import { PgAdminrolesComponent } from './ModuloSeguridad/pg-adminroles/pg-adminroles.component';
import { PgAdminusuarioComponent } from './ModuloSeguridad/pg-adminusuario/pg-adminusuario.component';
import { PgConvenioeditarComponent } from './ModuloAdministracion/pg-convenioeditar/pg-convenioeditar.component';

import { FuncionesCompartidasServicio } from './ModuloHerramientas/funcionesCompartidas.servicio';

import { PgPrincipalperfilComponent } from './ModuloSeguridad/pg-principalperfil/pg-principalperfil.component';
import { PgPerfilComponent } from './ModuloSeguridad/pg-perfil/pg-perfil.component';
import { AvatarModule } from 'primeng/avatar';

import { PgEmpresaeditarComponent } from './ModuloAdministracion/pg-empresaeditar/pg-empresaeditar.component';
import { ModuloPagoComponent } from './modulo-pago/modulo-pago.component';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PgInicioportadaComponent,
    HeaderpublicoComponent,
    FooterpublicoComponent,
    DashboardpublicoComponent,
    PortadainicialComponent,
    FooteradminComponent,
    HeaderadminComponent,
    MenuadminComponent,
    DashboardadminComponent,
  
    PgPrincipalempresaComponent,
    PgTipoempresaComponent,
    PgTiposolicitudComponent,
    PgPublicempresaComponent,
    PgRegistroempresaComponent,
    PgempresaComponent,
    PgempresaaceptadaComponent,
    PgempresarechazadaComponent,

    PgConvenioComponent,
    PgContratoComponent,
    PgPrincipalconvenioComponent,
    PgGestioncontratoComponent,
    PgConvenioFormularioComponent,
    PgLoginComponent,
    PgPublicloginComponent,
    PgPrincipalseguridadComponent,
    PgAdminrolesComponent,
    PgAdminusuarioComponent,
    PgConvenioeditarComponent,
    PgPrincipalperfilComponent,
    PgPerfilComponent,

    PgEmpresaeditarComponent,
      ModuloPagoComponent,
 
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,SpinnerModule,
    CardModule,PanelMenuModule,TabViewModule,TableModule,ProgressSpinnerModule,AccordionModule,TagModule,ImageModule,AutoCompleteModule,
    InputTextModule,ToolbarModule,ButtonModule,MenubarModule,SlideMenuModule,DialogModule,DividerModule,ToastModule,FileUploadModule,DialogModule,
    ConfirmDialogModule,
    MessageModule,
    ButtonModule,
    ToastModule, DropdownModule, TreeTableModule, CalendarModule,
    MultiSelectModule,StepsModule,
    CheckboxModule,InputSwitchModule,
    DropdownModule,
    TieredMenuModule,
    AvatarModule,
    CommonModule,
    PanelModule,
    MenuModule, 
    BadgeModule, 
    BreadcrumbModule
  ],
  providers: [FuncionesCompartidasServicio,MessageService,SpinnerService,{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true} , {provide: LOCALE_ID, useValue: 'es-ES' } ],// Agrega el interceptor HTTP],
  bootstrap: [AppComponent]
})
export class AppModule { }  