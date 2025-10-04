import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlServicios } from '../ModuloServiciosWeb/urlServiciosWeb.component';

@Injectable({
  providedIn: 'root'
})
export class ServiciosWebSeguridad {
  urlServiciosBancoAlimentos: String = "";
  user: any;
  authToken: any;

  constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
    this.urlServiciosBancoAlimentos = server.urlServicio;
  }

  // Ruta Login
  Login(Usuario: any, Password: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + Usuario + "/" + Password;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutalogin/Login' + parametros);
  }

  // Ruta encriptar un token
  EncriptarToken(Token: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + Token; // Codificar token
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutalogin/EncriptarToken' + parametros);

  }

  // Ruta desencriptar un token
  DesencriptarToken(Token: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + Token; // Codificar token
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutalogin/DesencriptarToken' + parametros);
  }

  // Ruta para obtener Roles de Usuario
  RolesUsuario(idUsuario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idUsuario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/RolesUsuario' + parametros);
  }


  // Ruta Roles


  ListadoRoles() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutarol/ListadoRolTodos');
  }

  CrearRol(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutarol/CrearRol', contenido);
  }


  ActualizarRol(contenido: any) {
    return this.hpptclient.put<any>(this.urlServiciosBancoAlimentos + '/rutarol/ActualizarRol', contenido);
  }



  ActualizarRolEstado(idRol: any, blEstado: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Ajuste aquí
    let parametros = "/" + idRol + "/" + blEstado;
    return this.hpptclient.put(this.urlServiciosBancoAlimentos + '/rutarol/ActualizarRolEstado' + parametros, null, { headers }); // Sin cambiar mucho
  }




  ObtenerRolDadoId(idRol: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idRol;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutarol/ObtenerRolDadoId' + parametros);
  }

  //Eliminacion logica
  EliminarRegistroRol(idRol: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idRol;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutarol/EliminarRegistroRol' + parametros);
  }

  // Ruta Usuarios
  ListadoUsuarios() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ListadoUsuarioTodos');
  }

  ListadoUsuariosPersona() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ListadoUsuarioPersonaTodos');
  }
  CrearUsuario(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutausuario/CrearUsuario', contenido);
  }

  ActualizarUsuario(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.put<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ActualizarUsuario', contenido);
  }
  ActualizarUsuarioEstado(idUsuario: any, blEstado: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Ajuste aquí
    let parametros = "/" + idUsuario + "/" + blEstado;
    return this.hpptclient.put(this.urlServiciosBancoAlimentos + '/rutausuario/ActualizarUsuarioEstado' + parametros, null, { headers }); // Sin cambiar mucho
  }
  ObtenerUsuarioDadoId(idUsuario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idUsuario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ObtenerUsuarioDadoId' + parametros);
  }
  ObtenerUsuarioDadoNombreUsuario(nombreUsuario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + nombreUsuario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ObtenerUsuarioDadoNombreUsuario' + parametros);
  }
  ObtenerUsuarioDadoCorreoUsuario(correousuario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + correousuario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutausuario/ObtenerUsuarioDadoCorreoUsuario' + parametros);
  }

  

  // Ruta perfil

  ListadoPerfilTodos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaperfil/ListadoPerfilTodos');
  }

  ListadoPerfilUsuarioRoles(idUsuario: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idUsuario;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaperfil/ListadoPerfilUsuarioRoles' + parametros);
  }

  CrearPerfil(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaperfil/CrearPerfil', contenido);
  }

  ActualizarPerfilEstado(contenido: any) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.put(this.urlServiciosBancoAlimentos + '/rutaperfil/ActualizarPerfilEstado', contenido);
  }

  //Ruta correo
  RecuperarPassword(contenido: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutarecuperarpassword/recuperarPassword', contenido);
  }

}
