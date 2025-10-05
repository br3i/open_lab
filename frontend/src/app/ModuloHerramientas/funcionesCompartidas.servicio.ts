import { Injectable } from '@angular/core';
import { ServiciosWebCentral } from '../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { ServiciviosVarios } from '../ModuloServiciosWeb/ServiciosBancosVarios.component';
import { MessageService } from 'primeng/api'; // Importa MessageService

@Injectable({
  providedIn: 'root',
})
export class FuncionesCompartidasServicio {
  constructor(
    private serviciosCentral: ServiciosWebCentral,
    private serviciosVarios: ServiciviosVarios,

    private messageService: MessageService // Inyecta MessageService
  ) {}

  // Obtener información de las entidades ya sea empresa o fundación
  async obtenerInformacionEmpresa(idDonante: number, idCoordinadorDon: number, idCargo: number | null = null): Promise<any> {
    if (!idDonante || !idCoordinadorDon) {
      console.error('Parámetros inválidos: idDonante o idCoordinadorDon no son válidos.');
      return null;
    }
  
    try {
      // Obtener datos de la empresa
      const empresaData = await new Promise<any>((resolve) =>
        this.serviciosCentral.ObtenerEmpresaDadoId(idDonante).subscribe(resolve)
      );
  
      // Validar datos de empresa
      if (!empresaData?.success || !empresaData?.datos?.length) {
        console.error('No se encontraron datos de la empresa.');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontraron datos de la empresa.',
        });
        return null;
      }
  
      // Obtener datos del representante
      const representanteData = await new Promise<any>((resolve) =>
        this.serviciosCentral.ObtenerRepresentanteEmpresa(idCoordinadorDon, idDonante, idCargo).subscribe(resolve)
      );
  
      // Validar datos de representante
      if (!representanteData?.success || !representanteData?.datos?.length) {
        console.error('No se encontraron datos del representante.');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontraron datos del representante.',
        });
        return null;
      }
  
      // Retornar los datos válidos
      return {
        empresa: empresaData.datos[0],
        representante: representanteData.datos[0],
      };
    } catch (error) {
      console.error('Error al obtener la información de la empresa:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al obtener la información de la empresa.',
      });
      return null;
    }
  }
  

   // Función compartida para validar solo letras
   validarSoloLetras(event: KeyboardEvent): void {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault(); // Bloquea caracteres no permitidos
    }
  }

  validarSoloNumeros(event: KeyboardEvent): void {
    const regex = /^[0-9]+$/; 
    if (!regex.test(event.key)) {
      event.preventDefault(); 
    }
  }
  
  validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    return regex.test(correo);
  }
    

  // Limpia datos jerárquicos
  limpiarDatos(selectedItem: any, items: any[], itemsFiltrados: any[]) {
    selectedItem = null;
    items.length = 0;
    itemsFiltrados.length = 0;
  }

  
  async obtenerUbicaciones(tipo: string, idPadre: number | null = null): Promise<any[]> {
  try {
    const data = await new Promise<any>((resolve, reject) => {
      this.serviciosVarios.ListarUbicaciones(tipo, idPadre).subscribe({
        next: resolve,
        error: reject
      });
    });
    // fuerza array
    return Array.isArray(data?.datos) ? data.datos : [];
  } catch (error) {
    console.error(`Error al obtener ${tipo}:`, error);
    return [];
  }
}



    // Carga detalle ubicacion desde el backend
    async DetalleUbicacion(idUbicacion: number | null = null): Promise<any[]> {
      try {
  
        const data = await new Promise<any>((resolve) => this.serviciosVarios.DetalleUbicacion(idUbicacion).subscribe((translated) => resolve(translated)) );
        return data.success ? data.datos : [];
      } catch (error) {
        console.error(`Error al obtener el detalle de la Ubicación:`, error);
        return [];
      }
    }

  // Filtra listas dinámicamente
  filtrarLista(lista: any[], query: string, campo: string): any[] {
    return lista.filter(item =>
      item[campo].toLowerCase().includes(query.toLowerCase())
    );
  }
  
}
