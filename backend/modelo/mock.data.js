const mockEjesData = [
  {
    nombreEje: "Nutrición",
    indicadores: [
      {
        nombreIndicador: "Personas alimentadas",
        meta: 1000000,
        unidadMedida: "personas",
        subIndicadores: [
          {
            nombreSubIndicador: "Recuperación de alimentos (Kilos)",
            meta: 50000,
            unidadMedida: "kg",
            medicionesMensuales: [
              { anio: 2024, mes: "Enero", valor: 4500, fundacion: "BAQ" },
              { anio: 2024, mes: "Febrero", valor: 4750, fundacion: "BAQ" },
              { anio: 2024, mes: "Enero", valor: 3100, fundacion: "BAA Cuenca" },
              { anio: 2025, mes: "Marzo", valor: 5100, fundacion: "BAQ" },
            ]
          },
          {
            nombreSubIndicador: "Donaciones monetarias para alimentos",
            meta: 100000,
            unidadMedida: "USD",
            medicionesMensuales: [
              { anio: 2024, mes: "Enero", valor: 8000, fundacion: "BAQ" },
              { anio: 2024, mes: "Febrero", valor: 7500, fundacion: "BAA Cuenca" },
              { anio: 2025, mes: "Abril", valor: 9500, fundacion: "BA Ibarra" },
            ]
          }
        ]
      },
      {
        nombreIndicador: "Reducción de Desnutrición Crónica",
        meta: 20,
        unidadMedida: "%",
        medicionesMensuales: [
          { anio: 2023, mes: "Diciembre", valor: 12, fundacion: "Fundación Salva a un Niño" },
          { anio: 2024, mes: "Junio", valor: 15, fundacion: "Fundación Salva a un Niño" },
          { anio: 2025, mes: "Junio", valor: 18, fundacion: "Fundación Salva a un Niño" },
        ]
      }
    ]
  },
  {
    nombreEje: "Equidad",
    indicadores: [
      {
        nombreIndicador: "Acceso a Educación",
        meta: 95,
        unidadMedida: "%",
        medicionesMensuales: [
          { anio: 2023, mes: "Noviembre", valor: 80, fundacion: "Fundación Pro-Educación" },
          { anio: 2024, mes: "Noviembre", valor: 88, fundacion: "Fundación Pro-Educación" },
          { anio: 2025, mes: "Noviembre", valor: 91, fundacion: "Fundación Pro-Educación" },
        ]
      },
       {
        nombreIndicador: "Reducción Brecha de Género",
        meta: 15,
        unidadMedida: "%",
        medicionesMensuales: [
          { anio: 2024, mes: "Julio", valor: 10, fundacion: "Fundación Mujer Hoy" },
          { anio: 2025, mes: "Julio", valor: 12, fundacion: "Fundación Mujer Hoy" },
        ]
      }
    ]
  },
  {
    nombreEje: "Sostenibilidad",
    indicadores: [
      {
        nombreIndicador: "Reducción de huella de carbono",
        meta: 25,
        unidadMedida: "%",
        medicionesMensuales: [
          { anio: 2024, mes: "Diciembre", valor: 18, fundacion: "General" },
          { anio: 2025, mes: "Diciembre", valor: 22, fundacion: "General" },
        ]
      }
    ]
  },
   {
    nombreEje: "Voluntariado",
    indicadores: [
      {
        nombreIndicador: "Horas de voluntariado",
        meta: 2000,
        unidadMedida: "horas",
        medicionesMensuales: [
          { anio: 2024, mes: "Marzo", valor: 150, fundacion: "BAQ" },
          { anio: 2024, mes: "Marzo", valor: 120, fundacion: "BAA Cuenca" },
          { anio: 2024, mes: "Abril", valor: 160, fundacion: "BAQ" },
          { anio: 2025, mes: "Mayo", valor: 200, fundacion: "BA Ibarra" },
        ]
      }
    ]
  }
];

module.exports = {
    mockEjesData // Exportamos la nueva estructura
};