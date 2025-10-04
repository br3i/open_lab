module.exports = {
  tipoEntidad: {
    EMPRESA: 1,       // ID para empresas
    FUNDACION: 2,     // ID para fundaciones
  },

  // Tipos de Solicitud (categorías de solicitudes en el sistema)
  tipoSolicitud: {
    ACEPTADO: 1,
    PENDIENTE: 2,
    RECHAZADO: 3,
  },

  tipoCargo: {
    NULO: null,
    PRESIDENTE: 1,
    ADMINISTRATIVO: 2,
    OPERATIVO: 3,
    VOLUNTARIO: 4,
    PRACTICANTE: 5,
    COORDINADOR_PROYECTO: 6,
    LOGISTICO: 7,
    REPRESENTANTE_LEGAL: 8
  },


  estadoDonacion: {
    NULO: null,
    INGRESADO: 1,
    CLASIFICADO: 2,
    ENTREGADO: 3,
    DISPONIBLE: 4,
    ASIGNADO: 5,
    NO_DISPONIBLE: 6,
    RECHAZADO: 7,
    PROCESO_ENTREGA: 8
  },

  tiposDonante: {
    NATURAL: 1,
    JURIDICO: 2,
  },

  //Terminos y Condiciones 
  tiposTerminos: {
    terminos_voluntario: 1,
    carta_voluntario: 2,
  }
};
