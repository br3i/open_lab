import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametrosConfigurablesService {

  constructor() { }

    // Tipos de Entidad (fundaciones, fundaciones, etc.)
    tiposEntidad = {
      EMPRESA: 1,       // ID para fundaciones
      FUNDACION: 2,     // ID para fundaciones  
    };
  
    tiposDonante = {     
      NATURAL: 1,
      JURIDICO: 2, 
    };
    // Tipos de Solicitud (categorías de solicitudes en el sistema)
    tiposSolicitud = {
      ACEPTADO: 1,      
      PENDIENTE: 2,    
      RECHAZADO: 3,      
    };

    tipoCargo = {
      NULO:null,
      PRESIDENTE: 1, 
      ADMINISTRATIVO: 2,        
      OPERATIVO: 3,      
      VOLUNTARIO: 4,           
      PRACTICANTE: 5,         
      COORDINADOR_PROYECTO:6,
      LOGISTICO:7,
      REPRESENTANTE_LEGAL:8,
      DELEGADO_ENTREGA:9
    };

    estadoDonacion = {
      NULO:null,
      INGRESADO: 1,      
      CLASIFICADO: 2,    
      ENTREGADO: 3,      
      DISPONIBLE: 4,
      ASIGNADO: 5,
      NO_DISPONIBLE: 6,
      RECHAZADO: 7,
      PROCESO_ENTREGA:8 
  };
  
    estadoVoluntario = {
      POR_APROBAR: 1,      
      APROBADO: 2,    
      RECHAZADO: 3,      
    };
}
