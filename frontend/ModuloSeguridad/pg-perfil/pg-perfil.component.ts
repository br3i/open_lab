import { Component, OnInit } from '@angular/core';
import { SesionUsuario } from '../../ModuloSesionUsuario/SesionUsuario';
import { ServiciosWebSeguridad } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';

@Component({
  selector: 'app-pg-perfil',
  templateUrl: './pg-perfil.component.html',
  styleUrls: ['./pg-perfil.component.css']
})
export class PgPerfilComponent implements OnInit {
  usuario: any = {};
  nombres: string = 'Cargando...';
  apellidos: string = 'Cargando...';
  correo: string = 'Cargando...';
  direccion: string = 'Cargando...';
  nombreUsuario: string = 'Cargando...';

  fotoPerfil: string | ArrayBuffer | null = null;

  constructor(
    private sesionUsuario: SesionUsuario, 
    private ServiciosSeguridad: ServiciosWebSeguridad
  ) {}

  async ngOnInit() {
    await this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    try {
      let token = await this.sesionUsuario.obtenerToken();
      
      if (!token || !token.usuario) {  
          console.warn("Token no válido o usuario no definido.");
          return;
      }

      // Llamar al servicio
      const response = await new Promise<any>((resolve, reject) => {
        this.ServiciosSeguridad.ObtenerUsuarioDadoNombreUsuario(token.usuario).subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
      });

      if (!response?.success) {
          console.warn("Error al obtener los datos del usuario. Respuesta de la API:", response);
          return;
      }

      if (response.datos?.length > 0) {
        const userData = response.datos[0]; // Primer resultado
        this.usuario = userData;
        this.nombres = userData.ounombres ?? 'No disponible';
        this.direccion = userData.oudireccion ?? 'No disponible';
        this.apellidos = userData.ouapellidos ?? 'No disponible';
        this.correo = userData.oucorreo1 ?? 'No disponible';
        this.nombreUsuario = userData.ouusuario_strnombre ?? 'No disponible';
      }

    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }


  seleccionarFoto() {
    const input = document.getElementById('fotoPerfil') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  cambiarFotoPerfil(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        this.fotoPerfil = (e.target as FileReader).result;
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  

}
