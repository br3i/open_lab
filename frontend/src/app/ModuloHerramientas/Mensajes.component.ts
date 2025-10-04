import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Mensajes {
  ActualizacionExitosa: string = "Actualización exitosa.";
  InformacionEncontrada: string = "Información encontrada.";
  ActualizacionError: string = "Error en la actualización.";
  ErrorServidor: string = "Ocurrió un error en el servidor.";
  RegistroExitoso: string = "Registro exitoso.";
  RegistroError: string = "Error en el registro.";
  ErrorServicio: string = "Error en el servicio web.";
  IngreseNombre: string = "Por favor, ingrese un nombre.";
  IngreseCedula: string = "Por favor, ingrese una cédula.";
  IngreseApellidos: string = "Por favor, ingrese los apellidos.";
  IngreseNombress: string = "Por favor, ingrese los nombres.";
  IngreseCorreo: string = "Por favor, ingrese un correo electrónico.";
  IngreseCelular: string = "Por favor, ingrese un número de teléfono celular.";
  IngreseDireccion: string = "Por favor, ingrese una dirección.";
  SelecionarProvincia: string = "Por favor, selecione una provincia.";
  SelecionarCanton: string = "Por favor, selecione un cantón.";
  SelecionarFechaCreacion: string = "Por favor, ingrese la fecha de creación de la organización.";
  IngreseCiudad: string = "Por favor, ingrese una ciudad.";
  AceptarCarta: string = "Por favor, acepte la carta de compromiso.";
  CedulaInvalida: string = "La cédula ingresada no es válida.";
  RUCInvalido: string = "El RUC ingresado no es válido.";
  CedulaExistente: string = "La cédula ingresada ya existe.";
  FotoExito: string = "Foto subida con éxito.";
  SubirFotoObligatorio: string = "Es obligatorio subir una foto.";
  AceptarTerminos: string = "Por favor, acepte los términos y condiciones.";
  IngresarActividad: string = "Por favor, ingrese la actividad económica de la empresa.";
  IngreseNombreEmpresa: string = "Por favor, ingrese el nombre de la empresa.";
  IngreseRUC: string = "Por favor, ingrese el RUC de la empresa.";
  IngreseTelefonoRepresentante: string = "Por favor, ingrese el número de teléfono celular del representante.";
  IngreseCorreoRepresentante: string = "Por favor, ingrese el correo electrónico del representante.";
  IngreseCelularRepresentante: string = "Por favor, ingrese la cédula del representante.";
  IngreseNombresRepresentante: string = "Por favor, ingrese los nombres del representante.";
  IngreseApellidosRepresentante: string = "Por favor, ingrese los apellidos del representante.";

}
