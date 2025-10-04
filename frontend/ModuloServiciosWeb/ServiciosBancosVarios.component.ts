
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlServicios } from '../ModuloServiciosWeb/urlServiciosWeb.component';
@Injectable({
  providedIn: 'root'
})
export class ServiciviosVarios {
  urlServiciosBancoAlimentos: String = "";
  user: any;
  authToken: any;
  constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
    this.urlServiciosBancoAlimentos = server.urlServicio;

  }

  GenerarSolicitudVoluntario(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutareportes/pdfSolicitudVoluntarioss', contenido)
  }
  GenerarpdfTermino(idPersona: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutareportes/pdfTerminosCondiciones' + parametros)
  }
  ActualizarEstadoSolicitud(idVoluntario: any, idEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idVoluntario + "/" + idEstado + "/";
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ActualizarestadoVoluntario' + parametros)
  }
  GenerarpdfCartaAceptacion(idPersona: any, strCedula: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona + "/" + strCedula;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutareportes/pdfCartaAceptacion' + parametros)
  }
  ListadoEstadosCivilActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/EstadoCivilActivos')
  }
  ListadoParentescoActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/ParentezcoActivos')
  }
  ListadoTipoIngresoActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutavoluntarios/TipoIngresosActivos')
  }

  ListarUbicaciones(op:any,idPadre:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + op + "/" + idPadre;

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaubicacion/ListadoUbicaciones' + parametros)
  }

  DetalleUbicacion(idPadre:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPadre;

    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaubicacion/DetalleUbicacion' + parametros)
  }


}
