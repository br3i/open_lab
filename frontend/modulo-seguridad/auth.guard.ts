import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionUsuario } from '../ModuloSesionUsuario/SesionUsuario';  // Tu servicio de autenticación
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private sesionUsuario: SesionUsuario, private router: Router) {}
 
  async canActivate(): Promise<boolean> {
    const datosSesion = await this.sesionUsuario.obtenerToken();
 
    if (datosSesion && datosSesion.idUsuario) { // Verificamos si los datos de sesión existen y son válidos
      return true;
    } else {
      this.router.navigate(['/dashpublic/login']);
      return false;
    }
  }
}