import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiciosWebSeguridad } from '../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';

@Injectable({
  providedIn: 'root',
})
export class SesionUsuario {
  public roles: any[] = [];
  private idUsuario: string = '';
  public rolSeleccionadoSubject = new BehaviorSubject<any>(null);
  public rolSeleccionado$ = this.rolSeleccionadoSubject.asObservable();
  public datosSesionCache: any = null;

  public rolesActualizadosSubject = new Subject<void>();

  private datosUsuarioSubject = new BehaviorSubject<any>(null);
  public datosUsuario$ = this.datosUsuarioSubject.asObservable();

  private initPromise: Promise<void>; 
  private initialized = false;        

  constructor(private serviciosSeguridad: ServiciosWebSeguridad) {
    this.initPromise = this.desencriptarTokenAlInicio(); // 🔧 Ejecuta al construir
  }

  public setDatosUsuario(datos: any) {
    this.datosUsuarioSubject.next(datos);
  }

  public getDatosUsuarioActual(): any {
    return this.datosUsuarioSubject.value;
  }

  async iniciarSesion(usuario: string, password: string) {
    const response = await this.serviciosSeguridad.Login(usuario, password).toPromise();
    if (response && response.success) {
      this.idUsuario = response.idUsuario;
      const roles = await this.obtenerRoles(response.idUsuario);
      const token = await this.crearToken(usuario, roles);
      sessionStorage.setItem('authToken', token);
      return true;
    }
    return false;
  }

  async obtenerRoles(idUsuario: string) {
    const rolesResponse: any = await this.serviciosSeguridad.RolesUsuario(idUsuario).toPromise();
    this.roles = rolesResponse.roles;
    return this.roles;
  }

  private async crearToken(usuario: string, roles: any[]) {
    const tokenData = {
      idUsuario: this.idUsuario,
      usuario: usuario,
      roles: roles,
      idRolSeleccionado: roles.length > 0 ? roles[0] : null,
    };
    const jsonTokenData = JSON.stringify(tokenData);
    const encryptedTokenResponse = await this.serviciosSeguridad.EncriptarToken(jsonTokenData).toPromise();
    return encryptedTokenResponse?.encryptedToken;
  }

  async actualizarTokenConRolesNuevos(idUsuario: string) {
    const roles = await this.obtenerRoles(idUsuario);
    const token = await this.crearToken(this.idUsuario, roles);
    sessionStorage.setItem('authToken', token);
    this.rolesActualizadosSubject.next();
  }

  async obtenerToken() {
    await this.waitUntilInitialized(); 
    const encryptedToken = sessionStorage.getItem('authToken');
    if (!encryptedToken) {
      console.warn("No se encontró el token en sessionStorage");
      return null;
    }

    try {
      const decryptedTokenResponse = await this.serviciosSeguridad.DesencriptarToken(encryptedToken).toPromise();
      if (decryptedTokenResponse && decryptedTokenResponse.success) {
        const decryptedToken = decryptedTokenResponse.decryptedToken;
        return decryptedToken ? JSON.parse(decryptedToken) : null;
      } else {
        console.error("Error en la respuesta de desencriptación:", decryptedTokenResponse?.mensaje);
      }
    } catch (error) {
      console.error("Error al desencriptar el token:", error);
    }
    return null;
  }

  async cambiarRolSeleccionado(rol: any) {
    const token = await this.obtenerToken();
    if (token) {
      token.idRolSeleccionado = rol;
      const updatedTokenResponse = await this.serviciosSeguridad.EncriptarToken(JSON.stringify(token)).toPromise();
      sessionStorage.setItem('authToken', updatedTokenResponse?.encryptedToken);
      this.rolSeleccionadoSubject.next(rol);
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('authToken');
    this.roles = [];
    this.idUsuario = '';
    this.rolSeleccionadoSubject.next(null);
  }

  async desencriptarTokenAlInicio(): Promise<void> {
    if (this.initialized) return;

    const encryptedToken = sessionStorage.getItem('authToken');
    if (!encryptedToken) {
      this.datosSesionCache = null;
      this.initialized = true;
      return;
    }

    try {
      const decryptedTokenResponse = await this.serviciosSeguridad.DesencriptarToken(encryptedToken).toPromise();
      if (decryptedTokenResponse && decryptedTokenResponse.success) {
        const decryptedToken = JSON.parse(decryptedTokenResponse.decryptedToken);
        this.datosSesionCache = decryptedToken;
      } else {
        this.datosSesionCache = null;
      }
    } catch (error) {
      console.error("Error al desencriptar el token en APP_INITIALIZER:", error);
      this.datosSesionCache = null;
    }

    this.initialized = true;
  }

  public waitUntilInitialized(): Promise<void> {
    return this.initPromise;
  }
}

