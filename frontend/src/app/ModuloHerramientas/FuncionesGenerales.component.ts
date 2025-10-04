import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FuncionesGenerales {

  converBase64toBlob(content: any, contentType: any) {
    content = content.replace("data:application/pdf;base64,", "");
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = window.atob(content);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  // Función para formatear números a 2 decimales
  formatDecimal(value: number): number {
    return Number(value.toFixed(2));
  }

  validarCedula(cedula: string): boolean {
    // Eliminar espacios en blanco y guiones
    cedula = cedula.replace(/\s/g, '').replace(/-/g, '');

    // Verificar longitud
    if (cedula.length !== 10) {
      return false;
    }

    // Verificar que solo contenga números
    if (!/^\d+$/.test(cedula)) {
      return false;
    }

    // Verificar que los dos primeros dígitos representen un código de provincia válido
    const provincia = Number(cedula.substring(0, 2));
    if (provincia < 0 || provincia > 24) {
      return false;
    }

    // Verificar el último dígito (dígito verificador)
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    let dverificador = Number(cedula.charAt(9));

    for (let i = 0; i < 9; i++) {
      let valor = Number(cedula.charAt(i)) * coeficientes[i];
      suma += (valor > 9) ? valor - 9 : valor;
    }

    let residuo = suma % 10;
    let verificador = residuo ? 10 - residuo : residuo;

    return verificador === dverificador;
  }

  validarRucPersonaNatural(ruc: string): boolean {
    // Eliminar espacios en blanco y guiones
    ruc = ruc.replace(/\s/g, '').replace(/-/g, '');

    // Verificar longitud del RUC
    if (ruc.length !== 13) {
      return false;
    }
    // Verificar que solo contenga números
    if (!/^\d+$/.test(ruc)) {
      return false;
    }
    // Verificar que los primeros 10 dígitos sean una cédula válida
    const cedula = ruc.substring(0, 10);
    if (!this.validarCedula(cedula)) {
      return false;
    }
    // Verificar que el tercer dígito sea menor a 6
    const tercerDigito = Number(ruc.charAt(2));
    if (tercerDigito >= 6) {
      return false;
    }
    // Verificar que los últimos tres dígitos sean 001
    const establecimiento = ruc.substring(10, 13);
    if (establecimiento !== '001') {
      return false;
    }

    // Si pasa todas las validaciones, es un RUC válido
    return true;
  }

  validarRucSociedadPublica(ruc: string): boolean {
    // Eliminar espacios en blanco y guiones
    ruc = ruc.replace(/\s/g, '').replace(/-/g, '');

    // Verificar longitud del RUC
    if (ruc.length !== 13) {
      return false;
    }

    // Verificar que solo contenga números
    if (!/^\d+$/.test(ruc)) {
      return false;
    }

    // Verificar que el tercer dígito sea 6
    const tercerDigito = Number(ruc.charAt(2));
    if (tercerDigito !== 6) {
      return false;
    }

    // Verificar el dígito verificador utilizando un algoritmo específico para sociedades públicas
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
      suma += coeficientes[i] * Number(ruc.charAt(i));
    }

    const residuo = suma % 11;
    const digitoVerificador = residuo === 0 ? 0 : 11 - residuo;

    if (digitoVerificador !== Number(ruc.charAt(8))) {
      return false;
    }

    // Verificar que los últimos tres dígitos sean 001
    const establecimiento = ruc.substring(9, 13);
    if (establecimiento !== '001') {
      return false;
    }

    // Si pasa todas las validaciones, es un RUC válido
    return true;
  }

  validarRucSociedadPrivada(ruc: string): boolean {
    // Eliminar espacios en blanco y guiones
    ruc = ruc.replace(/\s/g, '').replace(/-/g, '');

    // Verificar longitud del RUC
    if (ruc.length !== 13) {
      return false;
    }

    // Verificar que solo contenga números
    if (!/^\d+$/.test(ruc)) {
      return false;
    }

    // Verificar que el tercer dígito sea 9
    const tercerDigito = Number(ruc.charAt(2));
    if (tercerDigito !== 9) {
      return false;
    }

    // Verificar el dígito verificador utilizando un algoritmo específico para sociedades privadas
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
      suma += coeficientes[i] * Number(ruc.charAt(i));
    }

    const residuo = suma % 11;
    const digitoVerificador = residuo === 0 ? 0 : 11 - residuo;

    if (digitoVerificador !== Number(ruc.charAt(9))) {
      return false;
    }

    // Verificar que los últimos tres dígitos sean 001
    const establecimiento = ruc.substring(10, 13);
    if (establecimiento !== '001') {
      return false;
    }

    // Si pasa todas las validaciones, es un RUC válido
    return true;
  }

  validarRuc(ruc: string): boolean {
    // Verificar si es RUC de persona natural
    if (this.validarRucPersonaNatural(ruc)) {
      return true;
    }

    // Verificar si es RUC de sociedad pública
    if (this.validarRucSociedadPublica(ruc)) {
      return true;
    }

    // Verificar si es RUC de sociedad privada
    if (this.validarRucSociedadPrivada(ruc)) {
      return true;
    }

    // Si no pasa ninguna validación, es un RUC inválido
    return false;
  }


}

