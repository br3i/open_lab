import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api'; // Importar MessageService para notificaciones

interface Indicador {
  nombre: string;
  estado: 'Completado' | 'En Progreso' | 'Pendiente';
}

// Se añade la propiedad 'fundacion' a la interfaz
interface Proyecto {
  id: number;
  nombre: string;
  fundacion: string; // <-- NUEVA PROPIEDAD
  indicadores: Indicador[];
  progreso?: number;
  indicadoresCompletados?: number;
}

@Component({
  selector: 'app-pg-panel-progreso',
  templateUrl: './pg-panel-progreso.component.html',
  styleUrls: ['./pg-panel-progreso.component.css']
})
export class PgPanelProgresoComponent implements OnInit {

  proyectos: Proyecto[] = [];

  // Inyectamos el MessageService en el constructor
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Se añade el campo 'fundacion' a los datos de prueba
    const mockProjectsData: Proyecto[] = [
      {
        id: 1,
        nombre: "Iniciativa de Nutrición Infantil 2024",
        fundacion: "Fundación Salva a un Niño",
        indicadores: [
          { nombre: "Distribución de kits alimenticios", estado: "Completado" },
          { nombre: "Talleres de cocina saludable", estado: "Completado" },
          { nombre: "Seguimiento de peso y talla", estado: "En Progreso" },
          { nombre: "Reporte final de impacto", estado: "Pendiente" }
        ]
      },
      {
        id: 2,
        nombre: "Programa de Equidad Educativa",
        fundacion: "Fundación Pro-Educación",
        indicadores: [
          { nombre: "Entrega de becas estudiantiles", estado: "Completado" },
          { nombre: "Implementación de tutorías", estado: "Completado" },
          { nombre: "Alianza con universidades", estado: "Completado" }
        ]
      },
      {
        id: 3,
        nombre: "Acceso a Agua Potable 2025",
        fundacion: "Fundación Agua para Todos",
        indicadores: [
          { nombre: "Estudio de viabilidad", estado: "Completado" },
          { nombre: "Construcción de pozo principal", estado: "En Progreso" },
          { nombre: "Instalación de red de distribución", estado: "Pendiente" },
          { nombre: "Capacitación a la comunidad", estado: "Pendiente" },
          { nombre: "Monitoreo de calidad del agua", estado: "Pendiente" }
        ]
      }
    ];

    this.proyectos = mockProjectsData.map(proyecto => {
      const indicadoresCompletados = proyecto.indicadores.filter(
        indicador => indicador.estado === 'Completado'
      ).length;

      const totalIndicadores = proyecto.indicadores.length;
      const progreso = totalIndicadores > 0 ? Math.round((indicadoresCompletados / totalIndicadores) * 100) : 0;

      return {
        ...proyecto,
        progreso: progreso,
        indicadoresCompletados: indicadoresCompletados,
      };
    });
  }

  // --- NUEVA FUNCIÓN PARA EL BOTÓN "FACTURAR" ---
  facturarProyecto(proyecto: Proyecto): void {
    // Aquí iría la lógica real para navegar a la página de facturación
    console.log("Facturando proyecto:", proyecto.nombre);

    // Mostramos una notificación toast como confirmación
    this.messageService.add({
      severity: 'info',
      summary: 'Acción Requerida',
      detail: `El proyecto '${proyecto.nombre}' está listo para ser facturado.`
    });
  }

  // Devuelve el color para la barra de progreso personalizada
  getColor(progreso: number): string {
    if (progreso < 40) return '#ef4444';      // Rojo
    if (progreso < 100) return '#f59e0b';     // Amarillo
    return '#22c55e';                         // Verde
  }

  // Devuelve la severidad para el componente p-tag
  getSeverity(estado: string): string {
    switch (estado) {
      case 'Completado': return 'success';
      case 'En Progreso': return 'warning';
      case 'Pendiente': return 'danger';
      default: return 'info';
    }
  }
}

