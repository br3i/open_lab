
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlServicios } from '../ModuloServiciosWeb/urlServiciosWeb.component';
@Injectable({
  providedIn: 'root'
})
export class ServiciosWeb {
  urlServiciosBancoAlimentos: String = "";
  user: any;
  authToken: any;
  constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
    this.urlServiciosBancoAlimentos = server.urlServicio;

  }

  //Área de Conocimiento

  ListadoAreaConocimientoActivosss() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoAreaConocimientoActivos')
  }

  ListadoAreaConocimiento() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesos/ListadoArea')
  }

  ActualizacionAreaConocimiento(idArea: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idArea + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesos/ActualizarArea' + parametros)
  }

  EstadoCambiarAreaConocimiento(idArea: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idArea + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesos/ActualizarAreaEstado' + parametros)
  }

  NuevoAreaConocimiento(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesos/CrearArea' + parametros)
  }

  //  ESTUDIOS
  ListadoEstudiosActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoEstudiosActivos')
  }

  ListadoEstudios() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaestudios/ListadoEstudios')

  }

  ActualizacionEstudios(idEstudios: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idEstudios + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaestudios/ActualizarEstudios' + parametros)
  }

  EstadoCambiarEstudios(idEstudios: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idEstudios + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaestudios/ActualizarEstudiosEstado' + parametros)
  }

  NuevoEstudios(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaestudios/CrearEstudios' + parametros)
  }

  //TIPO VOLUNTARIO

  ListadoTipoVoluntario() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipovoluntario/ListadoTipoVoluntario')
  }

  ActualizacionTipoVoluntario(idTipo: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipo + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipovoluntario/ActualizarTipoVoluntario' + parametros)
  }

  EstadoCambiarTipoVoluntario(idTipo: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipo + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipovoluntario/ActualizarTipoVoluntarioEstado' + parametros)
  }

  NuevoTipoVoluntario(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipovoluntario/CrearTipoVoluntario' + parametros)
  }

  //DISPONIBILIDAD

  ListadoDisponibilidad() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadisponibilidad/ListadoDisponibilidad')
  }

  ActualizacionDisponibilidad(idDisponibilidad: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDisponibilidad + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadisponibilidad/ActualizarDisponibilidad' + parametros)
  }

  EstadoCambiarDisponibilidad(idDisponibilidad: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDisponibilidad + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadisponibilidad/ActualizarDisponibilidadEstado' + parametros)
  }

  NuevoDisponibilidad(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadisponibilidad/CrearDisponibilidad' + parametros)
  }

  //SITUACION LABORAL

  ListadoSituacionLaboralActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoSituacionLaboralActivos')
  }

  ListadoSituacionLaboral() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasituacionlaboral/ListadoSituacionLaboral')
  }

  ActualizacionSituacionLaboral(idSituacion: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idSituacion + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasituacionlaboral/ActualizarSituacionLaboral' + parametros)
  }

  EstadoCambiarSituacionLaboral(idSituacion: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idSituacion + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasituacionlaboral/ActualizarSituacionLaboralEstado' + parametros)
  }

  NuevoSituacionLaboral(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasituacionlaboral/CrearSituacionLaboral' + parametros)
  }

  //DATOS ORGANIZACIÓN

  ListadoDatosOrganizacion() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ListadoDatosOrganizacion')
  }

  ActualizacionDatosOrganizacion(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ActualizarDatosOrganizacion', contenido)
  }

  EstadoCambiarDatosOrganizacion(idDatosOrganizacion: any, DatosOrganizacions_blestado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDatosOrganizacion + "/" + DatosOrganizacions_blestado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ActualizarDatosOrganizacionEstado' + parametros)
  }

  NuevoDatosOrganizacion(contenido: any) {

    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/CrearDatosOrganizacion', contenido)
  }

  ListadoCargoActivo() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacargos/ListadoCargoActivo')
  }

  //VOLUNTARIO Y OTROS

  ListadoTipoVoluntariado() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoTipoVoluntarioActivos')
  }

  ListadoTiempoDedicacionActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoTiempoDedicacionActivos')
  }

  IngresoPersona(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/IngresarPersona', contenido)
  }

  IngresoVoluntario(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/IngresoVoluntarios', contenido)
  }

  EncontrarVoluntario(idPersona: any, estadoVoluntario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona + "/" + estadoVoluntario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/EncontrarVoluntario' + parametros)
  }


  ListadoVoluntariosEstados(idEstado: any, estado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idEstado + "/" + estado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoVoluntariosEstados' + parametros)
  }

  ListadoVoluntariosTodosActivos(blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ListadoVoluntariosTodos' + parametros)
  }

  ListadoSexo() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ListadoSexo')
  }

  ObtenerFotoPersona(idPersona: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ObtenerPersonaFoto' + parametros)
  }


  ObtenerPersonaCedula(cedula: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + cedula;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ObtenerPersonaCedula' + parametros)
  }
  ObtenerPersonaId(Id: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + Id;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ObtenerPersonaId' + parametros)
  }

  ListadoEtnias() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ListadoEtniaActivas')
  }

  ActualizarPersona(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.put<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ActualizarPersona', contenido)
  }

  //TIPO DE DISCAPACIDADES
    ListadoTipoDiscapacidadActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipodiscapacidad/ListadoTipoDiscapacidadActivo')
  }

  ListadoEnfermedadActivo() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaenfermedad/ListadoEnfermedadActivo')
  }

    ListadoTipoBono() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutabeneficiario/ListadoTipoBono')
  }

ListadoTipoBienes(estado: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + estado;
  return this.hpptclient.get<any>(
    this.urlServiciosBancoAlimentos + '/rutabienes/ListadoTipoBienes' + parametros
  );
}

ListadoBienes(idTipoBien: any, estado: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idTipoBien + "/" + estado;
  return this.hpptclient.get<any>(
    this.urlServiciosBancoAlimentos + '/rutabienes/ListadoBienesPorTipo' + parametros
  );
}

  
}