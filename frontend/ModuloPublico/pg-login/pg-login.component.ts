import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SesionUsuario } from '../../ModuloSesionUsuario/SesionUsuario';
import { ServiciosWebSeguridad } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosSeguridad.component';

@Component({
  selector: 'app-pg-login',
  templateUrl: './pg-login.component.html',
  styleUrls: ['./pg-login.component.css'],
  providers: [MessageService]
})
export class PgLoginComponent {
  public username: string = "";
  public password: string = "";
  showPassword: boolean = false;
  public recoverUsername: string = '';
  public hiddenEmail: string = '';
  public Email: string = '';
  public verificationCode: string = '';
  public newPassword: string = '';
  public confirmNewPassword: string = '';
  public generatedCode: string = '';
  public userId: number | null = null;
  public idPersona: number | null = null;
  recoverModalVisible: boolean = false;
  public recoverOptionsModalVisible: boolean = false;
  public recoverByEmailModalVisible: boolean = false;
  public recoverEmail: string = ''; // Email ingresado para recuperación
  verificationModalVisible: boolean = false;
  newPasswordModalVisible: boolean = false;
  codeValid: boolean = false;
  mostrarValidaciones: boolean = false;
validacionesCompletas: boolean = false;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private sesionUsuario: SesionUsuario,
    private ServicioSerguridad: ServiciosWebSeguridad,
  ) { }
  resetRecoverData() {
    this.hiddenEmail = '';
    this.Email = '';
    this.verificationCode = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
    this.recoverModalVisible = false;
    this.verificationModalVisible = false;
    this.newPasswordModalVisible = false;
  }
  validaciones = {
    longitud: false,
    mayuscula: false,
    minuscula: false,
    numero: false,
    caracterEspecial: false,
  };
  async onLogin() {
    if (this.username && this.password) {
      try {
        const success = await this.sesionUsuario.iniciarSesion(this.username, this.password);
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso' });
          
          this.router.navigate(['/dashadmin/inicio']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas' });
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error. Por favor, intente de nuevo.' });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, ingrese su usuario y contraseña' });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  showRecoverModal() {
    this.resetRecoverData();
    this.recoverOptionsModalVisible = true;
  }
  openRecoverByUser() {
    this.recoverOptionsModalVisible = false;
    this.recoverModalVisible = true;
  }
  openRecoverByEmail() {
    this.recoverOptionsModalVisible = false;
    this.recoverByEmailModalVisible = true;
  }
  async searchUserEmail() {
    if (!this.recoverUsername) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un usuario válido' });
      return;
    }
    try {
      const user = await new Promise<any>((resolve, reject) =>
        this.ServicioSerguridad.ObtenerUsuarioDadoNombreUsuario(this.recoverUsername).subscribe(resolve, reject)
      );
      this.Email = user.datos[0].oucorreo1
      this.idPersona = user.datos[0].ouusuario_idpersona
      if (user.datos[0]) {

        this.hiddenEmail = this.maskEmail(user.datos[0].oucorreo1);
        this.userId = user.datos[0].ouidusuario;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario encontrado' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario no encontrado' });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al buscar el usuario' });
    }
  }
  async searchEmail() {
    if (!this.recoverEmail) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un correo válido' });
      return;
    }
    try {
      const user = await new Promise<any>((resolve, reject) =>
        this.ServicioSerguridad.ObtenerUsuarioDadoCorreoUsuario(this.recoverEmail).subscribe(resolve, reject)
      );

      if (user.datos.length>0) {
        this.recoverUsername = user.datos[0].ouusuario_strnombre
        this.Email = user.datos[0].oucorreo1
      this.idPersona = user.datos[0].ouusuario_idpersona
        this.hiddenEmail = user.datos[0].oucorreo1;
        this.userId = user.datos[0].ouidusuario;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Correo encontrado' });
        
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo no encontrado' });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al buscar el usuario' });
    }
  }
  async sendVerificationCode() {
    if (!this.Email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se ha encontrado un correo asociado. Por favor, busque un usuario válido.',
      });
      return;
    }
    this.messageService.add({
      severity: 'info',
      summary: 'Procesando...',
      detail: 'Enviando código de recuperación...',
    });
    try {
      const emailData = {
        receptor: this.Email,
      };
      const response = await new Promise<any>((resolve, reject) =>
        this.ServicioSerguridad.RecuperarPassword(emailData).subscribe(resolve, reject)
      );

      if (response.success) {
        this.generatedCode = response.codigo;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Código de recuperación enviado al correo.',
        });

        this.recoverModalVisible = false;
        this.recoverByEmailModalVisible = false;
        this.recoverEmail = ''
        setTimeout(() => {
          this.verificationModalVisible = true;
        }, 200);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.mensaje || 'No se pudo enviar el código de recuperación.',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al enviar el código de recuperación.',
      });
    }
  }
  async verifyCode() {
    // Comparar ambos códigos
    if (this.verificationCode.trim() === this.generatedCode.trim()) {
      this.codeValid = true;
      this.messageService.add({
        severity: 'success',
        summary: 'Código válido',
        detail: 'Ahora puedes cambiar tu contraseña.',
      });
      this.verificationModalVisible = false;
      this.newPasswordModalVisible = true;
      this.generatedCode = ""
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El código ingresado es incorrecto.',
      });
    }
  }
  async saveNewPassword() {
    if (!this.newPassword || this.newPassword.length < 6 || this.newPassword !== this.confirmNewPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden o son demasiado cortas',
      });
      return;
    }
    try {
      const userUpdate = {
        idusuario: this.userId,
        usuario_strnombre: this.recoverUsername,
        usuario_strclave: this.newPassword,
        usuario_idpersona: this.idPersona,
      };
      const success = await new Promise<boolean>((resolve, reject) =>
        this.ServicioSerguridad.ActualizarUsuario({ objUsuario: userUpdate }).subscribe(resolve, reject)
      );

      if (success) {
        this.newPasswordModalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contraseña actualizada correctamente' });
        this.userId = null;
        this.idPersona = null;
        this.recoverUsername = '';
        this.resetRecoverData();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la contraseña' });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al actualizar la contraseña' });
    }
  }
  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    const maskedName = name.slice(0, 4) + '*'.repeat(name.length - 2);
    return `${maskedName}@${domain}`;
  }
  ocultarValidaciones() {
    setTimeout(() => {
      this.mostrarValidaciones = false;
    }, 200);
  }
  validarPassword() {
    const password = this.newPassword;
  
    this.validaciones.longitud = password.length >= 8;
    this.validaciones.mayuscula = /[A-Z]/.test(password);
    this.validaciones.minuscula = /[a-z]/.test(password);
    this.validaciones.numero = /[0-9]/.test(password);
    this.validaciones.caracterEspecial = /[@$!%*?&]/.test(password);
  
    // Validar si todas las condiciones están completas
    this.validacionesCompletas = Object.values(this.validaciones).every((v) => v);
  }

  focusPassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.focus();
    }
  }
  
}
